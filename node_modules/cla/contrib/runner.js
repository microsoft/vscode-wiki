
function Runner() {
  if(!(this instanceof Runner)) return new Runner();
  this.routes = [];
}

Runner.prototype.use = function use(command, runner) {
  if(!runner) {
    runner = command;
    command = null;
  }
  this.routes.push({command, runner});
  return this;
}

Runner.prototype.run = function run(options, callback) {
  callback = callback || function() {};
  options.originalPath = options.originalPath || options.path.slice(0);
  process(this.routes, options, callback);
  return this;
}

function process(routes, options, callback) {
  let routeIndex = 0;
  const next = (error) => {
    if(error) return callback(error);
    const route = routes
      .slice(routeIndex++)
      .find((route) => isPathRoute(options.path[0], route.command));
    if(!route) return callback(null);
    const {runner, command} = route;
    const level = command && options.path.shift();
    exec(runner, options, function() {
      if(level) options.path.unshift(level);
      next(...arguments);
    });
  };
  next();
}

function isPathRoute(route, command) {
  if(!command) return true;
  if(typeof route === 'object') route = route.name;
  if(typeof command === 'object') command = command.name;
  return route === command;
}

function exec(runner, options, callback) {
  if(runner instanceof Runner) {
    runner.run(options, callback);
  } else {
    runner(options, callback);
  }
}

module.exports = Runner;


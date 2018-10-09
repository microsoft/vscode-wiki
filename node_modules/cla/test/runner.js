
const assert = require('assert');
const Runner = require('../contrib/runner');

describe('Runner()', function() {
  describe('use([command Command|string,] callback Runner|Function(error, next))', function() {
  
  });
  describe('run(options Object[, callback Function(error)])', function() {
    it('should run the routes in order', function(next) {
      let outputs = [];
      const main = Runner()
        .use((_, next) => { outputs.push(1); next(); })
        .use((_, next) => { outputs.push(2); next(); })
        .use((_, next) => { outputs.push(3); next(); });
      const command = {};
      main.run({path: [command]}, (error) => {
        assert(!error);
        assert.deepEqual(outputs, [1, 2, 3]);
        next();
      });
    });

    it('should accept Runners as routes', (next) => {
      let outputs = [];
      const main = Runner()
        .use(Runner().use((_, next) => { outputs.push(1); next(); }))
        .use(Runner().use((_, next) => { outputs.push(2); next(); }))
        .use(Runner().use((_, next) => { outputs.push(3); next(); }));
      const command = {};
      main.run({path: [command]}, (error) => {
        assert(!error);
        assert.deepEqual(outputs, [1, 2, 3]);
        next();
      });
    });

    it('should stop running routes on error', (next) => {
      let outputs = [];
      const main = Runner()
        .use((_, next) => { outputs.push(1); next(); })
        .use((_, next) => { outputs.push(2); next('error'); })
        .use((_, next) => { outputs.push(3); next(); });
      const command = {};
      main.run({path: [command]}, (error) => {
        assert.equal(error, 'error');
        assert.deepEqual(outputs, [1, 2]);
        next();
      });
    });

    it('should call callback when routes are exhausted', (next) => {
      let outputs = [];
      const main = Runner()
        .use((_, next) => { outputs.push(1); next(); })
        .use((_, next) => { outputs.push(2); next(); })
        .use((_, next) => { outputs.push(3); next(); });
      const command = {};
      main.run({path: [command]}, (error) => {
        assert(!error);
        assert.deepEqual(outputs, [1, 2, 3]);
        next();
      });
    });

    it('should alter options.path for nested routes', (next) => {
      const command0 = {name: 'c0'};
      const command1 = {name: 'c1'};
      const command2 = {name: 'c2'};

      const runner0 = (options, next) => {
        assert.equal(options.originalPath[0], command0);
        assert.equal(options.path[0], command0);
        next();
      };
      
      const runner1 = (options, next) => {
        assert.equal(options.originalPath[0], command0);
        assert.equal(options.path[0], command1);
        next();
      };

      const runner2 = Runner().use((options, next) => {
        assert.equal(options.originalPath[0], command0);
        assert.equal(options.path[0], command2);
        next();
      });

      const path = [command0, command1, command2];
      const savedPath = path.slice(0);

      Runner()
        .use(runner0)
        .use(command1, Runner()
          .use(runner1)
          .use(command2, runner2))
        .run({path}, (error) => {
          assert(!error);
          assert.deepEqual(path, savedPath);
          next();
        });
    });
  });
});


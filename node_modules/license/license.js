var fs=require("fs");
var _=require("underscore"); //use for string interpolation out of laziness
var async=require("async");

//http://underscorejs.org/#template // a la mustache
_.templateSettings = {
	interpolate : /\{\{(.+?)\}\}/g
};

var licensePath = function(name, header, callback) {
	if (header) {
	return __dirname + "/templates" +"/template-" + name + "-header.txt";
	}
	return __dirname + "/templates" +"/template-" + name + ".txt";
};

var licenseTypes= function(callback) {
	var files =fs.readdir(__dirname + "/templates", function(err, files){
		var types=[];
		for (var i = files.length - 1; i >= 0; i--) {
			var match = files[i].match(/^template-([a-z0-9]+).txt$/);
			if (match) {
			    types.push(match[1]);
			};
		}
		callback(null,types);
	});
}

var templateString=function(path, callback){
	fs.readFile(path, "utf8", function (err, data) {
		if (err) throw err;
		callback(null, data);
	});
}

var createLicense = function(options, callback){
	var path=licensePath(options.licenseType, options.header);
	async.waterfall([
	    function(callback){
			templateString(path, function(err, templateString){
				callback(null,templateString);
			});
		},
		function(templateString, callback){
			var compiled=_.template(templateString);
			var rendered=compiled(options);
			callback(null, rendered);
		}
	],
	function(err, result) {
		if (err) throw err;
		callback(null, result);
	});
}

exports.createLicense=createLicense;
exports.licenseTypes=licenseTypes;
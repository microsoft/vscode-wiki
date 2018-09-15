#! /usr/bin/env node

var licenser=require("../license.js");
var fs=require("fs");
var optimist =require('optimist');
var config=require("../.config.json");
var async=require('async');
var exec = require('child_process').exec;

var getDefaults = function(callback){
    async.waterfall([
        function (callback){
            exec('git config --get user.name', function (error, stdout, stderr) {
                if (error) throw error;
                var gitUser=stdout;
                callback(null, gitUser);
            });
        },
        function (gitUser, callback){
            var defaults={
                year : config.year || new Date().getFullYear(),
                organization : config.organization || gitUser || process.env.USER, 
                project :  config.project || __dirname.split("/").slice(-1)[0],
                licenseType : config.licenseType
            }
            callback(null, defaults);
        }
    ],
    function(err, result){
        callback(result);
    }
    );
}


var parseArgs=function(defaults) {

    var checker=function(options){
    //CONJUDO: check the stuffs
    return true;
    }

    var args=optimist
        .usage('Generate a license\nUsage: $0 [-h]\n$0 [-l]\n$0 [ -o [OWNER] -p [PROJECT] -y [YEAR] ] [license]\n$0 [--config[.key <VALUE>]]\n$0 [--header]')
        .options('h', {
            alias : 'help',
            description : "show this help menu"
        })
        .options('l', {
            alias : 'list',
            description : "list all available license templates"
        })
        .options('o', {
            alias : ['organization'],
            default : defaults.organization,
            description : "the organisation/owner that holds the copy[right,left]"
        })
        .options('p', {
            alias : "project",
            //CONJUDO: nicer way to get current directory
            default : defaults.project,
            description : "the name of the project",
        })
        .options('y', {
            alias : "year",
            default : defaults.year,
            description : "copyright year",
        })
        .options('config', {
            description : "set default values: usage --config.key value\n available:[year], [project], [licenseType], [organisation]",
        })
        .options('header', {
            description : "just get the license header",
        })

        .check(checker)
        .argv
    ;
    //set default licenseType
    if (args._.length==0) {
        args._[0]=defaults.licenseType;
    };

    return args;
}

var showConfig=function(){
    console.log(config);


}

var updateConfig= function(newConfigArgs, callback){
    //CONJUDO: do this without __dirname???
     //CONJUDO: make this more synchronous.. exit before printing license.. clean up
    var configPath=__dirname + "/../.config.json";
    var newConfig=require("../.config.json");

    for (var i in newConfigArgs){
        newConfig[i]=newConfigArgs[i];
    }
    var updatedConfig=JSON.stringify(newConfig);
    fs.writeFile(configPath, updatedConfig, function (err) {
        if (err) throw err;
        console.log("config updated");
        console.log(updatedConfig);
        callback(null);
     });
}

var runCli=function(args){

    async.series([
        function (callback){
            if (args.h) {
                return optimist.showHelp();
            };
            if (args.l) {
                licenser.licenseTypes(function(err, licenseTypes){
                    console.log(licenseTypes);
                    process.exit(0);
                });
            }
            else callback(null);

        },
        function (callback){
            if (args.config) {
                if (args.config===true) {
                    showConfig();
                    process.exit(0);
                }
                else updateConfig(args.config, function(err){
                    process.exit(0);
                });
            }
            else callback(null);
        },

        function (callback){
            var cleanUpArgs=function(args){
                return{
                    licenseType : args._[0],
                    year : args.year,
                    organization : args.o,
                    project : args.project,
                    header : args.header,
                }
            }
            var licenseOptions=cleanUpArgs(args);
            licenser.createLicense(licenseOptions, function(err, license){
                console.log(license);
            });
        },
    ]);
}

async.waterfall([
    function(callback){
        getDefaults(function (defaults){
            callback(null,defaults);
        });
    },
    function (defaults, callback){
        var args=parseArgs(defaults);
        callback(null, args);
    },
    function(args,callback){
        runCli(args);
    }
]);    
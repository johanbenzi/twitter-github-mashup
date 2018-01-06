var express = require('express');
var chalk       = require('chalk');
var clear       = require('clear');
var CLI         = require('clui');
var figlet      = require('figlet');
var inquirer    = require('inquirer');
var Preferences = require('preferences');
var Spinner     = CLI.Spinner;
var GitHubApi   = require('github');
var _           = require('lodash');
var git         = require('simple-git')();
var touch       = require('touch');
var fs          = require('fs');

var files = require('./lib/files');

clear();
console.log(
  chalk.yellow(
    figlet.textSync('GitHub-Twitter', { horizontalLayout: 'full' })
  )
);

//var app = express();
//
//var port = process.env.PORT || 3000;
//
//app.get('/', function(req, res) {
//    res.send("TWITTER-GITHUB API HOME");
//});
//
//app.listen(port, function(){
//    
//    console.log("RUNNING ON PORT ", port);
//}); 
var express = require('express');
var chalk = require('chalk');
var clear = require('clear');
var CLI = require('clui');
var figlet = require('figlet');
var inquirer = require('inquirer');
var Preferences = require('preferences');
var Spinner = CLI.Spinner;
var GitHubApi = require('github');
var _ = require('lodash');
var git = require('simple-git')();
var touch = require('touch');
var fs = require('fs');
var twitter = require('./twitter/tweets.js');

var files = require('./lib/files');

clear();
console.log(
        chalk.yellow(
                figlet.textSync('GitHub-Twitter', {horizontalLayout: 'full'})
                )
        );

console.log(twitter);

var status = new Spinner('Fetching data...');
status.start();


//var github = new GitHubApi({});
var github = new GitHubApi({

});

github.search.repos({
    q: 'football',
    page:1,
    per_page: 10
}, success);

function success(err, res){
    if(err) {
        
        console.log( chalk.red("Error, cannot progress ", err));
        return;
    }
    for (var index in res.data.items) {
        twitter(res.data.items[index], index, chalk, status);
    }
}
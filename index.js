require('dotenv').config();
var chalk = require('chalk');
var clear = require('clear');
var CLI = require('clui');
var figlet = require('figlet');
var GitHubApi = require('github');

var fs = require('fs');
var githubRepoFetch = require ('./github/githubFetch.js');

var files = require('./lib/files');

clear();
console.log(
        chalk.yellow(
                figlet.textSync('GitHub-Twitter', {horizontalLayout: 'full'})
                )
        );

/**
 * Call github fetching api, inject necessary packages
 */
githubRepoFetch(chalk, GitHubApi);
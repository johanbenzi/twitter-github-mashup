var Twitter = require('twitter');
var moment = require('moment');
var lastPrintedCount = 0;
var prompt = require('prompt');
var GitHubApi = require('github');


var getTweets = (project, projectCount, chalk, status) => {

    var githubRepoFetch = require('../github/githubFetch.js');

    var client = new Twitter({
        consumer_key: process.env.consumer_key,
        consumer_secret: process.env.consumer_secret,
        access_token_key: process.env.access_token_key,
        access_token_secret: process.env.access_token_secret
    });

    client.get('search/tweets', {q: project.name, count: 10}, (err, res) => {

        if (err) {
            console.log(err);
            return;
        }
        console.log("\n Repo no: ", ++lastPrintedCount, " Name: ", chalk.green.bold(project.name) + "    Author: " + chalk.green.italic(project.owner.login));
        console.log("\n Description: ", chalk.cyan(project.description || ""));

        if (!res.statuses[0]) {
            console.log(chalk.red(" <No Tweets Found for this github repo name>"));

        }

        for (var index in res.statuses) {

            console.log(" ", (parseInt(index) + 1), chalk.blue(res.statuses[index].text), chalk.dim(" - "), chalk.yellow.italic(res.statuses[index].user.name));
            console.log(" Tweeted at: ", chalk.gray(moment(res.statuses[index].created_at, "ddd MMM DD HH:mm:ss SSSSS YYYY").utc().format("MM-DD-YYYY hh:mm")));
        }
        /**
         * 
         * Logic for pagination, triggers the github repo search function when we print all 10 repos and their tweets
         */
        if (lastPrintedCount % 10 === 0) {
            status.stop();
            console.log('\n \n');
            /**
             * Prompt for entering user choice
             */
            prompt.start();
            prompt.get([{name: 'userChoice', description: "Enter Y for showing next 10 repos, press N for exiting"}], promptSuccess);

            function promptSuccess(err, result) {
                
                /**
                 * Loop over till you get y or n
                 */
                if (result.userChoice !== 'Y' && result.userChoice !== 'y' && result.userChoice !== 'N' && result.userChoice !== 'n') {
                    console.log('\n \n');
                    prompt.start();
                    prompt.get([{name: 'userChoice', description: "Enter Y for showing next 10 repos, press N for exiting"}], promptSuccess);
                    return;
                } else if (result.userChoice === 'Y' || result.userChoice === 'y') {

                    githubRepoFetch(chalk, GitHubApi);
                }
            }
        }
        return true;
    });
};

module.exports = getTweets;
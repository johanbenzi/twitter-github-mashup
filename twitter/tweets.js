var Twitter = require('twitter');
var moment = require('moment');
var lastPrintedCount = 0;
var getTweets = (project, projectCount, chalk, status) => {

    var client = new Twitter({
        consumer_key: process.env.consumer_key,
        consumer_secret: process.env.consumer_secret,
        access_token_key: process.env.access_token_key,
        access_token_secret: process.env.access_token_secret
    });
    console.log(process.env.consumer_key);
    client.get('search/tweets', {q: project.name, count: 10}, (err, res) => {
        
        if(err) {
            console.log(err);
            return;
        }
        status.stop();
        console.log("\n Repo no: ", ++lastPrintedCount, " Name: ", chalk.green.bold(project.name) + "    Author: " + chalk.green.italic(project.owner.login));
        console.log("\n Description: ", chalk.cyan(project.description || ""));

        if (!res.statuses[0]) {
            console.log(chalk.red(" <No Tweets Found for this github repo name>"));
            return;
        }

        for (var index in res.statuses) {

            console.log(" ", (parseInt(index) + 1), chalk.blue(res.statuses[index].text), chalk.dim(" - "), chalk.yellow.italic(res.statuses[index].user.name));
            console.log(" Tweeted at: ", chalk.gray(moment(res.statuses[index].created_at, "ddd MMM DD HH:mm:ss SSSSS YYYY").utc().format("MM-DD-YYYY hh:mm")));
        }
        return;
    });
};

module.exports = getTweets;
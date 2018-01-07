var twitter = require('../twitter/tweets.js');
var CLI = require('clui');
var Spinner = CLI.Spinner;

//variable for pagination
var pageCount = 0;
var githubRepoFetch = (chalk, GitHubApi) => {

    var status = new Spinner('Fetching data...');
    status.start();

    var github = new GitHubApi({

    });

    github.search.repos({
        q: 'football',
        page: pageCount++,
        per_page: 10
    }, success);

    function success(err, res) {

        if (err) {

            console.log(chalk.red("Error, cannot progress ", err));
            return;
        }

            for (var index in res.data.items) {
                twitter(res.data.items[index], index, chalk, status);
            }
    }
};

module.exports = githubRepoFetch;
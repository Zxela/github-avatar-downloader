//require request module //
var request = require('request');
//require API token module //
var token = require('./token')
// console.log('Welcome to the GitHub Avatar Downloader!');
// get repo contributors function - takes owner, repo name and callback
function getRepoContributors(repoOwner, repoName, cb) {
    var options  = {
        url : "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
            'User-Agent': 'Zxela',
            'Authorization': token.GITHUB_TOKEN
        }
    };
    request(options, function(err, res, body) {
        cb(err,body);
    });
}

getRepoContributors("jquery", "jquery", function(err, result) {
    for (var i = 0; i < JSON.parse(result).length; i++) {
        if (JSON.parse(result)[i].avatar_url) {
            console.log(JSON.parse(result)[i].avatar_url);
        }
    }
});


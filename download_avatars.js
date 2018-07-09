//require request module //
var request = require('request');
//require API token module //
var token = require('./token');
//require filesystem module
var fs = require('fs');
var args = process.argv.slice(2)
var repOwner = args[0]
var repName = args[1]
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

getRepoContributors(repOwner, repName, function(err, result) {
    var parsedResult = JSON.parse(result)
    var resultArray
    for (var i = 0; i < parsedResult.length; i++) {
        if (parsedResult[i].avatar_url) {
            // console.log(parsedResult[i].avatar_url);
            var filepath = './pics/' + parsedResult[i].login + '.jpeg'
            var name = parsedResult[i].login
            downloadImageByURL(parsedResult[i].avatar_url, filepath, name)
        }
    }
});


// getRepoContributors("jquery", "jquery", function(err, result) {
//     //save each image
// });
var url = 'https://avatars0.githubusercontent.com/u/1615?v=4'

function downloadImageByURL(url, filepath, name) {
    request.get(url).on('end', function(){
        console.log(`Downloaded ${name}'s picture`);
    })
    .pipe(fs.createWriteStream(filepath))

}

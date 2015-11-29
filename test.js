//var twitter = require('ntwitter');
var config = require('./config');

//var twit = new twitter(config.twitter);

//twit.stream('statuses/filter', {track: '#SophiaANoDomingãoDoFaustão'}, function (stream) {
//  console.log(stream);
//});

var Twitter = require('twitter');
 
var client = new Twitter(config.twitter);
 
var params = {screen_name: 'nodejs'};
client.stream('statuses/filter', {track: 'javascript'}, function(stream){
  stream.on('data', function(tweet) {
    console.log(tweet.text);
  });

  stream.on('error', function(error) {
    throw error;
  });
});

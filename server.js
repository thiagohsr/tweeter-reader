var express = require('express');
var exphbs = require('express-handlebars');
var http = require('http');
var mongoose = require('mongoose');
var twitter = require('ntwitter');
var routes = require('./routes');
var config = require('./config');
var streamHandler = require('./utils/streamHandler');

var app = express();
var port = process.env.PORT || 8080;

app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.disable('etag');

mongoose.connect('mongodb://localhost/react-tweets');

var twit = new twitter(config.twitter);

app.get('/', routes.index);

app.get('/page/:page/:skip', routes.page);

app.use('/', express.static(__dirname + '/public/'));

var server = http.createServer(app).listen(port, function () {
  var host = app.address().address;
  console.log('Server running on %s:%s', host, port);
});

var io = require('socket.io').listen(server);

twit.stream('statuses/filter', {track: 'scotch_io, #scotchio'}, function (stream) {
  steamHandler(stream, io);
});
var express = require('express');

//var user = require('./routes/user');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

// Middleware
require('./middleware')(app);

// Routes
require('./routes')(app);

var server = http.createServer(app);
server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

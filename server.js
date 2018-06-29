/**
 * Created by 224571 on 1/18/2017.
 */
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var bunyan = require('bunyan');
var config = require('./configuration');

//get configuration object
var theConfig = null;
config.getAppconfig(function (err, config) {
    if (err) {
        console.log(err);
    } else {
        theConfig = config;
    }
});
console.log('logsettings: ' + JSON.stringify(theConfig.get('logsettings')));

var logsettings = theConfig.get('logsettings');
logsettings.streams[1] = {
    level: 'info',
    stream: process.stdout
};
var theLog = bunyan.createLogger(logsettings);
console.log('logsettings: done');

theLog.info('Force Layout');

var controllers = require('./controllers');
var app = express();

//set the public static resource folder
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'vash');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.ejson());


app.use(function (error, req, res, next) {
    //Catch json error
    //sendError(res, myCustomErrorMessage);
    theLog.error(error);
    theLog.error(error.stack);
    theLog.error(error.name + ' - ' + error.message);

    theLog.error('cleint IP: ' + req.connection.remoteAddress + ', JSON.stringify(req.body) - ' + JSON.stringify(req.body));

    res.status(400).send(error.name + ' - ' + error.message);
});

//Map the routes
controllers.init(app, theConfig, theLog);

var server = http.createServer(app);

server.listen(20009);





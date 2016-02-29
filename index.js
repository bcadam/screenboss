var express = require('express');  // find this line in the file
var cors = require('cors') // add this line below it
var favicon = require('serve-favicon');
var Parse = require('parse');

var apiRouter = require('./api.js');


var app = express();
app.use(cors());

app.use('/api', apiRouter);


app.use(favicon('app/images/favicon.ico'));
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/'));
app.set('view engine', 'ejs');
app.use('/css', express.static('dist/css'));
app.use('/images', express.static('dist/images'));
app.use('/js', express.static('dist/js'));
app.use('/fonts', express.static('dist/fonts'));
app.use('/public/install', express.static('public/ScreenBossLocal.zip'));
app.use('/public', express.static('public'));


app.get('/*', function(req, res) {
    res.sendFile('app/index.html', {
        root: __dirname
    });
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
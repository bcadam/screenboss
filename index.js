var express = require('express');
var app = express();


var favicon = require('serve-favicon');

app.use(favicon('app/images/favicon.ico'));


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/'));
app.set('view engine', 'ejs');
app.use('/css', express.static('dist/css'));
app.use('/images', express.static('dist/images'));
app.use('/js', express.static('dist/js'));
app.use('/fonts', express.static('dist/fonts'));


app.get('/*', function(req, res) {
    res.sendFile('app/index.html', {
        root: __dirname
    });
});




app.get('/index.html', function(req, res) {
    res.sendFile('app/home.html', {
        root: __dirname
    });
});

app.get('/index', function(req, res) {
    res.sendFile('app/home.html', {
        root: __dirname
    });
});

app.get('/', function(req, res) {
    res.sendFile('app/home.html', {
        root: __dirname
    });
});

app.get('/app.html', function(req, res) {
    res.sendFile('app/index.html', {
        root: __dirname
    });
});


app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

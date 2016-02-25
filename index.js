var express = require('express')
  , cors = require('cors')
  , app = express();


// var allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');

//     next();
// }


// app.use(allowCrossDomain);
// app.use(cors());
// app.options('*', cors());
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});




var favicon = require('serve-favicon');


var ParseServer = require('parse-server').ParseServer;
var databaseUri = process.env.DATABASE_URI || process.env.MONGOLAB_URI;
if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}
var api = new ParseServer({
  databaseURI: 'mongodb://main:main@ds013918.mongolab.com:13918/screenboss',
  appId: 'pp9waK9ticOFbhrJzrdITkRVQfCycHLqNPj2ZrN6',
  masterKey: 'Pp9mBdqFMmnjFLT4skUMif2Tz7bie3hCqKv5CfRj',
  cloud:  __dirname + '/cloud/cloud/mainownserver.js',
});
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);





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

// app.get('/index.html', function(req, res) {
//     res.sendFile('app/home.html', {
//         root: __dirname
//     });
// });

// app.get('/index', function(req, res) {
//     res.sendFile('app/home.html', {
//         root: __dirname
//     });
// });

// app.get('/', function(req, res) {
//     res.sendFile('app/home.html', {
//         root: __dirname
//     });
// });

// app.get('/app.html', function(req, res) {
//     res.sendFile('app/index.html', {
//         root: __dirname
//     });
// });




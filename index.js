var express = require('express');

var app = express();
var favicon = require('serve-favicon');


// var ParseServer = require('parse-server').ParseServer;
// var databaseUri = process.env.DATABASE_URI || process.env.MONGOLAB_URI;
// if (!databaseUri) {
//   console.log('DATABASE_URI not specified, falling back to localhost.');
// }

// var api = new ParseServer({
//   databaseURI: 'mongodb://localhost:27017/dev',
//   cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/cloud/mainownserver.js',
//   appId: 'pp9waK9ticOFbhrJzrdITkRVQfCycHLqNPj2ZrN6',
//   masterKey: 'Pp9mBdqFMmnjFLT4skUMif2Tz7bie3hCqKv5CfRj' //Add your master key here. Keep it secret!
// });
// var mountPath = process.env.PARSE_MOUNT || '/parse';
// app.use(mountPath, api);


// Parse.initialize('pp9waK9ticOFbhrJzrdITkRVQfCycHLqNPj2ZrN6','Pp9mBdqFMmnjFLT4skUMif2Tz7bie3hCqKv5CfRj');
// var obj = new Parse.Object('GameScore');
// obj.set('score',1337);
// obj.save().then(function(obj) {
//   console.log(obj.toJSON());
//   var query = new Parse.Query('GameScore');
//   query.get(obj.id).then(function(objAgain) {
//     console.log(objAgain.toJSON());
//   }, function(err) {console.log(err); });
// }, function(err) { console.log(err); });




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


app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

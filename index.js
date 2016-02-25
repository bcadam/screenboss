var express = require('express');  // find this line in the file
var cors = require('cors') // add this line below it
var favicon = require('serve-favicon');
var Parse = require('parse');
//....

var app = express();  // find this line in the file
var apiRouter = express.Router();
app.use(cors()); // add this line below it
// // app.options('*', cors());
// app.all('/*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// });

// var ParseServer = require('parse-server').ParseServer;
// var databaseUri = process.env.DATABASE_URI || process.env.MONGOLAB_URI;
// if (!databaseUri) {
//   console.log('DATABASE_URI not specified, falling back to localhost.');
// }
// var api = new ParseServer({
//   databaseURI: 'mongodb://main:main@ds013918.mongolab.com:13918/screenboss',
//   appId: 'pp9waK9ticOFbhrJzrdITkRVQfCycHLqNPj2ZrN6',
//   masterKey: 'Pp9mBdqFMmnjFLT4skUMif2Tz7bie3hCqKv5CfRj',
//   cloud:  __dirname + '/cloud/cloud/mainownserver.js',
// });
// var mountPath = process.env.PARSE_MOUNT || '/parse';
// app.use(mountPath, api);

app.use('/api', apiRouter);

apiRouter.get('/', function(req, res) {	    
	    res.json({
	        message: "Welcome to the api!"
	            });
});

apiRouter.get('/sendemail', function(req, res) {

	var mandrill = require('mandrill-api/mandrill');
	var mandrill_client = new mandrill.Mandrill('wFwXb8b6VD-JiFp2rOTL6Q');

	var template_name = "file-request";
	var template_content = [{
	        "SENDERNAME": "Adam Cragg",
	        "CONTENT": "example content",
	        "id": "example content"
	    }];

	var message = {
    "html": "<p>Example HTML content</p>",
    "text": "Example text content",
    "subject": "example subject",
    "from_email": "info@screenboss.co",
    "from_name": "Example Name",
    "to": [{
            "email": "adam.cragg@gmail.com",
            "name": "Recipient Name",
            "type": "to"
        }],
    "headers": {
        "Reply-To": "inro@screenboss.co"
    },
    "important": false,
    "track_opens": null,
    "track_clicks": null,
    "auto_text": null,
    "auto_html": null,
    "inline_css": null,
    "url_strip_qs": null,
    "preserve_recipients": null,
    "view_content_link": null,
    "tracking_domain": null,
    "signing_domain": null,
    "return_path_domain": null,
    "merge": true,
    "merge_language": "mailchimp"
		};
		var async = false;
		var ip_pool = "Main Pool";
		var send_at = "example send_at";
		mandrill_client.messages.sendTemplate({"template_name": template_name, "template_content": template_content, "message": message, "async": async, "ip_pool": ip_pool}, function(result) {
		    console.log(result);
		    res.json({
        result: result
            });
		    /*
		    [{
		            "email": "recipient.email@example.com",
		            "status": "sent",
		            "reject_reason": "hard-bounce",
		            "_id": "abc123abc123abc123abc123abc123"
		        }]
		    */
		}, function(e) {
		    // Mandrill returns the error as an object with name and message keys
		    res.json({
	        result: e
	            });
		    // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
		});

});

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




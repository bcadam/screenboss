var express = require('express');
var apiRouter = express.Router();

/* GET users listing. */

apiRouter.get('/', function(req, res) {	    
	    res.json({
	        message: "Welcome to the api champ!"
	            });
});

apiRouter.get('/sendemail/:targetemail?/:message?/:userid?', function(req, res) {

	var mandrill = require('mandrill-api/mandrill');
	var mandrill_client = new mandrill.Mandrill('wFwXb8b6VD-JiFp2rOTL6Q');


	var targetEmail = req.params.targetemail;
	var content = req.params.message;
	var linkToPage = "http://localhost:5000/#/app/filerequest/" + req.params.userid;
	var senderName = req.params.userid;



	var template_name = "file-request";
	var template_content = [{
	        "sendername": senderName,
	        "content": content,
	        "id": "example content",
	        "link" : linkToPage
	    }];

	var message = {
	    "html": "<p>ScreenBoss File Request</p>",
	    "text": "ScreenBoss File Request",
	    "subject": "ScreenBoss File Request",
	    "from_email": "info@screenboss.co",
	    "from_name": "ScreenBoss.co",
	    "to": [{
	            "email": targetEmail,
	            "name": targetEmail,
	            "type": "to"
	        }],
	    "headers": {
	        "Reply-To": targetEmail
	    },
	    "inline_css": true,
	    "preserve_recipients": null,
	    "view_content_link": null,
	    "autotext": true,
		"trackopens": true,
		"track_clicks": true,
	    "merge": true,
	    "merge_language": "mailchimp",
	    	"global_merge_vars": [{
	            "name": "merge1",
	            "content": "merge1 content"
	        }],
	    "merge_vars": [{
	            "rcpt": "recipient.email@example.com",
	            "vars": [{
	                    "sendername": "merge2",
	                    "content": "merge2 content",
	                    "sendername" : "done"
	                }]
	        }]
	    };

		var async = false;
		var ip_pool = "Main Pool";
		var send_at = "example send_at";
		mandrill_client.messages.sendTemplate({"template_name": template_name, "template_content": template_content, "message": message, "async": async, "ip_pool": ip_pool}, function(result) {
		    console.log(result);
		    res.json({
        		result: result
            });		  
		}, function(e) {
		    // Mandrill returns the error as an object with name and message keys
		    res.json({
	        result: e
	            });
		});
});

module.exports = apiRouter;
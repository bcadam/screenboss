var Image = require("parse-image");
var mandrill = require("mandrill");


Parse.Cloud.beforeSave("ScreenAsset", function(request, response) {
    var user = request.object;
    var fileName = user.get('name');

    if (!user.get("file")) {
        response.error("Users must have a profile photo.");
        return;
    }

    if (!user.dirty("file")) {
        // The profile photo isn't being modified.
        response.success();
        return;
    }

    Parse.Cloud.httpRequest({
        url: user.get("file").url()

    }).then(function(response) {
        var image = new Image();
        return image.setData(response.buffer);

    }).then(function(image) {
        // Resize the image to 64x64.
        return image.scale({
            ratio: .3
        });

        // return image.scale({
        //     width: 64,
        //     height: 64
        // });

    }).then(function(image) {
        // Make sure it's a JPEG to save disk space and bandwidth.
        return image.setFormat("JPEG");

    }).then(function(image) {
        // Get the image data in a Buffer.
        return image.data();

    }).then(function(buffer) {
        // Save the image into a new file.
        var base64 = buffer.toString("base64");
        var cropped = new Parse.File("_thumbnail", {
            base64: base64
        });
        return cropped.save();

    }).then(function(cropped) {
        // Attach the image file to the original object.
        user.set("fileThumbnail", cropped);

    }).then(function(result) {
        response.success();
    }, function(error) {
        response.error(error);
    });
});

Parse.Cloud.define("saveBlob", function(request, response) {

    var User = Parse.Object.extend("_User");
    var query = new Parse.Query(User);

    var ScreenAsset = Parse.Object.extend("ScreenAsset");
    var screenAsset = new ScreenAsset();

    var fileName = request.params.blob[0].filename;
    //response.success(request.params.blob);

    query.get(request.params.user, {
        success: function(gameScore) {
            //The object was retrieved successfully.
            //response.success("found one");
            //response.success(request.params.blob);
            var userId = gameScore.id;


            Parse.Cloud.httpRequest({
                url: request.params.blob[0].url
            }).then(function(response) {
                // Create an Image from the data.
                var image = new Image();
                return image.setData(response.buffer);

            }).then(function(image) {
                // Scale the image to a certain size.
                return image;
            }).then(function(image) {
                // Get the bytes of the new image.
                return image.data();

            }).then(function(buffer) {
                // Save the bytes to a new file.
                var file = new Parse.File("image.jpg", {
                    base64: buffer.toString("base64")
                });
                return file.save();

            }).then(function(file) {
                
                //response.success(gameScore.objectId);

                var custom_acl = new Parse.ACL();
                custom_acl.setWriteAccess(userId, true);
                custom_acl.setReadAccess(userId, true);

                

                var ScreenAsset = Parse.Object.extend("ScreenAsset");
                var screenAsset = new ScreenAsset();
                screenAsset.set('file', file);
                screenAsset.set('name', fileName);
                screenAsset.set('owner', gameScore);
                screenAsset.set('published', true);
                screenAsset.set('ACL', custom_acl);
                screenAsset.save(null, {
                    success: function(screenAsset) {
                        response.success('New object created with objectId: ' + screenAsset.id);
                    },
                    error: function(screenAsset, error) {
                        response.error('Failed to create new object, with error code: ' + error.message);
                    }
                });



            });



        },
        error: function(object, error) {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
            response.error("Did not find the user");
        }
    });
});

Parse.Cloud.define("sendFileLink", function(request, response) {

    mandrill.initialize("wFwXb8b6VD-JiFp2rOTL6Q");
    var name = request.params.name;
    if(!name){name = "ScreenBoss"}
    mandrill.sendEmail({
        message: {
          text: request.params.senderEmail + " has sent you a file Request - http://www.screenboss.co/#/app/filerequest/" + request.params.id + " " + request.params.message,
          html: "<p>" + request.params.message + " - <br />" + request.params.name + "</p><p>You've been sent you a file Request - <a href='http://www.screenboss.co/#/app/filerequest/" + request.params.id + "'><b>Submit file here</b></a></p>",
          subject: "File Request from " + name,
          from_email: request.params.senderEmail,
          from_name: request.params.senderEmail,
          bcc_address: "info@screenboss.co",
          metadata: {
                website: "www.screenboss.co"
            },
          to: [
            {
              email: request.params.email,
              name: request.params.email
            }
          ]
        },
        async: true
    }, {
        success: function(httpResponse) { response.success("Email sent!"); },
        error: function(httpResponse) { response.error("Uh oh, something went wrong"); }
    });
    //response.success(request.params.email);
});

Parse.Cloud.define("alertUser", function(request, response) {

    var query = new Parse.Query(Parse.User);
    
    query.get(request.params.id, {
      success: function(userAgain) {
        var email = userAgain.get('email');

        mandrill.initialize("wFwXb8b6VD-JiFp2rOTL6Q");
    
        mandrill.sendEmail({
            message: {
              text: "A file has been sent to your ScreenBoss account. http://www.screenboss.co/#/app/assets",
              html: "<p>A file has been sent to your ScreenBoss account. <a href='http://www.screenboss.co/#/app/assets'>Check it out here</a></p>",
              subject: "File submitted to your ScreenBoss",
              from_email: "info@screenboss.co",
              from_name: "ScreenBoss",
              bcc_address: "info@screenboss.co",
              metadata: {
                    website: "www.screenboss.co"
                },
              to: [
                {
                  email: email
                }
              ]
            },
            async: true
        }, {
            success: function(httpResponse) { response.success("Email sent!"); },
            error: function(httpResponse) { response.error("Uh oh, something went wrong"); }
        });




        //response.success('foundId');
      }
    });

    //response.success(request.params.email);
});

// Parse.Cloud.beforeDelete("ScreenAsset", function(request, response) {

// // response.error(request.object.id);
// query = new Parse.Query("ScreenAsset");
// query.equalTo("screenAsset", request.object.id);
// query.count({
//     success: function(count) {
//       if (count > 0) {
//         response.error("Can't delete album if it still has photos.");
//       } else {
//         response.error(count);
//       }
//     },
//     error: function(error) {
//       response.error("Error " + error.code + " : " + error.message + " when getting photo count.");
//     }
//   });



// query = new Parse.Query("AssignmentPattern");
// query.equalTo("screenAsset", request.object.id);


// // query.count({
// //     success: function(count) {
// //       if (count > 0) {
// //         response.error("Can't delete album if it still has photos.");
// //       } else {
// //         response.success();
// //       }
// //     },
// //     error: function(error) {
// //       response.error("Error " + error.code + " : " + error.message + " when getting photo count.");
// //     }
// //   });



// });

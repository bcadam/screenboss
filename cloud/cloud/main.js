var Image = require("parse-image");

var mandrill = require("mandrill");
mandrill.initialize('wFwXb8b6VD-JiFp2rOTL6Q');

var Stripe = require('stripe');
var stripeKey = 'sk_live_se8HqxdcAA4qMWHxkl7uWsdp';
//var stripeKey = 'sk_test_L5PJsag7Dw3xz6vlYKQwZxQe';

Stripe.initialize(stripeKey); //replace *** with your key values
//Stripe.initialize('sk_live_se8HqxdcAA4qMWHxkl7uWsdp'); //replace *** with your key values

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
                custom_acl.setPublicReadAccess(true);



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

    var senderEmail = request.params.senderEmail;
    var id = request.params.id;
    var message = request.params.message;
    var name = request.params.name;
    var toEmail = request.params.email;

    if (!name) { name = "ScreenBoss" }

    mandrill.sendEmail({
        message: {
            text: senderEmail + " has sent you a file Request - http://www.screenboss.co/#/app/filerequest/" + id + " " + message,
            html: "<p>" + message + " - <br />" + name + "</p><p>You've been sent you a file Request - <a href='http://www.screenboss.co/#/app/filerequest/" + id + "'><b>Submit file here</b></a></p>",
            subject: "File Request from " + name,
            from_email: request.params.senderEmail,
            from_name: request.params.senderEmail,
            bcc_address: "info@screenboss.co",
            metadata: {
                website: "www.screenboss.co"
            },
            to: [{
                email: request.params.email,
                name: request.params.email
            }]
        },
        async: true
    }, {
        success: function(httpResponse) { response.success("Email sent!"); },
        error: function(httpResponse) { response.error("Uh oh, something went wrong"); }
    });
    //response.success(request.params.email);  
});

Parse.Cloud.define("alertUser", function(request, response) {
    // Parse.Cloud.run('alertUser', {
    //           id: userId,
    //           title: self.state.title,
    //           description: self.state.description,
    //           location: self.state.location,
    //           date: self.state.date,
    //           time: self.state.time
    //         })

    var emailInfo=[request.params.title,request.params.description,request.params.location,request.params.date,request.params.time];

    for (var i = 0; i < emailInfo.length; i++) {
        if(!emailInfo[i]){
            emailInfo = '';
        }
    }

    var query = new Parse.Query(Parse.User);

    query.get(request.params.id, {
        success: function(userAgain) {
            var email = userAgain.get('email');

            mandrill.initialize("wFwXb8b6VD-JiFp2rOTL6Q");

            mandrill.sendEmail({
                message: {
                    text: "A file has been sent to your ScreenBoss account. http://www.screenboss.co/#/app/assets",
                    html: "<p><b><a href='http://www.screenboss.co/#/app/assets'>A file was submitted to your account.</a></b></p><p>" + request.params.title + "</p><p>" + request.params.description + "</p><p>" + request.params.location + "</p><p>" + request.params.date + "</p><p>" + request.params.time + "</p>",
                    subject: "File submitted to your ScreenBoss",
                    from_email: "info@screenboss.co",
                    from_name: "ScreenBoss",
                    bcc_address: "info@screenboss.co",
                    metadata: {
                        website: "www.screenboss.co"
                    },
                    to: [{
                        email: email
                    }]
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

Parse.Cloud.define("stripeToken", function(request, response) {

    var token = request.params.token.id;

    var query = new Parse.Query(Parse.User);

    query.get(request.params.userId, {
        success: function(userAgain) {
            
            var charge = Stripe.Customers.create({
                card: token,
                email : userAgain.get('email'),
                description: request.params.userId,
                plan: "firstplan",
                quantity: "1"
                // coupon: request.params.coupon, // email: request.params.email

                },{
                success: function(httpResponse) {
                    console.log(httpResponse);
                    userAgain.set('stripeId',httpResponse.id);
                    userAgain.set('subscriptionId',httpResponse.subscriptions.data[0].id);

                    userAgain.save();

                    response.success(httpResponse);
                },
                error: function(httpResponse) {
                    response.error("Error: "+httpResponse.message+"\n"+
                           "Params:\n"+
                           request.params.token+","+
                           request.params.plan+","+
                           request.params.quantity+
                           "\n"
                          );
                }
                });


        },
        error: function(){
            response.error('could not find user');
        }
    });
});

Parse.Cloud.define("cancelSubscription", function(request, response) {

    //var token = request.params.token.id;
    //response.success('done');

    var customerId = request.params.stripeId;
    var subscriptionId = request.params.subscriptionId;

    var query = new Parse.Query(Parse.User);

    query.get(request.params.userId, {
        success: function(userAgain) {
            
                    var cancel = Stripe.Customers.cancelSubscription(
                      customerId,
                      subscriptionId,
                      {
                        success: function(httpResponse) {
                            console.log(httpResponse);
                            userAgain.set('subscriptionId',null);
                            userAgain.save();

                            response.success(httpResponse);
                        },
                        error: function(httpResponse) {
                            response.error("Error: "+httpResponse.message+"\n"+
                                   "Params:\n"+
                                   request.params.token+","+
                                   request.params.plan+","+
                                   request.params.quantity+
                                   "\n"
                                  );
                        }
                    }
                    );

        },
        error: function(){
            response.error('could not find user');
        }
    });
});

Parse.Cloud.define("claimDisplay", function(request, response) {

    var query = new Parse.Query(Parse.User);
    var location = request.params.location;
    var code = parseInt(request.params.code);


    query.get(request.params.user, {
        success: function(userAgain) {



            var Display = Parse.Object.extend("Display");
            var query = new Parse.Query(Display);

            query.equalTo("randomNumber", code);
            //console.log(code);
            query.find({
              success: function(results) {
                // alert("Successfully retrieved " + results.length + " scores.");
                // Do something with the returned Parse.Object values
                if(results.length == 0){
                    response.success("Could not find that screen");
                }
                console.log(results);

                results[0].set('owner',userAgain);
                results[0].set('location',location);
                results[0].save();
                response.success("Claimed the display");

              },
              error: function(error) {
                response.error("Could not find that code! Please double check it.");
              }
            });



            // var queryDisplay = new Parse.Query("Display");
            // console.log("///////////////////////////////////////////////////////////////////////////////////////");
            // console.log("///////////////////////////////////////////////////////////////////////////////////////");
            // console.log("///////////////////////////////////////////////////////////////////////////////////////");
            // console.log("///////////////////////////////////////////////////////////////////////////////////////");
            // console.log("///////////////////////////////////////////////////////////////////////////////////////");
            // console.log("///////////////////////////////////////////////////////////////////////////////////////");
            // console.log("///////////////////////////////////////////////////////////////////////////////////////");
            // console.log(code);
            // query.equalTo("randomNumber", code);

            // query.find({
            //   success: function(display) {
            //     // Successfully retrieved the object.
            //     if(display.length == 0){
            //         response.success("Could not find that screen");
            //     }


            //     display[0].set('owner',userAgain);
            //     display[0].set('location',location);
            //     display[0].save();
            //     response.success("Added the display to your account.");

            //   },
            //   error: function(error) {
            //     response.success("Could not find that code! Please double check it.");
            //   }
            // });


        },
        error: function(code,coder){
            response.error(code);
        }
    });
});

Parse.Cloud.define("renewSubscription", function(request, response) {

    var stripeId = request.params.stripeId;
    var query = new Parse.Query(Parse.User);

    query.get(request.params.userId, {
        success: function(userAgain) {
            
            Parse.Cloud.httpRequest({
                method:"POST",
                url: "https://" + stripeKey + ":@api.stripe.com/v1/customers/" + stripeId + "/subscriptions",
                body:{
                    "plan": "firstplan"
                },
                success: function(httpResponse) {
                    userAgain.set('subscriptionId',httpResponse.data.id);
                    userAgain.save();
                    response.success(httpResponse);
                },
                    error: function(httpResponse) {
                    response.error('Request failed with response code ' + httpResponse.status);
                }
            });


        },
        error: function(){
            response.error('could not find user');
        }
    });
});

Parse.Cloud.afterSave("Display", function(request, response) {
    
    var display = request.object;

    if (!display.get("key")) {
    response.error('A Display must have a key.');
      } else {
        var Display = Parse.Object.extend("Display");
        var query = new Parse.Query(Display);

        query.descending("createdAt");
        query.equalTo("key", display.get("key"));
        
        query.find({
          success: function(objects) {
            if (objects) {

                if(objects.length>1)
                {
                    objects[0].destroy({
                      success: function(myObject) {
                        // The object was deleted from the Parse Cloud.
                      },
                      error: function(myObject, error) {
                        // The delete failed.
                        // error is a Parse.Error with an error code and message.
                      }
                    });
                }



              response.error("A Display with this key already exists.");
            } else {
              response.success();
            }
          },
          error: function(error) {
            response.error("Could not validate uniqueness for this Display object.");
          }
        });
      } 
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

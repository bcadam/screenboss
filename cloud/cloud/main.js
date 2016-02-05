var Image = require("parse-image");

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
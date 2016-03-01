import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';


var Tester = React.createClass({
    getInitialState: function() {
        return {
            "week" : {
                "monday": true,
                "tuesday": true,
                "wednesday": true,
                "thursday": true,
                "friday": true,
                "saturday": true,
                "sunday": true
            }
        };
    },
    componentWillMount:function() {
        // Parse.initialize('pp9waK9ticOFbhrJzrdITkRVQfCycHLqNPj2ZrN6');
        // Parse.serverURL = 'http://www.screenboss.co/parse';

        var AssignmentPattern = Parse.Object.extend("Display");
        var query = new Parse.Query(AssignmentPattern);
        // query.equalTo("published", false);
        query.find({
          success: function(results) {
            //alert("Successfully retrieved " + results.length + " scores.");
            // Do something with the returned Parse.Object values
            for (var i = 0; i < results.length; i++) {
              var object = results[i];
              alert(object.id);
            }
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
        });

    },
    render: function() {
        var self = this;
        


        return (
            <div>
                Done
            </div>);
        }
});

module.exports = Tester




import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';
Parse.initialize('pp9waK9ticOFbhrJzrdITkRVQfCycHLqNPj2ZrN6', '8UXFi3hzHgbKWoMZIIX3ZgUg0tHKPzSK6w8Ul0M6');

import RaisedButton from 'material-ui/lib/raised-button';


var LogOutButton = React.createClass({
    logOut: function() {
        //console.log(this.state);
        var self = this;

        Parse.User.logOut().then(function(){
            self.props.user.requestChange(null);
        });

    },
    render: function() {
        return (
            <div className="col-xs-12">
            <RaisedButton label="Log Out" primary={true} fullWidth={true} onClick={this.logOut} />
            </div>
        );
    }
});

module.exports = LogOutButton
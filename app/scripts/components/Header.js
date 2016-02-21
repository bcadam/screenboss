import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';
Parse.initialize('pp9waK9ticOFbhrJzrdITkRVQfCycHLqNPj2ZrN6', '8UXFi3hzHgbKWoMZIIX3ZgUg0tHKPzSK6w8Ul0M6');var LogOutButton = require('../components/LogOutButton.js');

import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';

/*var ProfileNavItem = require('./ProfileNavItem.js');
*/
var Header = React.createClass({
    handleClick: function(){
        //console.log("handleClick");
        this.props.open.requestChange(true);
    },
    render: function() {
        // Render the text of each comment as a list item
        var self = this;
        //iconElementRight={<ProfileNavItem />}
        return (
            <AppBar
                title="ScreenBoss"
                onLeftIconButtonTouchTap={self.handleClick}
                onTitleTouchTap={function(){window.location.assign("/#/");}}
                style={{backgroundColor:"#367FA9"}}
                iconElementRight={<FlatButton label="About" onTouchTap={function(){window.location.assign("/#/about");}} />}
              />
        );
    }
});

module.exports = Header
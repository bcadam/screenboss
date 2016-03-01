import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';
// Parse.initialize('pp9waK9ticOFbhrJzrdITkRVQfCycHLqNPj2ZrN6', '8UXFi3hzHgbKWoMZIIX3ZgUg0tHKPzSK6w8Ul0M6');

var LogOutButton = require('../components/LogOutButton.js');

import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';

var Header = React.createClass({
    handleClick: function(){
        this.props.open.requestChange(true);
    },
    render: function() {
        var self = this;
        //iconElementRight={<ProfileNavItem />}
        //iconElementRight={<FlatButton label="About" onTouchTap={function(){window.location.assign("/#/about");}} />}
        return (
            <AppBar
                title="ScreenBoss"
                onLeftIconButtonTouchTap={self.handleClick}
                onTitleTouchTap={function(){window.location.assign("/#/");}}
                style={{backgroundColor:"#1576B2"}}
                
              />
        );
    }
});

module.exports = Header
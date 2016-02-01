import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';
Parse.initialize('pp9waK9ticOFbhrJzrdITkRVQfCycHLqNPj2ZrN6', '8UXFi3hzHgbKWoMZIIX3ZgUg0tHKPzSK6w8Ul0M6');

import ProfileImage from 'material-ui/lib/svg-icons/action/account-box';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';


var ProfileNavItem = React.createClass({
    logOut: function(){
    	Parse.User.logOut().then(function(){
    		window.location.assign("/#/");
    	});

    },
    render: function() {
        // Render the text of each comment as a list item
        var self = this;
        var user = Parse.User.current();
        var loggedInMenuItems;

        if (user)
        {
        	loggedInMenuItems = (
        		<IconMenu
			      iconButtonElement={<IconButton><ProfileImage  color="white" /></IconButton>}
			      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
			      targetOrigin={{horizontal: 'left', vertical: 'top'}}
	    		>
	    		<MenuItem primaryText="Sign out" onTouchTap={self.logOut} />
	    		</IconMenu>);
        }
         

        return (
            <div>
	    
{/*	      <MenuItem primaryText="Refresh" />
	      <MenuItem primaryText="Send feedback" />
	      <MenuItem primaryText="Settings" />
	      <MenuItem primaryText="Help" />*/}
	      {loggedInMenuItems}
	    
	  </div>
        );
    }
});

module.exports = ProfileNavItem
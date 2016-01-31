import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import { Router } from 'react-router';

import LeftNav from 'material-ui/lib/left-nav';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Divider from 'material-ui/lib/divider';
import FontIcon from 'material-ui/lib/font-icon';
import ContentCopy from 'material-ui/lib/svg-icons/content/content-copy';
import ContentLink from 'material-ui/lib/svg-icons/content/link';
import Delete from 'material-ui/lib/svg-icons/action/delete';
import Download from 'material-ui/lib/svg-icons/file/file-download';
import Screen from 'material-ui/lib/svg-icons/hardware/cast';
import File from 'material-ui/lib/svg-icons/file/attachment';
import Dashboard from 'material-ui/lib/svg-icons/action/dashboard';
import RemoveRedEye from 'material-ui/lib/svg-icons/image/remove-red-eye';
var NewScreenForm = require('./NewScreenForm.js');


var LeftSideBar = React.createClass({
    handleToggle: function() {
        this.setState({open: !this.state.open});
    },
    handleClose: function() {
        this.setState({open: false});
    },
    render: function() {
        // Render the text of each comment as a list item
        var user = Parse.User.current();
        var self = this;
        var email = '';

        if(user)
        {
            email = user.get('email');
        }

        const style = {
          menu: {
            marginRight: 32,
            marginBottom: 32,
            float: 'left',
            position: 'relative',
            zIndex: 0,
          },
          rightIcon: {
            textAlign: 'center',
            lineHeight: '24px',
          },
        };

        //console.log(self.props.open);

        return (
            <LeftNav
              docked={false}
              width={300}
              open={self.props.open.value}
              onRequestChange={function(){

                //console.log(self.props.open);
                self.props.open.requestChange(false);
                

              }}
            >
              <MenuItem primaryText="Dashboard" leftIcon={<Dashboard />} onTouchTap={function(){window.location.assign("/#/app/");}} />
              <MenuItem primaryText="Screens" leftIcon={<Screen />} onTouchTap={function(){window.location.assign("/#/app/screens");}} />
              <MenuItem primaryText="Files" leftIcon={<File />} onTouchTap={function(){window.location.assign("/#/app/assets");}} />
              <Divider />
              {/*<MenuItem primaryText="Make a copy" leftIcon={<ContentCopy />} />
                            <MenuItem primaryText="Download" leftIcon={<Download />} />
                            <Divider />
                            <MenuItem primaryText="Remove" leftIcon={<Delete />} />*/}
                <NewScreenForm />
        </LeftNav>
        );
    }
});

module.exports = LeftSideBar





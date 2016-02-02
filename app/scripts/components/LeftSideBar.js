import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Divider from 'material-ui/lib/divider';


import Screen from 'material-ui/lib/svg-icons/hardware/cast';
import File from 'material-ui/lib/svg-icons/file/attachment';
import Dashboard from 'material-ui/lib/svg-icons/action/dashboard';

import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';

import AppBar from 'material-ui/lib/app-bar';

var LoginForm = require('./LoginForm.js');


var LeftSideBar = React.createClass({
    mixins: [LinkedStateMixin],

    handleToggle: function() {
        this.setState({open: !this.state.open});
    },
    handleClose: function() {
        this.setState({open: false});
    },
    getInitialState:function() {
        return {
              user : Parse.User.current()
        };
    },
    render: function() {
        // Render the text of each comment as a list item
        var user = Parse.User.current();
        var self = this;
        var email = '';

        var display;

        if(user)
        {
            email = user.get('email');

            display = (<div>
                <MenuItem primaryText="Dashboard" leftIcon={<Dashboard />} onTouchTap={function(){self.props.open.requestChange(false);window.location.assign("/#/app/");}} />
                <MenuItem primaryText="Screens" leftIcon={<Screen />} onTouchTap={function(){self.props.open.requestChange(false);window.location.assign("/#/app/screens");}} />
                <MenuItem primaryText="Files" leftIcon={<File />} onTouchTap={function(){self.props.open.requestChange(false);window.location.assign("/#/app/assets");}} />
                <Divider />
                {/*<NewScreenForm />*/}
                        </div>);
        }
        else{
            display = (<div><LoginForm user={this.linkState('user')} /></div>);
        }

        

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
            <AppBar
                title={<span>ScreenBoss</span>}
                showMenuIconButton={false}
                onTitleTouchTap={function(){self.props.open.requestChange(false);}}
                iconElementRight={<IconButton><NavigationClose /></IconButton>}
                style={{backgroundColor:"#367FA9"}}
                onClick={function(){self.props.open.requestChange(false);}}
              />
              {display}
               
            </LeftNav>
        );
    }
});

module.exports = LeftSideBar





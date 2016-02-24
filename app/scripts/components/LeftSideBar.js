import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Divider from 'material-ui/lib/divider';


import Schedules from 'material-ui/lib/svg-icons/action/query-builder';
import File from 'material-ui/lib/svg-icons/file/attachment';
import FileRequest from 'material-ui/lib/svg-icons/file/cloud-download';
import Profile from 'material-ui/lib/svg-icons/action/account-box';
import Dashboard from 'material-ui/lib/svg-icons/action/dashboard';
import LogOut from 'material-ui/lib/svg-icons/action/input';
import Calendars from 'material-ui/lib/svg-icons/action/today';
import SendFile from 'material-ui/lib/svg-icons/communication/email';
import DisplayIcon from 'material-ui/lib/svg-icons/av/airplay';

import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import PlayClaim from 'material-ui/lib/svg-icons/action/play-for-work';

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
        //console.log(Parse.User.current());

        return {
              user : this.props.user
        };
    },
    logOut: function(){
        var self = this;
        Parse.User.logOut().then(function(){
            console.log(self.props.user);
            //self.state.user.requestChange(null);
            window.location.assign("/#/");
        });

    },
    render: function() {
        // Render the text of each comment as a list item
        var user = Parse.User.current();
        var self = this;
        var email = '';
        var display;

        //console.log(self.state.user);




        if(user)
        {
            email = user.get('email');

            display = (
                <div>
                    <MenuItem primaryText="Profile" leftIcon={<Profile />} onTouchTap={function(){self.props.open.requestChange(false);window.location.assign("/#/app/profile");}} />
{/*                    <MenuItem primaryText="Dashboard" leftIcon={<Dashboard />} onTouchTap={function(){self.props.open.requestChange(false);window.location.assign("/#/app/");}} />
                    */}                    <MenuItem primaryText="Playlists" leftIcon={<Schedules />} onTouchTap={function(){self.props.open.requestChange(false);window.location.assign("/#/app/playlists");}} />
                    <MenuItem primaryText="Files" leftIcon={<File />} onTouchTap={function(){self.props.open.requestChange(false);window.location.assign("/#/app/assets");}} />
                    <MenuItem primaryText="Google Calendars" leftIcon={<Calendars />} onTouchTap={function(){self.props.open.requestChange(false);window.location.assign('/#/app/calendars')}} />
                    <MenuItem primaryText="Displays" leftIcon={<DisplayIcon />} onTouchTap={function(){self.props.open.requestChange(false);window.location.assign('/#/app/displays/')}} />
                    
                    <Divider />

                    <MenuItem primaryText="Claim Display" leftIcon={<PlayClaim />} onTouchTap={function(){self.props.open.requestChange(false);window.location.assign('/#/app/claim/')}} />
                    <MenuItem primaryText="Send File Request" leftIcon={<SendFile />} onTouchTap={function(){self.props.open.requestChange(false);window.location.assign('/#/app/sendfile/')}} />

                    <Divider />

                    <MenuItem primaryText="Log Out" leftIcon={<LogOut />} onTouchTap={self.logOut} />
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





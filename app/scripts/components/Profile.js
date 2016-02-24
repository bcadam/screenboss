import React from 'react';
import Parse from 'parse';
var moment = require('moment');
var ParseReact = require('parse-react');

import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Screen from 'material-ui/lib/svg-icons/hardware/cast';
import File from 'material-ui/lib/svg-icons/file/attachment';
import FileRequest from 'material-ui/lib/svg-icons/file/cloud-download';
import ProfileImage from 'material-ui/lib/svg-icons/action/account-box';
import Dashboard from 'material-ui/lib/svg-icons/action/dashboard';
import LogOut from 'material-ui/lib/svg-icons/action/input';
import Calendars from 'material-ui/lib/svg-icons/action/today';
import SendFile from 'material-ui/lib/svg-icons/communication/email';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import DisplayIcon from 'material-ui/lib/svg-icons/av/airplay';
import Schedules from 'material-ui/lib/svg-icons/action/query-builder';

var CreditCard = require('./CreditCard.js');

var Profile = React.createClass({
    mixins: [ParseReact.Mixin],
    componentWillMount:function() {
        var currentUser = Parse.User.current();

        if(!currentUser)
        {
            window.location.assign("#/app/login");
        }
    },
    getInitialState() {
        return {
            user: Parse.User.current() 
        };
    },
    observe: function() {
        //console.log(Parse.User.current());
        var currentUser = Parse.User.current();
        //console.log(currentUser);
        //Parse.User.logOut();

        if(!currentUser)
        {
            window.location.assign("#/app/login");
        }

        return {
            // user: (new Parse.Query('_User').equalTo('objectId',currentUser.id)).limit(1),
            screenassets: (new Parse.Query('ScreenAsset').equalTo('owner',currentUser)).descending('createdAt'),
            screens: (new Parse.Query('Screen').equalTo('owner',currentUser)).descending('createdAt'),
            calendars: (new Parse.Query('Calendar').equalTo('owner',currentUser)).descending('createdAt')
        };

    },
    render: function() {
        //console.log(this.state.user);
        var self = this;
        var user = Parse.User.current();
        var display;
        //console.log(this.props);

        if(self.state.user){
            display = (<div className="col-xs-12 well">
                        <div className="row">

                            <div className="col-xs-4 hidden-xs">
                                <img src="http://placehold.it/400?text=Profile+pictures+soon!" className="img-circle img img-responsive col-xs-12" style={{maxWidth:'300px',margin:'0 auto'}} />
                            </div>
                            
                            <div className="col-sm-8 col-xs-12">
                                <h3>{user.get('email')}</h3>
                                <h6>Member since: {moment(user.createdAt).format('MMM Do, YYYY')}</h6>
                                <div><a href='https://drive.google.com/open?id=0B3fMsATjcJxAZkk5bmk3Z2VSdHM' target="_blank">Download installer</a></div>
                                <MenuItem primaryText={"Playlists: " + self.data.screens.length} leftIcon={<Schedules />} onTouchTap={function(){window.location.assign("/#/app/schedules");}} />
                                <MenuItem primaryText={"Files: " + self.data.screenassets.length} leftIcon={<File />} onTouchTap={function(){window.location.assign("/#/app/assets");}} />
                                <MenuItem primaryText={"Calendars: " + self.data.calendars.length} leftIcon={<Calendars />} onTouchTap={function(){window.location.assign('/#/app/calendars')}} />
                                <MenuItem primaryText="Displays" leftIcon={<DisplayIcon />} onTouchTap={function(){window.location.assign('/#/app/displays/')}} />
                                <MenuItem primaryText={"Send File Request"} leftIcon={<SendFile />} onTouchTap={function(){window.location.assign('/#/app/sendfile/')}} />
                                <CreditCard />
                            </div>
                        </div>
                    </div>);
        }
        else{
            display = (<div></div>);
        }

        return (
            <div className="col-xs-12">
                {display}
            </div>
        );


        }
});

module.exports = Profile
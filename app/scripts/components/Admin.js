import React from 'react';
import Parse from 'parse';

var moment = require('moment');
var ParseReact = require('parse-react');

import { Link } from 'react-router'


// import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';

import MenuItem from 'material-ui/lib/menus/menu-item';
import Screen from 'material-ui/lib/svg-icons/hardware/cast';
import File from 'material-ui/lib/svg-icons/file/attachment';
// import FileRequest from 'material-ui/lib/svg-icons/file/cloud-download';
// import ProfileImage from 'material-ui/lib/svg-icons/action/account-box';
import Dashboard from 'material-ui/lib/svg-icons/action/dashboard';
import LogOut from 'material-ui/lib/svg-icons/action/input';
import Calendars from 'material-ui/lib/svg-icons/action/today';
import SendFile from 'material-ui/lib/svg-icons/communication/email';
// import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import DisplayIcon from 'material-ui/lib/svg-icons/av/airplay';
import Schedules from 'material-ui/lib/svg-icons/action/query-builder';

import Dialog from 'material-ui/lib/dialog';
// import PlayClaim from 'material-ui/lib/svg-icons/action/play-for-work';

var CreditCard = require('./CreditCard.js');

var Profile = React.createClass({
    mixins: [ParseReact.Mixin],
    componentWillMount:function() {
        //var currentUser = Parse.User.current();
        // var roleACL = new Parse.ACL();
        // roleACL.setPublicReadAccess(true);
        // var role = new Parse.Role("Administrator", roleACL);
        // role.getUsers().add(Parse.User.current());
        // role.save();

        var queryRole = new Parse.Query(Parse.Role);
        queryRole.equalTo('name', 'Administrator');
        queryRole.first({
            success: function(result) { // Role Object
                var role = result;
                var adminRelation = new Parse.Relation(role, 'users');
                var queryAdmins = adminRelation.query();

                queryAdmins.equalTo('objectId', Parse.User.current().id);
                queryAdmins.first({
                    success: function(result) {    // User Object
                        var user = result;
                        //user ? console.log('USER : ', user) : console.log('User not Administrator!');
                    }
                });

            },
            error: function(error) {}
        });

    },
    getInitialState: function() {
        return {
            user: Parse.User.current(),
            open:false
        };
    },
    observe: function() {
        //console.log(Parse.User.current());
        var currentUser = Parse.User.current().has;

        return {
            screenassets: new Parse.Query('ScreenAsset').descending('createdAt'),
            screens: new Parse.Query('Screen').descending('createdAt'),
            calendars: new Parse.Query('Calendar').descending('createdAt'),
            users: new Parse.Query('_User').descending('createdAt')
        };

    },
    render: function() {
        //console.log(this.state.user);
        var self = this;
        return (
            <div className="col-xs-12">
                {self.data.users.length}
            </div>
        );


        }
});

module.exports = Profile
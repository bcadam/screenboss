import React from 'react';
import Parse from 'parse';
var moment = require('moment');
var ParseReact = require('parse-react');
import { Link } from 'react-router'


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

import Dialog from 'material-ui/lib/dialog';
import PlayClaim from 'material-ui/lib/svg-icons/action/play-for-work';

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
    handleOpen:function() {
        this.setState({open: true});
    },
    handleClose:function() {
        this.setState({open: false});
    },
    getInitialState: function() {
        return {
            user: Parse.User.current(),
            open:false
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

        return (
            <div className="col-xs-12">
                <div className="col-xs-12 well">
                    <div className="row">

                        <div className="col-xs-4 hidden-xs">
                            <img src="http://placehold.it/400?text=Profile+pictures+soon!" className="img-circle img img-responsive col-xs-12" style={{maxWidth:'300px',margin:'0 auto'}} />
                        </div>
                        <Dialog
                          title="Installation Instructions"
                          modal={false}
                          open={this.state.open}
                          onRequestClose={this.handleClose} >
                            <div className='row'>
                                <div className='col-xs-12'>
                                    <div className='col-xs-12 col-sm-4 text-center'>
                                        <h3>Download</h3>
                                        <a href='/public/install'><i className="col-xs-12 fa fa-cloud-download fa-5x well"></i></a>
                                        <p>Download this file to any mac with Google Chrome installed</p>
                                    </div>
                                    <div className='col-xs-12 col-sm-4 text-center'>
                                        <h3>Run</h3>
                                        <i className="col-xs-12 fa fa-cogs fa-5x well"></i>
                                        <p>Run the file once</p>
                                    </div>
                                    <div className='col-xs-12 col-sm-4 text-center'>
                                        <h3>Claim</h3>
                                        <i className="col-xs-12 fa fa-check-square-o fa-5x well"></i>
                                        <p>From your ScreenBoss account, claim the screen</p>
                                    </div>
                                </div>
                            </div>
                        </Dialog>
                        <div className="col-sm-8 col-xs-12">
                            <h3>{user.get('email')}</h3>
                            <h6>Member since: {moment(user.createdAt).format('MMM Do, YYYY')}</h6>
                            <FlatButton label="Installation Instructions" onTouchTap={this.handleOpen} />
                            <Link to="app/playlists"><MenuItem primaryText={"Playlists: " + self.data.screens.length} leftIcon={<Schedules />} /></Link>
                            <Link to="app/assets"><MenuItem primaryText={"Files: " + self.data.screenassets.length} leftIcon={<File />} /></Link>
                            <Link to="app/calendars"><MenuItem primaryText={"Calendars: " + self.data.calendars.length} leftIcon={<Calendars />} /></Link>
                            <Link to="app/displays"><MenuItem primaryText="Displays" leftIcon={<DisplayIcon />} /></Link>
                            <Link to="app/sendfile"><MenuItem primaryText={"Send File Request"} leftIcon={<SendFile />} /></Link>
                            <CreditCard />
                        </div>

                    </div>
                </div>
            </div>
        );


        }
});

module.exports = Profile
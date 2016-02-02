import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';
Parse.initialize('pp9waK9ticOFbhrJzrdITkRVQfCycHLqNPj2ZrN6', '8UXFi3hzHgbKWoMZIIX3ZgUg0tHKPzSK6w8Ul0M6');var LogOutButton = require('../components/LogOutButton.js');

import AppBar from 'material-ui/lib/app-bar';


var ProfileNavItem = require('./ProfileNavItem.js');

var Header = React.createClass({
    handleClick: function(){
        //console.log("handleClick");
        this.props.open.requestChange(true);
    },
    render: function() {
        // Render the text of each comment as a list item
        var self = this;
        return (
            <AppBar
                title="ScreenBoss"
                onLeftIconButtonTouchTap={self.handleClick}
                onTitleTouchTap={function(){window.location.assign("/#/");}}
                style={{backgroundColor:"#367FA9"}}
                iconElementRight={<ProfileNavItem />}
              />
        );
    }
});

module.exports = Header




   {/*<header className="header">
            <a href="/#/" className="logo">
                ScreenBoss
            </a>
            <nav className="navbar navbar-static-top" role="navigation">
                <div onClick={self.handleClick} className="navbar-btn sidebar-toggle" data-toggle="offcanvas" role="button">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </div>
             <div className="navbar-right">
                                    <ul className="nav navbar-nav">
                                        <li className="dropdown messages-menu">
                                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                                <i className="fa fa-envelope"></i>
                                                <span className="label label-success">4</span>
                                            </a>
                                            <ul className="dropdown-menu">
                                                <li className="header">You have 4 messages</li>
                                                <li>
                                                    <ul className="menu">
                                                        <li>
                                                            <a href="#">
                                                                <div className="pull-left">
                                                                    <img src="images/avatar3.png" className="img-circle" alt="User Image"/>
                                                                </div>
                                                                <h4>
                                                                    Support Team
                                                                    <small><i className="fa fa-clock-o"></i> 5 mins</small>
                                                                </h4>
                                                                <p>Why not buy a new awesome theme?</p>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <div className="pull-left">
                                                                    <img src="images/avatar2.png" className="img-circle" alt="user image"/>
                                                                </div>
                                                                <h4>
                                                                    AdminLTE Design Team
                                                                    <small><i className="fa fa-clock-o"></i> 2 hours</small>
                                                                </h4>
                                                                <p>Why not buy a new awesome theme?</p>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <div className="pull-left">
                                                                    <img src="images/avatar.png" className="img-circle" alt="user image"/>
                                                                </div>
                                                                <h4>
                                                                    Developers
                                                                    <small><i className="fa fa-clock-o"></i> Today</small>
                                                                </h4>
                                                                <p>Why not buy a new awesome theme?</p>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <div className="pull-left">
                                                                    <img src="images/avatar2.png" className="img-circle" alt="user image"/>
                                                                </div>
                                                                <h4>
                                                                    Sales Department
                                                                    <small><i className="fa fa-clock-o"></i> Yesterday</small>
                                                                </h4>
                                                                <p>Why not buy a new awesome theme?</p>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <div className="pull-left">
                                                                    <img src="images/avatar.png" className="img-circle" alt="user image"/>
                                                                </div>
                                                                <h4>
                                                                    Reviewers
                                                                    <small><i className="fa fa-clock-o"></i> 2 days</small>
                                                                </h4>
                                                                <p>Why not buy a new awesome theme?</p>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="footer"><a href="#">See All Messages</a></li>
                                            </ul>
                                        </li>
                                        <li className="dropdown notifications-menu">
                                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                                <i className="fa fa-warning"></i>
                                                <span className="label label-warning">10</span>
                                            </a>
                                            <ul className="dropdown-menu">
                                                <li className="header">You have 10 notifications</li>
                                                <li>
                                                    <ul className="menu">
                                                        <li>
                                                            <a href="#">
                                                                <i className="ion ion-ios7-people info"></i> 5 new members joined today
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <i className="fa fa-warning danger"></i> Very long description here that may not fit into the page and may cause design problems
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <i className="fa fa-users warning"></i> 5 new members joined
                                                            </a>
                                                        </li>
                
                                                        <li>
                                                            <a href="#">
                                                                <i className="ion ion-ios7-cart success"></i> 25 sales made
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <i className="ion ion-ios7-person danger"></i> You changed your username
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="footer"><a href="#">View all</a></li>
                                            </ul>
                                        </li>
                                        <li className="dropdown tasks-menu">
                                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                                <i className="fa fa-tasks"></i>
                                                <span className="label label-danger">9</span>
                                            </a>
                                            <ul className="dropdown-menu">
                                                <li className="header">You have 9 tasks</li>
                                                <li>
                                                    <ul className="menu">
                                                        <li>
                                                            <a href="#">
                                                                <h3>
                                                                    Design some buttons
                                                                    <small className="pull-right">20%</small>
                                                                </h3>
                                                                <div className="progress xs">
                                                                    <div className="progress-bar progress-bar-aqua" style={{width: "20%"}} role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                                                        <span className="sr-only">20% Complete</span>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <h3>
                                                                    Create a nice theme
                                                                    <small className="pull-right">40%</small>
                                                                </h3>
                                                                <div className="progress xs">
                                                                    <div className="progress-bar progress-bar-green" style={{width: "40%"}} role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                                                        <span className="sr-only">40% Complete</span>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <h3>
                                                                    Some task I need to do
                                                                    <small className="pull-right">60%</small>
                                                                </h3>
                                                                <div className="progress xs">
                                                                    <div className="progress-bar progress-bar-red" style={{width: "60%"}} role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                                                        <span className="sr-only">60% Complete</span>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <h3>
                                                                    Make beautiful transitions
                                                                    <small className="pull-right">80%</small>
                                                                </h3>
                                                                <div className="progress xs">
                                                                    <div className="progress-bar progress-bar-yellow" style={{width: "80%"}} role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                                                        <span className="sr-only">80% Complete</span>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="footer">
                                                    <a href="#">View all tasks</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="dropdown user user-menu">
                                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                                <i className="glyphicon glyphicon-user"></i>
                                                <span>Jane Doe <i className="caret"></i></span>
                                            </a>
                                            <ul className="dropdown-menu">
                                                <li className="user-header bg-light-blue">
                                                    <img src="images/avatar3.png" className="img-circle" alt="User Image" />
                                                    <p>
                                                        Jane Doe - Web Developer
                                                        <small>Member since Nov. 2012</small>
                                                    </p>
                                                </li>
                                                <li className="user-body">
                                                    <div className="col-xs-4 text-center">
                                                        <a href="#">Followers</a>
                                                    </div>
                                                    <div className="col-xs-4 text-center">
                                                        <a href="#">Sales</a>
                                                    </div>
                                                    <div className="col-xs-4 text-center">
                                                        <a href="#">Friends</a>
                                                    </div>
                                                </li>
                                                <li className="user-footer">
                                                    <div className="pull-left">
                                                        <a href="#" className="btn btn-default btn-flat">Profile</a>
                                                    </div>
                                                    <div className="pull-right">
                                                        <a href="#" className="btn btn-default btn-flat">Sign out</a>
                                                    </div>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
            </nav>
        </header>*/}
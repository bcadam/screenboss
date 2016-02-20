var React = require('react');
var FileInput = require('react-file-input');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var Button = require('react-bootstrap').Button;
var Parse = require('parse');
var ParseReact = require('parse-react');
Parse.initialize('pp9waK9ticOFbhrJzrdITkRVQfCycHLqNPj2ZrN6', '8UXFi3hzHgbKWoMZIIX3ZgUg0tHKPzSK6w8Ul0M6');

import CircularProgress from 'material-ui/lib/circular-progress';
import Checkbox from 'material-ui/lib/checkbox';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import Dialog from 'material-ui/lib/dialog';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import packageJSON from '../../package.json';
import DropzoneStarter from 'react-dropzone';
import injectTapEventPlugin from 'react-tap-event-plugin';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import NavigationExpandMoreIcon from 'material-ui/lib/svg-icons/navigation/expand-more';
import Link from 'react-router';
import LeftNav from 'material-ui/lib/left-nav';


var Header = React.createClass({
    render: function() {
        // Render the text of each comment as a list item
        
        return (
            <header className="header">
            <a href="../index.html" className="logo">
                ScreenBoss
            </a>
            <nav className="navbar navbar-static-top" role="navigation">
                <a href="#" className="navbar-btn sidebar-toggle" data-toggle="offcanvas" role="button">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </a>
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
                                                    <img src="../images/avatar3.png" className="img-circle" alt="User Image"/>
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
                                                    <img src="../images/avatar2.png" className="img-circle" alt="user image"/>
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
                                                    <img src="../images/avatar.png" className="img-circle" alt="user image"/>
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
                                                    <img src="../images/avatar2.png" className="img-circle" alt="user image"/>
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
                                                    <img src="../images/avatar.png" className="img-circle" alt="user image"/>
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
                                    <img src="../images/avatar3.png" className="img-circle" alt="User Image" />
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
        </header>
        );
    }
});

var Body = React.createClass({
    render: function() {
        // Render the text of each comment as a list item
        
        return (
            <div className="wrapper row-offcanvas row-offcanvas-left">
            <aside className="left-side sidebar-offcanvas">                
                <section className="sidebar">
                    <div className="user-panel">
                        <div className="pull-left image">
                            <img src="../images/avatar3.png" className="img-circle" alt="User Image" />
                        </div>
                        <div className="pull-left info">
                            <p>Hello, Jane</p>

                            <a href="#"><i className="fa fa-circle text-success"></i> Online</a>
                        </div>
                    </div>
                    <form action="#" method="get" className="sidebar-form">
                        <div className="input-group">
                            <input type="text" name="q" className="form-control" placeholder="Search..."/>
                            <span className="input-group-btn">
                                <button type='submit' name='seach' id='search-btn' className="btn btn-flat"><i className="fa fa-search"></i></button>
                            </span>
                        </div>
                    </form>
                    <ul className="sidebar-menu">
                        <li className="active">
                            <a href="../index.html">
                                <i className="fa fa-dashboard"></i> <span>Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="widgets.html">
                                <i className="fa fa-th"></i> <span>Widgets</span> <small className="badge pull-right bg-green">new</small>
                            </a>
                        </li>
                        <li className="treeview">
                            <a href="#">
                                <i className="fa fa-bar-chart-o"></i>
                                <span>Charts</span>
                                <i className="fa fa-angle-left pull-right"></i>
                            </a>
                            <ul className="treeview-menu">
                                <li><a href="charts/morris.html"><i className="fa fa-angle-double-right"></i> Morris</a></li>
                                <li><a href="charts/flot.html"><i className="fa fa-angle-double-right"></i> Flot</a></li>
                                <li><a href="charts/inline.html"><i className="fa fa-angle-double-right"></i> Inline charts</a></li>
                            </ul>
                        </li>
                        <li className="treeview">
                            <a href="#">
                                <i className="fa fa-laptop"></i>
                                <span>UI Elements</span>
                                <i className="fa fa-angle-left pull-right"></i>
                            </a>
                            <ul className="treeview-menu">
                                <li><a href="UI/general.html"><i className="fa fa-angle-double-right"></i> General</a></li>
                                <li><a href="UI/icons.html"><i className="fa fa-angle-double-right"></i> Icons</a></li>
                                <li><a href="UI/buttons.html"><i className="fa fa-angle-double-right"></i> Buttons</a></li>
                                <li><a href="UI/sliders.html"><i className="fa fa-angle-double-right"></i> Sliders</a></li>
                                <li><a href="UI/timeline.html"><i className="fa fa-angle-double-right"></i> Timeline</a></li>
                            </ul>
                        </li>
                        <li className="treeview">
                            <a href="#">
                                <i className="fa fa-edit"></i> <span>Forms</span>
                                <i className="fa fa-angle-left pull-right"></i>
                            </a>
                            <ul className="treeview-menu">
                                <li><a href="forms/general.html"><i className="fa fa-angle-double-right"></i> General Elements</a></li>
                                <li><a href="forms/advanced.html"><i className="fa fa-angle-double-right"></i> Advanced Elements</a></li>
                                <li><a href="forms/editors.html"><i className="fa fa-angle-double-right"></i> Editors</a></li>                                
                            </ul>
                        </li>
                        <li className="treeview">
                            <a href="#">
                                <i className="fa fa-table"></i> <span>Tables</span>
                                <i className="fa fa-angle-left pull-right"></i>
                            </a>
                            <ul className="treeview-menu">
                                <li><a href="tables/simple.html"><i className="fa fa-angle-double-right"></i> Simple tables</a></li>
                                <li><a href="tables/data.html"><i className="fa fa-angle-double-right"></i> Data tables</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="calendar.html">
                                <i className="fa fa-calendar"></i> <span>Calendar</span>
                                <small className="badge pull-right bg-red">3</small>
                            </a>
                        </li>
                        <li>
                            <a href="mailbox.html">
                                <i className="fa fa-envelope"></i> <span>Mailbox</span>
                                <small className="badge pull-right bg-yellow">12</small>
                            </a>
                        </li>
                        <li className="treeview">
                            <a href="#">
                                <i className="fa fa-folder"></i> <span>Examples</span>
                                <i className="fa fa-angle-left pull-right"></i>
                            </a>
                            <ul className="treeview-menu">
                                <li><a href="examples/invoice.html"><i className="fa fa-angle-double-right"></i> Invoice</a></li>
                                <li><a href="examples/login.html"><i className="fa fa-angle-double-right"></i> Login</a></li>
                                <li><a href="examples/register.html"><i className="fa fa-angle-double-right"></i> Register</a></li>
                                <li><a href="examples/lockscreen.html"><i className="fa fa-angle-double-right"></i> Lockscreen</a></li>
                                <li><a href="examples/404.html"><i className="fa fa-angle-double-right"></i> 404 Error</a></li>
                                <li><a href="examples/500.html"><i className="fa fa-angle-double-right"></i> 500 Error</a></li>                                
                                <li><a href="examples/blank.html"><i className="fa fa-angle-double-right"></i> Blank Page</a></li>
                            </ul>
                        </li>
                        <li className="treeview">
                            <a href="#">
                                <i className="fa fa-folder"></i>  Multilevel Menu
                                <i className="fa fa-angle-left pull-right"></i>
                            </a>                            

                            <ul className="treeview-menu">
                                <li className="treeview">
                                    <a href="#">
                                        First level
                                        <i className="fa fa-angle-left pull-right"></i>
                                    </a>

                                    <ul className="treeview-menu">
                                        <li className="treeview">
                                            <a href="#">
                                                Second level
                                                <i className="fa fa-angle-left pull-right"></i>
                                            </a>

                                            <ul className="treeview-menu">
                                                <li>
                                                    <a href="#">Third level</a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </section>
            </aside>

            <aside className="right-side">                
                <section className="content-header">
                    <h1>
                        Blank page
                        <small>Control panel</small>
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                        <li className="active">Blank page</li>
                    </ol>
                </section>

                <section className="content">


                </section>
            </aside>
        </div>
        );
    }
});

export default React.createClass({
    mixins: [LinkedStateMixin],

        render() {
            
            return (
                    <Body />
            )
        }
});

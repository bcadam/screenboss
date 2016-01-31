import FileInput from 'react-file-input';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Button from 'react-bootstrap';
import CircularProgress from 'material-ui/lib/circular-progress';
import Checkbox from 'material-ui/lib/checkbox';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import Dialog from 'material-ui/lib/dialog';
import DatePicker from 'material-ui/lib/date-picker/date-picker';

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
import RaisedButton from 'material-ui/lib/raised-button';
injectTapEventPlugin();

import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';
Parse.initialize('pp9waK9ticOFbhrJzrdITkRVQfCycHLqNPj2ZrN6', '8UXFi3hzHgbKWoMZIIX3ZgUg0tHKPzSK6w8Ul0M6');


var NewScreenForm = require('../components/NewScreenForm.js');
var Dropzone = require('../components/Dropzone.js');
var LoginForm = require('../components/LoginForm.js');
var LogOutButton = require('../components/LogOutButton.js');
var ScreenList = require('../components/ScreenList.js');
var ScreenDisplay = require('../components/ScreenDisplay.js');
var AddAssetDropDown = require('../components/AddAssetDropDown.js');
var AssignmentWithToggle = require('../components/AssignmentWithToggle.js');
var AssetWithToggle = require('../components/AssetWithToggle.js');
var NewAssetForm = require('../components/NewAssetForm.js');
var SiteDemo = require('../components/SiteDemo.js');
var SiteDemoSimple = require('../components/SiteDemoSimple.js');
var AssetMenu = require('../components/AssetMenu.js');
var NewScreenSidebar = require('../components/NewScreenSidebar.js');
var AssetList = require('../components/AssetList.js');
var IndividualAsset = require('../components/IndividualAsset.js');
var ScreenAssetList = require('../components/ScreenAssetList.js');
var AssetWithToggle = require('../components/AssetWithToggle.js');
var Header = require('../components/Header.js');
var LeftSideBar = require('../components/LeftSideBar.js');



var MainApp = React.createClass({
    mixins: [LinkedStateMixin],

        componentWillMount(){

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
        render() {
            // const version = packageJSON.version;

            var loggedIn = (
                <div>
                <ReactCSSTransitionGroup transitionName="loading" transitionAppear={true} transitionEnterTimeout={500} transitionLeaveTimeout={500} transitionAppearTimeout={500}>
                
                <div className="">
                    <SiteDemoSimple />
                </div>

                {/*<div className="hidden">
                                    <AssetMenu style={{zIndex:"10"}} / >
                                </div>

                <div className="hidden">
                    <NewScreenSidebar style={{zIndex:"10"}} / >
                </div>

                <div className="col-xs-12">
                </div>*/}

                <section>
                    <div className="container">
                        <div className="big-gap" />
                        <div className="box">
                            <div className="center">

                                {/*<div className='col-xs-12'>
                                                                    <ScreenList />    
                                                                </div>*/}
                                

                                <div style={{marginTop:"30px"}} className='col-xs-12 col-xs-6'>
                                    <div className='hidden col-xs-12 col-sm-6'>
                                        <LogOutButton class="" style={{marginTop:'20px'}} user={this.linkState('user')} />
                                    </div>
                                    
                                </div>

                                {/*<div className='col-xs-12 col-sm-6'>
                                                                    <NewScreenForm className='' />
                                                                </div> */}
                                <div className='col-xs-12 col-sm-6' >
                                    <Dropzone style={{width:'100% !important',maxHeight:'100px !important'}} />
                                </div>

                                <div className='row'></div>

                                <div className='row hidden'>
                                    <ScreenAssetList />
                                </div>

                                <div className='row'>
                                    <AssetList />
                                </div>

                                <div className="row">
                                <LogOutButton style={{marginTop:'20px'}} user={this.linkState('user')} />
                                </div>

                            </div>
                        </div> 
                    </div>
                </section>

                </ReactCSSTransitionGroup>
                </div>);




            var notLoggedIn = (<div><div className="big-gap"></div>
                <LoginForm user={this.linkState('user')} /></div>);



            var simpleLogIn = (<div>
                                    <SiteDemoSimple />
                                    {/*<NewScreenForm />*/}
                                    <ScreenList />
                                    <br />
                                    <AssetList />
                                </div>);

            var display = ((this.state.user != null) ? simpleLogIn : notLoggedIn);

            // <body>
            //         <Header />
            //           {display}
            //         </body>


            console.log(this.props.params.screenid);
            return (

                  
                <div>
			                	{display}          
                                </div>    
                           
            )
        }
});

module.exports = MainApp

import LinkedStateMixin from 'react-addons-linked-state-mixin';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';
Parse.initialize('pp9waK9ticOFbhrJzrdITkRVQfCycHLqNPj2ZrN6', '8UXFi3hzHgbKWoMZIIX3ZgUg0tHKPzSK6w8Ul0M6');


var SiteDemoSimple = require('../components/SiteDemoSimple.js');
var ScreenList = require('../components/ScreenList.js');
var AssetList = require('../components/AssetList.js');
var IndividualAsset = require('../components/IndividualAsset.js');
var Dropzone = require('../components/Dropzone.js');
var NewScreenForm = require('../components/NewScreenForm.js');


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

            var loggedIn = (
                    <ReactCSSTransitionGroup transitionName="loading" transitionAppear={true} transitionEnterTimeout={500} transitionLeaveTimeout={500} transitionAppearTimeout={500}>
                    
                        <div>
                            <SiteDemoSimple />
                            <Dropzone/>
                            <NewScreenForm />
                            <ScreenList />
                            <AssetList />
                        </div>

                    </ReactCSSTransitionGroup>);

            return (

                <div>
            	   {loggedIn}          
                </div>    
                           
            )
        }
});

module.exports = MainApp

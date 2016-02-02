import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

var Dropzone = require('../components/Dropzone.js');
var AssetList = require('../components/AssetList.js');
var SiteDemoSimple = require('../components/SiteDemoSimple.js');
var ScreenList = require('../components/ScreenList.js');

var NewScreenFormGettingStarted = React.createClass({
    getInitialState: function() {
        return {
            name: '',
            description: ''
        };
    },
    handleChange: function(name, e) {
        var change = {};
        change[name] = e.target.value;
        this.setState(change);
    },
    createScreen: function() {

        var self = this;
        var owner = Parse.User.current();
        var custom_acl = new Parse.ACL();
        custom_acl.setWriteAccess(Parse.User.current(), true);
        custom_acl.setReadAccess(Parse.User.current(), true);

        var configs ={
            name: self.state.name,
            description: self.state.description,
            owner : owner,
            ACL : custom_acl,
            published: true
        };

        var newScreen = ParseReact.Mutation.Create('Screen',configs).dispatch(function(){
            self.setState({name:'',description:''});
        });
        
    },
    render: function() {
        var self = this;
        return (
            <div id="newScreenForm" className='col-xs-12'>
                    <TextField fullWidth={true} id='screenName' hintText="Main Lobby" floatingLabelText="Schedule Name" onChange={self.handleChange.bind(self, 'name')} value={self.state.name} />
                    <TextField fullWidth={true} id='screenDescription' hintText="Next two weeks" floatingLabelText="Description or use" onChange={self.handleChange.bind(self, 'description')} value={self.state.description} />
                <RaisedButton fullWidth={true} id="newScreenButton" label="Create Schedule" secondary={true} onClick={self.createScreen} />
                <div style={{marginBottom:"20px;"}} />
            </div>
        );
    }
});



var GettingStartedScreens = React.createClass({
    componentDidMount: function(){
        introJs().setOption('doneLabel', 'Next page').start().oncomplete(function() {
          window.location.href = '/#/app/gettingstartedassets';
        });

        $('#newScreenButton').click(function(){
            console.log('clicked');
            introJs().start().nextStep();
        });
    },
    render: function() {
        // Render the text of each comment as a list item
        var self = this;

        //<th>Published</th>
        return (
            
            <div>
                <div data-step="3" data-intro="Create a new screen.">
                    <NewScreenFormGettingStarted />
                </div>
                <div data-step="4" data-position="bottom" data-intro="Your screens will show up here.">
                    <ScreenList />
                </div>
            </div>
        );
    }
});

module.exports = GettingStartedScreens
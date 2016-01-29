// var browserify = require("babelify");
// var babelify = require("babelify");
// browserify().transform(babelify, {presets: ["es2015", "react"]});

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
import DropzoneStarter from 'react-dropzone';
import injectTapEventPlugin from 'react-tap-event-plugin';
import DropDownMenu from 'material-ui/lib/DropDownMenu';

injectTapEventPlugin();
import {
    Link
}
from 'react-router';

var key = window.location.href;
var count = key.indexOf('filerequest/');
key = key.substring(count + 12, key.length);
console.log(key);



var Dropzone = React.createClass({
    onDrop: function(files) {
        var self = this;
        self.setState({loading:true});

        var custom_acl = new Parse.ACL();
        custom_acl.setWriteAccess(Parse.User.current(), true);
        custom_acl.setReadAccess(Parse.User.current(), true);

        for (var i = 0; i < files.length; i++) {
            var myTargetFile = files[i];

            if (myTargetFile) {
                var fileName = myTargetFile.name;
                var parseFile = new Parse.File(fileName, myTargetFile);
                parseFile.save().then(function() {
                    var variables = {
                        'file': parseFile,
                        'name': fileName,
                        'owner': Parse.User.current(),
                        'published': true,
                        'ACL' : custom_acl
                    };
                    var newScreen = ParseReact.Mutation.Create('ScreenAsset', variables);
                    newScreen.dispatch().then(function(){
                        self.setState({loading:false});
                    },function(){
                        self.setState({loading:false})
                    });
                    //console.log('Uploaded image: ' + fileName);
                });
            }
        };
    },
    getInitialState:function(){
        return{
            loading:false
        };
    },
    render: function() {

        var display;
        if (this.state.loading)
        {
            display = <CircularProgress mode="indeterminate" size={2}/>
        }
        else {
            display = (<DropzoneStarter className='col-xs-12' style={{borderStyle:'dashed',minHeight:120}} onDrop={this.onDrop}>
              <h2>Add a new file by dropping it here, or click here to select one to upload.</h2>
            </DropzoneStarter>);
        }
        return (
            <div>
            {display}
            </div>
        );
    }
});







export default React.createClass({
    mixins: [LinkedStateMixin],

    returnSomething(something) {
        //this is only for testing purposes. Check /test/components/App-test.js
        return something;
    },
    getInitialState() {
        return {
            user: Parse.User.current(),
            imageClass: {
                width: "100%",
                height: "auto",
                overflow: "hidden"
            }
        };
    },
    render() {
        // var user = Parse.User.current();
        // console.log(user);
        // var self = this;
        // var loggedIn = (<ScreenDisplayAnimator user={self.linkState('user')} imageClass={self.linkState('imageClass')} />);

        // var notLoggedIn = <LoginForm user={this.linkState('user')} />;
        // var display = ((this.state.user != null) ? loggedIn : notLoggedIn);

        return (
            <Dropzone />
        );
    }
});

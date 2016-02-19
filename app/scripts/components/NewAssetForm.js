import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';


import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
var FileInput = require('react-file-input');



var NewAssetForm = React.createClass({
    getInitialState: function() {
        var custom_acl = new Parse.ACL();
        custom_acl.setWriteAccess(Parse.User.current(), true);
        custom_acl.setReadAccess(Parse.User.current(), true);
        custom_acl.setPublicReadAccess(true);

        return {
            'file': null,
            'name': null,
            'owner': Parse.User.current(),
            'published': true,
            'ACL' : custom_acl
        };
    },
    handleChange: function(name, e) {
        var change = {};
        change[name] = e.target.value;
        this.setState(change);
    },
    createScreen: function() {
        //console.log(this.state);
        ParseReact.Mutation.Create('ScreenAsset', this.state).dispatch();
    },
    handleFile: function(event) {
        //console.log('Selected file:', event.target.files[0]);
        var myTargetFile = event.target.files[0];
        var self = this;
        var fileName = myTargetFile.name;
        var parseFile = new Parse.File(fileName, myTargetFile);
        parseFile.save().then(function() {
            self.setState({file:parseFile,name:fileName});
        });

      },
    render: function() {
        return (
            <div>
                <div className='form-group'>
                    <TextField  id='assetName' className="col-xs-12" hintText="" floatingLabelText="Floating Label Text" onChange={this.handleChange.bind(this, 'name')} />
                </div>
                <div className='form-group'>
                    <TextField onChange={this.handleChange.bind(this, 'description')} id='assetDescription' className="col-xs-12" hintText="" floatingLabelText="Description or location" onChange={this.handleChange.bind(this, 'name')} />
                </div>
                <div className='form-group'>
                    <FileInput name="myImage"
                   accept=".png,.gif,.jpg"
                   placeholder="My Image"
                   className="inputClass"
                   style={{borderStyle:'solid !important',borderColor:'black'}}
                   onChange={this.handleFile} />
                </div>
                <RaisedButton label="Create Screen" primary={true} onClick={this.createScreen} />
            </div>
        );
    }
});

module.exports = NewAssetForm
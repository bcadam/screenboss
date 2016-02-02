import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';
Parse.initialize('pp9waK9ticOFbhrJzrdITkRVQfCycHLqNPj2ZrN6', '8UXFi3hzHgbKWoMZIIX3ZgUg0tHKPzSK6w8Ul0M6');



import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';


var NewScreenForm = React.createClass({
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


        var newScreen = ParseReact.Mutation.Create('Screen',configs).dispatch();

        
        
    },
    render: function() {
        return (
            <div id="newScreenForm" className='col-xs-12'>
                    <TextField fullWidth={true} id='screenName' hintText="Main Lobby" floatingLabelText="Schedule Name" onChange={this.handleChange.bind(this, 'name')} />
                    <TextField fullWidth={true} id='screenDescription' hintText="Next two weeks" floatingLabelText="Description or use" onChange={this.handleChange.bind(this, 'description')} />
                <RaisedButton fullWidth={true} label="Create Schedule" secondary={true} onClick={this.createScreen} />
                <div style={{marginBottom:"20px;"}} />
            </div>
        );
    }
});

module.exports = NewScreenForm
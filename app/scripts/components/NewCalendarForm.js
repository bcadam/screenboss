import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';
// Parse.initialize('pp9waK9ticOFbhrJzrdITkRVQfCycHLqNPj2ZrN6', '8UXFi3hzHgbKWoMZIIX3ZgUg0tHKPzSK6w8Ul0M6');

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

var NewCalendarForm = React.createClass({
    getInitialState: function() {
        return {
            name: '',
            calendarId: ''
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
        custom_acl.setPublicReadAccess(true);

        var configs ={
            name: self.state.name,
            calendarId: self.state.calendarId,
            owner : owner,
            ACL : custom_acl,
            published: true
        };

        var newScreen = ParseReact.Mutation.Create('Calendar',configs).dispatch(function(){
            self.setState({name:'',description:''});
            window.location.reload();
        });
        
    },
    render: function() {
        var self = this;
        return (
            <div id="newScreenForm" className='col-xs-12'>
                    <TextField fullWidth={true} id='calendarName' hintText="Entrepreneurship Club" floatingLabelText="Calendar Name" onChange={self.handleChange.bind(self, 'name')} value={self.state.name} />
                    <TextField fullWidth={true} id='calendarDescription' hintText="bm14noo@calendar.google.com" floatingLabelText="Calendar Id" onChange={self.handleChange.bind(self, 'calendarId')} value={self.state.calendarId} />
                <RaisedButton fullWidth={true} label="Create Calendar" secondary={true} onClick={self.createScreen} />
                <div style={{marginBottom:"20px;"}} />
            </div>
        );
    }
});

module.exports = NewCalendarForm
import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';
// Parse.initialize('pp9waK9ticOFbhrJzrdITkRVQfCycHLqNPj2ZrN6', '8UXFi3hzHgbKWoMZIIX3ZgUg0tHKPzSK6w8Ul0M6');

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Snackbar from 'material-ui/lib/snackbar';



var SendFile = React.createClass({
    getInitialState: function() {
        return {
            email: '',
            autoHideDuration: 4000,
            message: 'Please send me the file so it can be displayed.',
            snackMessage : '',
            open: false
        };
    },
    handleChange: function(name, e) {
        var change = {};
        change[name] = e.target.value;
        this.setState(change);
    },
    sendEmail: function() {
        var self = this;

        Parse.Cloud.run('sendFileLink', { 
            email: self.state.email,
            id: Parse.User.current().id,
            name: Parse.User.current().get('username'),
            senderEmail : Parse.User.current().get('email'),
            message: self.state.message
        })
        .then(function(result) {
          // ratings should be 4.5
          console.log(result);
          self.setState({snackMessage:result,open:true,message:"Please send me the file so it can be displayed.",email:""});
        });
        
    },
    handleTouchTap: function() {
        this.setState({
          open: true,
        });
      },

      handleActionTouchTap: function(){
        this.setState({
          open: false,
        });
        alert('Event removed from your calendar.');
      },

      handleChangeDuration: function() {
        const value = event.target.value;
        this.setState({
          autoHideDuration: value.length > 0 ? parseInt(value) : 0,
        });
      },

      handleRequestClose: function() {
        this.setState({
          open: false,
        });
      },
    render: function() {
        var self = this;

        return (
            <div id="newScreenForm" className='col-xs-12'>
                <div className="col-xs-12"><h2>Who would you like to request a file from?</h2></div>
                    <TextField fullWidth={true} id='email' hintText="target@nyu.edu" floatingLabelText="To Email Address" onChange={self.handleChange.bind(self, 'email')} value={self.state.email} /><br />
                    <TextField fullWidth={true} id='message' hintText="Please send the file for your event." floatingLabelText="Message" onChange={self.handleChange.bind(self, 'message')} value={self.state.message} /><br />
                <RaisedButton fullWidth={true} label="Send request" secondary={true} onClick={self.sendEmail} />
                <div style={{marginBottom:"20px"}} />
                <Snackbar
                  open={this.state.open}
                  message={this.state.snackMessage}
                  autoHideDuration={this.state.autoHideDuration}
                  onActionTouchTap={this.handleActionTouchTap}
                  onRequestClose={this.handleRequestClose}
                />
            </div>
        );
    }
});

module.exports = SendFile




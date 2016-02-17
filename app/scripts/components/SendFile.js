import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';
Parse.initialize('pp9waK9ticOFbhrJzrdITkRVQfCycHLqNPj2ZrN6', '8UXFi3hzHgbKWoMZIIX3ZgUg0tHKPzSK6w8Ul0M6');

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Snackbar from 'material-ui/lib/snackbar';



var SendFile = React.createClass({
    getInitialState: function() {
        return {
            email: '',
            autoHideDuration: 4000,
            message: '',
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
            name: Parse.User.current().name
        })


        .then(function(result) {
          // ratings should be 4.5
          console.log(result);
          self.setState({message:result,open:true});

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
        //console.log(Parse.User.current().name);
        return (
            <div id="newScreenForm" className='col-xs-12'>
                    <TextField fullWidth={true} id='email' hintText="target@nyu.edu" floatingLabelText="Email Address" onChange={self.handleChange.bind(self, 'email')} value={self.state.email} />
                <RaisedButton fullWidth={true} label="Send email" secondary={true} onClick={self.sendEmail} />
                <div style={{marginBottom:"20px;"}} />
                <Snackbar
                  open={this.state.open}
                  message={this.state.message}
                  autoHideDuration={this.state.autoHideDuration}
                  onActionTouchTap={this.handleActionTouchTap}
                  onRequestClose={this.handleRequestClose}
                />
            </div>
        );
    }
});

module.exports = SendFile




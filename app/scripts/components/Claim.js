import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';
Parse.initialize('pp9waK9ticOFbhrJzrdITkRVQfCycHLqNPj2ZrN6', '8UXFi3hzHgbKWoMZIIX3ZgUg0tHKPzSK6w8Ul0M6');

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Snackbar from 'material-ui/lib/snackbar';



var Claim = React.createClass({
    getInitialState: function() {
        return {
            code: '',
            autoHideDuration: 4000,
            message: 'Please send me the file so it can be displayed.',
            snackMessage : '',
            open: false,
            location: ''
        };
    },
    handleChange: function(name, e) {
        var change = {};
        change[name] = e.target.value;
        this.setState(change);
    },
    claimDisplay: function() {
        var self = this;
        console.log(self);


        Parse.Cloud.run('claimDisplay', { 
            code: self.state.code,
            user: Parse.User.current().id,
            location: self.state.location
        })
        .then(function(result) {
          // ratings should be 4.5
          console.log(result);
          self.setState({snackMessage:result,open:true,code:'',location:''});
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
                <div className="col-xs-12"><h2>Please enter the code you see on the screen.</h2></div>
                    <TextField fullWidth={true} id='code' hintText="132123" floatingLabelText="The code displayed on the screen" onChange={self.handleChange.bind(self, 'code')} value={self.state.code} /><br />
                    <TextField fullWidth={true} id='location' hintText="Entrance display" floatingLabelText="Where is this screen located" onChange={self.handleChange.bind(self, 'location')} value={self.state.location} /><br />
                <RaisedButton fullWidth={true} label="Claim" secondary={true} onClick={self.claimDisplay} />
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

module.exports = Claim




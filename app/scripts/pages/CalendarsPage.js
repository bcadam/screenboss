var React = require('react');
var Parse = require('parse');

// var ScreenDisplay = require('../components/ScreenDisplay.js');
var CalendarList = require('../components/CalendarList.js');
var NewCalendarForm = require('../components/NewCalendarForm.js');

import Dialog from 'material-ui/lib/dialog';
import Card from 'material-ui/lib/card/card';
// import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

var ScreenListPage = React.createClass({
    getInitialState:function() {
        return {
            open:false
        };
    },
    handleOpen: function(){
        this.setState({open: true});
      },

    handleClose: function() {
        this.setState({open: false});
    },
    componentWillMount: function(){

            var currentUser = Parse.User.current();

            if(!currentUser)
            {
                window.location.assign("#/app/login");
            }
              
        }, 
    render: function() {
        // Render the text of each comment as a list item
        var self = this;
        var actions = [
          <FlatButton
            label="Ok"
            secondary={true}
            keyboardFocused={true}
            onTouchTap={this.handleClose}
          />,
        ];

        return (
            <div className="col-xs-12">

                <div className="col-xs-12 col-sm-3">
                    <NewCalendarForm />
                    <FlatButton style={{marginBottom:'20px'}} fullWidth={true} label="How do I find the calendar id?" onTouchTap={this.handleOpen} />
                </div>

                <div className="col-xs-12 col-sm-9">
                    <CalendarList />
                </div>
                <Dialog
                  title="How to add a calendar"
                  actions={actions}
                  modal={false}
                  open={this.state.open}
                  onRequestClose={this.handleClose}
                >

                <Card>
                    <CardHeader
                      title="Adding your own calendar"
                      actAsExpander={true}
                      showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                      <ul>
                        <li>Go to <a href="http://calendar.google.com">Google Calendar</a></li>
                        <li>Under 'My Calendars', click on the down arrow next to the calendar you want to show</li>
                        <li>Click 'Settings'</li>
                        <li>Under 'Calendar address' copy the calendar id (Calendar ID: <b>example@gmail.com</b>)</li>
                        <li>Click 'Share this calendar' and make the calendar public</li>
                      </ul>
                    </CardText>
                </Card><br />
                <Card>
                    <CardHeader
                      title="Adding a public calendar"
                      actAsExpander={true}
                      showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                      <ul>
                        <li>Go to <a href="http://calendar.google.com">Google Calendar</a></li>
                        <li>Under 'Other calendars', click on the down arrow next to the calendar you want to show</li>
                        <li>Click 'Settings'</li>
                        <li>Under 'Calendar address' copy the calendar id (Calendar ID: <b>example@gmail.com</b>)</li>
                      </ul>
                    </CardText>
                </Card>


                </Dialog>
            </div>
        );
    }
});

module.exports = ScreenListPage
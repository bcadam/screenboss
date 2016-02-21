window.React    = require("react");
var request  = require("superagent");
var moment = require('moment');

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

var CalEvent = React.createClass({
  _formatTime: function(time) {
    time = time.substring(0, time.length - 6);
    var parts = time.split(':');
    var hour = parts[0];
    var minutes = parts[1];
    if (hour > 12) {
      return time = (hour - 12) + ':' + minutes + 'PM';
    } else if (hour == 0) {
      return time = 12 + ':' + minutes + 'AM';
    } else if (hour == 12) {
      return time += 'PM';
    } else {
      return time += 'AM';
    }
  },
  _formatDate: function(date) {
    date = date.split("-");
    var eventYear = date.shift();
    date.push(eventYear);
    date = date.join("/");
    return date;
  },
  getInitialState() {
      return {
          open:false  
      };
  },
  handleOpen(){
    this.setState({open: true});
  },

  handleClose(){
    this.setState({open: false});
  },
  render: function () {
    var self = this;
    var event = this.props.event;
    var eventDateTime = this.props.event.start.dateTime;
    eventDateTime = eventDateTime.split("T");

    var startDate = new Date(event.start.dateTime);
    var endDate = new Date(event.end.dateTime);
    var startDate = moment(startDate);
    var endDate = moment(endDate);

    var endTimeShowing = endDate.format('h:mm a');
    if(startDate.format('YYYY MM') != endDate.format('YYYY MM')){
        console.log('not equal');
        endTimeShowing = endDate.format('Do MMM h:mm a');
    }

    var actions = [
      <FlatButton
        label="Close"
        secondary={true}
        onTouchTap={this.handleClose}
      />
    ];

    return(
            <div className="col-xs-12 col-sm-6 col-md-4 panel" style={{padding:'10px',height:'300px'}} onClick={self.handleOpen}>
                <div className="col-xs-4" style={{height:'100%',backgroundColor:'#139BA6',color:'white'}}>
                    <div><h1>{startDate.format('ddd')}</h1></div>
                    <div><h2>{startDate.format('Do')}</h2></div>
                    <div><h2>{startDate.format('MMM')}</h2></div>
                </div>
                <div className="col-xs-8">
                    <div>
                        <div><h3>{event.summary.replace('&amp;',' ')}</h3></div>
                        <div><h4>{startDate.format('h:mm a')} - {endTimeShowing}</h4></div>
                        <div><p style={{color:'#666666'}}>{event.location}</p></div>
                    </div>
                </div>
                <Dialog
                  title={event.summary.replace('&amp;',' ')}
                  actions={actions}
                  modal={false}
                  open={this.state.open}
                  onRequestClose={this.handleClose}
                >
                <div><p>{event.description}</p></div>
                <div><h4>{startDate.format('h:mm a')} - {endTimeShowing}</h4></div>
                <div><p style={{color:'#666666'}}>{event.location}</p></div>

                </Dialog>
            </div>
    );
}
});


var GoogleEvents = React.createClass({displayName: 'CalEvents',
  propTypes: {
    calendarID: React.PropTypes.string.isRequired,
    apiKey: React.PropTypes.string.isRequired
  },
  getDefaultProps:function() {
      return {
            calendarID: '6nqouecpjmhb7rpfm6ut5b917o3r1jrf@import.calendar.google.com',
            title: 'Entrepreneurship Events',
            apiKey : 'AIzaSyBFGI2BMiqzwoILPvt0bAmjd3_K8DHD02w'
      };
  },
  getInitialState: function() {
    return {
      events: []
    };
  },
  componentWillMount: function() {
    var self = this;
    var tempID = encodeURI(self.props.calendarID);
    var targetURL = 'https://www.googleapis.com/calendar/v3/calendars/' + tempID + '/events?fields=items(kind,etag,id,status,htmlLink,created,updated,summary,description,location,colorId,creator,organizer,start,end,endTimeUnspecified,recurrence,recurringEventId,originalStartTime,transparency,visibility,attendees,hangoutLink,gadget,anyoneCanAddSelf)&key=' + self.props.apiKey;
    
    $.get( targetURL, function( data ) {
        var holder = [];
        var currentDate = new Date();        
        data['items'].map(function(event){
            var eventDate = new Date(event.end.dateTime);
            if(eventDate > currentDate){
                holder.push(event);
            }
        });

        holder = holder.sort(function(a,b) {
            //console.log(a.end.dateTime);
            var dateA = new Date(a.end.dateTime);
            var dateB = new Date(b.end.dateTime);
            return dateA - dateB;
        });
        
        self.setState({events:holder});
    });

  },
  render: function() {
    var self = this;
    return(
        <div className='col-xs-12'>
        <h2 style={{padding:'10px',marginBottom:'10px'}}>{self.props.title}</h2>
        <div>
            <div>
                <div>
                    {self.state.events.map(function (event) {
          var today = new Date;
          today = today.toISOString();
          if(event.start.dateTime >  today) {
            return(
              <CalEvent className="events__item" key={event.id} event={event} />
            );
          }
        })}
                </div>
            </div>
        </div>
    </div>

        );
  }
});

module.exports = GoogleEvents;




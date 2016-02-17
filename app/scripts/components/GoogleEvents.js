window.React    = require("react");
var request  = require("superagent");
var moment = require('moment');


var CalEvent = React.createClass({

  displayName: 'CalEvent',

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

  componentDidMount:function() {
    

  },
  render: function () {
    var event = this.props.event;
    var eventDateTime = this.props.event.start.dateTime;
    eventDateTime = eventDateTime.split("T");
    // var eventTime = this._formatTime(eventDateTime[1]);
    // var eventDate = this._formatDate(eventDateTime[0]);

    var startDate = new Date(event.start.dateTime);
    var endDate = new Date(event.end.dateTime);
    var startDate = moment(startDate);
    var endDate = moment(endDate);

    // console.log('event.start.dateTime');
    // console.log(event.description);
    // console.log(event.summary);

    // console.log('event.end.dateTime');
    // console.log(event.end.dateTime);

    var endTimeShowing = endDate.format('h:mm a');
    if(startDate.format('YYYY MM') != endDate.format('YYYY MM')){
        console.log('not equal');
        endTimeShowing = endDate.format('Do MMM h:mm a');
    }
    //console.log(event);

    return(
            <tr>
                <td className="agenda-date">
                    <div className="dayofmonth">{startDate.format('DD')}</div>
                    <div className="dayofweek">{startDate.format('dddd')}</div>
                    <div className="shortdate text-muted">{startDate.format('MMMM')}</div>
                </td>
                <td className="agenda-time">
                    {startDate.format('h:mm a')} - {endTimeShowing}
                </td>
                <td className="agenda-events">
                    <div className="agenda-event">
                        {/*<i className="glyphicon glyphicon-repeat text-muted" title="Repeating event"></i> */}
                        <h3 style={{margin:'0px'}}>{event.summary.replace('&amp;',' ')}</h3>
                        <h5 style={{margin:'0px'}}>{/*event.htmlLink*/}</h5>
                        <div className="dayofmonth" style={{marginBottom:'10px'}}>{event.description}</div>
                        <div className="dayofmonth">{event.location}</div>
                    </div>
                </td>
            </tr>
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
    
    //console.log(targetURL);

    $.get( targetURL, function( data ) {

        var holder = [];
        var currentDate = new Date();
        // console.log(data);
        
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
        //console.log(data)
    });

  },

  render: function() {
    var self = this;
    //console.log('self.state.events');
    // console.log(self.state.events[0]);
    // console.log('done');


    return(
        <div className="agenda">
        <h2 style={{padding:'10px',marginBottom:'10px'}}>{self.props.title}</h2>
        <div className="table-responsive">
            <table className="table table-condensed table-bordered">
                <thead>
                    {/*<tr style={{border:'none !important'}}>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>Event</th>
                                        </tr>*/}
                </thead>
                <tbody>
                    {self.state.events.map(function (event) {
          var today = new Date;
          today = today.toISOString();
          if(event.start.dateTime >  today) {
            //console.log(event);

            return(
              <CalEvent className="events__item" key={event.id} event={event} />
            );
          }
        })}
                </tbody>
            </table>
        </div>
    </div>

        );
  }
});

module.exports = GoogleEvents;




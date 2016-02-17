import React from 'react';
import Parse from 'parse';


var Events = React.createClass({
    getInitialState() {
        return {
              events: null
        };
    },
    getDefaultProps() {
        return {
            url : "http://events.nyu.edu/live/json/events/group/entrepreneurial-institute/tag/elab"
            // url : "http://events.nyu.edu/live/json/events/tag/entrepreneurship"
        };
    },
    componentDidMount() {
      var self = this;
      //self.setState({events:'cat'});
      $.ajax({
        url: self.props.url,
        jsonp: "callback",
        dataType: "jsonp",
        data: {
          format: "json"
        },
        success: function(response) {
            console.log(response);
            self.setState({events:response});
        },
        error: function(error) {
          $scope.events = null;
          alert(error);
        }
      });

    },
    render() {
        // Render the text of each comment as a list item
        var self = this;
        var width = window.innerWidth * .95;
        var height = window.innerHeight * .85;

        //var calendarTarget = "bm14nbipk3hg813ili2emr21oo%40group.calendar.google.com";
        //var calendarTarget = "https://calendar.google.com/calendar/embed?showTitle=0&amp;showNav=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;height=800&amp;wkst=2&amp;bgcolor=%23FFFFFF&amp;src=bm14nbipk3hg813ili2emr21oo%40group.calendar.google.com&amp;color=%2329527A&amp";
        
        //var targetURL = (<iframe src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showNav=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;wkst=2&amp;bgcolor=%23FFFFFF&amp;src=bm14nbipk3hg813ili2emr21oo%40group.calendar.google.com&amp;color=%2329527A&amp" style={{borderWidth:"0px",width:width,height:height}} frameBorder="0" scrolling="no"></iframe>);
        
        var livewhale = [];

        if(self.state.events){
            var currentDate = new Date();
            //console.log(currentDate);


            for (var i = 0; i < self.state.events.length; i++) {

                var date = new Date(self.state.events[i].date_utc);
                var endDate = new Date(self.state.events[i].date2_utc);

                //console.log(date);

                var eventMonth = date.getMonth();
                var eventDay = date.getDate();
                //console.log(eventMonth);

                var past = 'visible';
                var currentStyle = {};
                if(date < currentDate && endDate > currentDate)
                {
                    currentStyle = 'hidden';
                }

                switch(eventMonth) {
                    case 0:
                        // console.log(eventMonth);
                        // console.log(date);
                        eventMonth = "Jan";
                        break;
                    case 1:
                        eventMonth = "Feb";
                        break;
                    case 2:
                        eventMonth = "Mar";
                        break;
                    case 3:
                        eventMonth = "Apr";
                        break;
                    case 4:
                        eventMonth = "May";
                        break;
                    case 5:
                        eventMonth = "Jun";
                        break;
                    case 6:
                        eventMonth = "Jul";
                        break;
                    case 7:
                        eventMonth = "Aug";
                        break;
                    case 8:
                        eventMonth = "Sep";
                        break;
                    case 9:
                        eventMonth = "Oct";
                        break;
                    case 10:
                        eventMonth = "Nov";
                        break;
                    case 11:
                        eventMonth = "Dec";
                        break;
                    default:
                        eventMonth = "cat";
                        break;
                }

                var eventSingle = (
                    <div className='col-xs-4' key={self.state.events[i].id}>
                        <div className='col-xs-6'>
                            <p>{eventMonth} {eventDay}</p>
                        </div>
                        <div className='col-xs-6'>
                            <p>{self.state.events[i].date_time.replace(/<[^>]+>/gm, '').replace(/&#160;/g, " ").replace(/&amp;/g, "&")}</p>
                        </div>
                        <div className='col-xs-12'>
                            <h3>{self.state.events[i].title.replace(/<[^>]+>/gm, '').replace(/&#160;/g, " ").replace(/&amp;/g, "&")}</h3>
                            <p>{self.state.events[i].description.replace(/<[^>]+>/gm, '').replace(/&#160;/g, " ").replace(/&amp;/g, "&")}</p>
                            {/*<img src={self.state.events[i].thumbnail} />*/}
                        </div>
                    </div>);

                if(i%3 == 0){
                    livewhale.push(eventSingle);
                }
                else{
                    livewhale.push(eventSingle);
                }

            }
        }
        //livewhale = (<div>{livewhale}</div>);


        return (
            
            <div className="container">
                   
                {livewhale}
                           
            </div>


        );
    }
});


// var EventsTest = React.createClass({
//     render(){
//         return(<Events url ="http://events.nyu.edu/live/json/events/group/entrepreneurial-institute/tag/entrepreneur" />);
//     }
// });

module.exports = Events

var Parse = require('parse');
var React = require('react');
var ParseReact = require('parse-react');
Parse.initialize('pp9waK9ticOFbhrJzrdITkRVQfCycHLqNPj2ZrN6', '8UXFi3hzHgbKWoMZIIX3ZgUg0tHKPzSK6w8Ul0M6');

var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var GoogleEvents = require('./GoogleEvents.js');

var ScreenDisplayAnimator = React.createClass({
    mixins: [ParseReact.Mixin],
    observe: function() {
        var key = this.props.scheduleId;
        var owner = this.props.user;
        var todaysDate = new Date(); 
        //console.log(todaysDate);

        return {
            screens: (new Parse.Query('AssignmentPattern')
                .equalTo('published',true))
                .include('screenAsset')
                .include('screen')
                .lessThan('startDate',todaysDate)
                .greaterThan('endDate',todaysDate)
                .equalTo('screen', new Parse.Object('Screen', {id: key}))
                .descending('createdAt'),
            calendars: (new Parse.Query('Calendar')
                .equalTo('owner',owner)
                .equalTo('published',true))
                .descending('createdAt')
        };
    },
    componentDidMount:function() {
        var self = this;
        var key = this.props.scheduleId;

        var AssignmentPattern = Parse.Object.extend("AssignmentPattern");
        var query = new Parse.Query(AssignmentPattern);
        var existingLengthOfAssignmentPatters;
        var todaysDate = new Date(); 

        query.equalTo('published',true);
        query.equalTo('screen', new Parse.Object('Screen', {id: key}));
        query.lessThan('startDate',todaysDate);
        query.greaterThan('endDate',todaysDate);

        $(document).ready(function() {
            setTimeout(function(){ 
                $('.item').first().addClass('active');
                $('.carousel').carousel({
                    interval: 15000,
                    cycle:true
                });


                setInterval(function(){
                //console.log(self.data.screens);
                existingLengthOfAssignmentPatters = self.data.screens.length;
                query.find({
                  success: function(results) {

                    //console.log(results);
                    if(results.length != existingLengthOfAssignmentPatters){
                        window.location.reload();
                    }
                  },
                  error: function(error) {
                    alert("Error: " + error.code + " " + error.message);
                  }
                });
            },1000);



            }, 1000);

            


        }); 

    },
    render: function() {
        var holder = this.props.imageClass;
        var self = this;

        return (
            <div id="carousel-example-generic" className="carousel slide" style={{height:"100%",width:"100%",cursor:'none'}}>
                
                <div className="carousel-inner" role="listbox">
                    

                    {this.data.screens.map(function(c) {
                        return (
                        <div key={c.objectId} className="product item">
                          <img src={c.screenAsset.file.url()} className="vcenter img img-responsive" style={holder.value}/>
                        </div>
                        );
                    })}

                    {this.data.calendars.map(function(c) {
                        return (
                        <div key={c.objectId} className="product item">
                          <GoogleEvents title={c.name} calendarID={c.calendarId} />
                        </div>
                        );
                    })}
                </div>
            </div>
        );
    }
});

var ScreenDisplayPage = React.createClass({
    mixins: [LinkedStateMixin],

    returnSomething(something) {
        return something;
    },
    getInitialState() {
        return {
            user: Parse.User.current(),
            imageClass: {
                width: "100%",
                height: "auto",
                overflow: "hidden"
            }
        };
    },
    componentDidMount() {
          setInterval(function() {
                  window.location.reload();
                }, 30 * 60 * 1000);
    },
    render() {
        // var user = Parse.User.current();
        var self = this;
        var loggedIn = (<ScreenDisplayAnimator scheduleId={self.props.scheduleId} user={self.props.owner} imageClass={self.linkState('imageClass')} />);

        return (
            <div>{loggedIn}</div>
        );
    }
});



module.exports = ScreenDisplayPage




var Parse = require('parse');
var React = require('react');
var ParseReact = require('parse-react');
Parse.initialize('pp9waK9ticOFbhrJzrdITkRVQfCycHLqNPj2ZrN6', '8UXFi3hzHgbKWoMZIIX3ZgUg0tHKPzSK6w8Ul0M6');

var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var GoogleEvents = require('./GoogleEvents.js');

if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});


var ScreenDisplayAnimator = React.createClass({
    mixins: [ReactFireMixin,ParseReact.Mixin],
    updateScreen: function(screenShowing) {

        var screenShowing = ((screenShowing) ? screenShowing : 'http://placehold.it/320x180?text=Calendar');

        var scheduleId = this.props.scheduleId;
        //var ref = new Firebase("https://screenboss.firebaseio.com/displays");
        //this.bindAsArray(ref, "displays");
        //var name = 'cat';
        // console.log('this.state.displays');
        // console.log(this.state.displays);
        var displayRef = new Firebase("https://screenboss.firebaseio.com/livedisplays");
        var hopperRef = displayRef.child(scheduleId);
        hopperRef.update({
          "screen": screenShowing
        });
    },
    observe: function() {
        var key = this.props.scheduleId;
        var owner = this.props.user;
        var todaysDate = new Date(); 

        var weekday = new Array(7);
        weekday[0]=  "week.sunday";
        weekday[1] = "week.monday";
        weekday[2] = "week.tuesday";
        weekday[3] = "week.wednesday";
        weekday[4] = "week.thursday";
        weekday[5] = "week.friday";
        weekday[6] = "week.saturday";
        var n = weekday[todaysDate.getDay()];

        return {
            screens: (new Parse.Query('AssignmentPattern')
                .equalTo('published',true))
                .include('screenAsset')
                .include('screen')
                .lessThan('startDate',todaysDate)
                .greaterThan('endDate',todaysDate)
                .equalTo('screen', new Parse.Object('Screen', {id: key}))
                .equalTo(n,true)
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

        var weekday = new Array(7);
        weekday[0]=  "week.sunday";
        weekday[1] = "week.monday";
        weekday[2] = "week.tuesday";
        weekday[3] = "week.wednesday";
        weekday[4] = "week.thursday";
        weekday[5] = "week.friday";
        weekday[6] = "week.saturday";
        var n = weekday[todaysDate.getDay()];

        query.equalTo('published',true);
        query.include('screenAsset');
        query.include('screen');
        query.lessThan('startDate',todaysDate);
        query.greaterThan('endDate',todaysDate);
        query.equalTo('screen', new Parse.Object('Screen', {id: key}));
        query.equalTo(n,true);
        query.descending('createdAt');

        $(document).ready(function() {
            
            setTimeout(function(){ 
                $('.item').first().addClass('active');
                
                $('.carousel').carousel({
                    interval: 15000,
                    cycle:true,
                    pause: false
                });




               $('.carousel').on('slide.bs.carousel', function (e) {
                    var slideFrom = $(this).find('.active').index();
                    var slideTo = $(e.relatedTarget).attr('src');
                    console.log(slideFrom+' => '+slideTo);
                    self.updateScreen(slideTo);
                });

                existingLengthOfAssignmentPatters = self.data.screens.length;

                var subscriptionIds = [];

                for (var i = 0; i < self.data.screens.length; i++) {
                        subscriptionIds.push(self.data.screens[i].id.objectId);
                    }


                setInterval(function(){                
                    query.find({
                      success: function(results) {

                        var resultsId = [];

                        for (var i = 0; i < results.length; i++) {
                            resultsId.push(results[i].id);
                        }

                        //self.data.screens = results;

                        // console.log(resultsId);
                        // console.log(subscriptionIds);

                        if(!subscriptionIds.equals(resultsId)){
                            console.log("Something changed");
                            window.location.reload();
                            // self.data.screens = results;
                            // self.setState({counter : self.state.counter + 1});
                        }
                      },
                      error: function(error) {
                        alert("Error: " + error.code + " " + error.message);
                      }
                    });
                },5000);



            }, 1000);

            


        }); 

    },
    render: function() {
        var holder = this.props.imageClass;
        var self = this;
        //console.log(self.props.scheduleId);

        return (
            <div id="carousel-example-generic" className="carousel slide" style={{height:"100%",width:"100%",cursor:'none'}}>
                
                <div className="carousel-inner" role="listbox">
                    

                    {this.data.screens.map(function(c) {
                        return (
                          <img key={c.objectId} src={c.screenAsset.file.url()} className="product item vcenter img img-responsive" style={holder.value}/>
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




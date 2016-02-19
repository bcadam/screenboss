var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var Parse = require('parse');
var ParseReact = require('parse-react');
Parse.initialize('pp9waK9ticOFbhrJzrdITkRVQfCycHLqNPj2ZrN6', '8UXFi3hzHgbKWoMZIIX3ZgUg0tHKPzSK6w8Ul0M6');

var key = window.location.href;
var count = key.indexOf('display/');
key = key.substring(count + 8, key.length);
//console.log(key);

var Screen = require('./Screen.js');


var Display = React.createClass({
    componentDidMount() {
        var self = this;


        var Display = Parse.Object.extend("Display");
        var query = new Parse.Query(Display);
        query.ascending('createdAt');
        query.equalTo("key",key);
        query.include('owner');
        query.include('schedule');
        query.limit(1);
        query.find({
          success: function(results) {
            //console.log("query run");
            //console.log(results.length);Display

            self.setState({results:results});

            if(results.length == 0){
                ParseReact.Mutation.Create('Display', {
                  key: key
                }).dispatch().then(function(object){
                    console.log(object);
                    window.location.reload();
                });
            }
            else if(results.length == 1){
                //console.log(results[0]);

                if(!results[0].get('owner'))
                {
                    var id = results[0].id;
                    //console.log(results[0]);
                    //setTimeout(function(){ location.reload(); }, 7000);
                    
                    window.setInterval(function(){                    
                    results[0].fetch({
                          success: function(myObject) {
                            // The object was refreshed successfully.
                            console.log('Checking for update...');
                            if(myObject.get('owner'))
                            {
                                window.location.reload();
                            }
                          },
                          error: function(myObject, error) {
                            // The object was not refreshed successfully.
                            // error is a Parse.Error with an error code and message.
                                window.location.reload();
                          }
                        });
                    }, 1000);

                }
                else if(results[0].get('owner') && !results[0].get('schedule'))
                {
                    var location = results[0].get('location');

                    window.setInterval(function(){                    
                    results[0].fetch({
                          success: function(myObject) {
                            // The object was refreshed successfully.
                            console.log('Checking for schedule assignment...');
                            if(myObject.get('schedule'))
                            {
                                window.location.reload();
                            }
                          },
                          error: function(myObject, error) {
                            // The object was not refreshed successfully.
                            // error is a Parse.Error with an error code and message.
                                console.log(error);
                                window.location.reload();
                          }
                        });
                    }, 1000);

                }
                else if(results[0].get('owner') && results[0].get('schedule'))
                {
                    var scheduleId = results[0].get('schedule').id;
                    var owner = results[0].get('owner').id;
                    //fconsole.log(scheduleId);

                    window.setInterval(function(){                    
                    results[0].fetch({
                          success: function(myObject) {
                            // The object was refreshed successfully.
                            console.log('Checking for schedule change...');
                            if(myObject.get('schedule').id != scheduleId)
                            {
                                window.location.reload();
                            }
                          },
                          error: function(myObject, error) {
                            // The object was not refreshed successfully.
                            // error is a Parse.Error with an error code and message.
                                window.location.reload();
                          }
                        });
                    }, 1000);

                }

            }

          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
        });






    },
    getInitialState() {
        return {
            user: Parse.User.current(),
            message : null,
            results: null
        };
    },
    componentWillMount() {
          
        // var self = this;
        //     ParseReact.Mutation.Create('Display', {
        //       key: key
        //     }).dispatch();

    },
    render() {
        // var user = Parse.User.current();     
        var self = this;
        //var message = (<div></div>);
        //console.log(self.data.displays[0]);
        //var messageNotClaimed;
        //console.log(self.state.results);

        var screen;
        if(self.state.results){
        if(self.state.results.length == 1){
                //console.log(results[0]);

                if(!self.state.results[0].get('owner'))
                {
                    var id = self.state.results[0].id;
                    screen = <div style={{cursor:'none !important',margin:'0px',padding:'0px',background:'-webkit-radial-gradient(#494949, black)',background:'-o-radial-gradient(#494949, black)',background:'-moz-radial-gradient(#494949, black)',background:'radial-gradient(#494949, black)',color:'white',width:'100%',height:'100vh !important',position:'absolute',top:'0px',left:'0px'}}><h1 style={{position:'absolute',top:'30%',left:'28%'}}>Claim this screen with code: {id}</h1></div>;
                }
                else if(self.state.results[0].get('owner') && !self.state.results[0].get('schedule'))
                {
                    var location = self.state.results[0].get('location');
                    screen = <div style={{cursor:'none !important',margin:'0px',padding:'0px',background:'-webkit-radial-gradient(#494949, black)',background:'-o-radial-gradient(#494949, black)',background:'-moz-radial-gradient(#494949, black)',background:'radial-gradient(#494949, black)',color:'white',width:'100%',height:'100vh !important',position:'absolute',top:'0px',left:'0px'}}><h1 style={{position:'absolute',top:'35%',left:'38%',textAlign:'center'}}><p>Set the schedule for</p><p>{location}</p></h1></div>;
                }
                else if(self.state.results[0].get('owner') && self.state.results[0].get('schedule'))
                {
                    var scheduleId = self.state.results[0].get('schedule').id;
                    var owner = self.state.results[0].get('owner').id;
                    screen = <Screen scheduleId={scheduleId} owner={owner} />;
                }

            }
        }


        return (<div>{screen}</div>);
    }
});



module.exports = Display




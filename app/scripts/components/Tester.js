var React = require('react');
var Parse = require('parse');
var ParseReact = require('parse-react');


Parse.initialize("pp9waK9ticOFbhrJzrdITkRVQfCycHLqNPj2ZrN6");
Parse.serverURL = 'http://screenboss.co/parse';

// Parse.initialize('<MY_APP_ID>', '<MY_JS_KEY>');
// Parse.serverURL = 'https://<MY_HEROKU_APP_NAME>.herokuapp.com/Parse'
var TestObject = Parse.Object.extend("TestObject");
var testObject = new TestObject();
testObject.save({foo: "bar"}).then(function(object) {
alert("yay! it worked");
});




var key = window.location.href;
var count = key.indexOf('display/');
key = key.substring(count + 8, key.length);

var Screen = require('./Screen.js');

var Display = React.createClass({
    componentDidMount() {
        var self = this;

        //////////////////////////////////////////////////
        //////////////////////////////////////////////////
        //////////////////////////////////////////////////
        //////////////////////////////////////////////////
        //////////////////////////////////////////////////
        //////////////////////////////////////////////////
        var timeBetweenChecks = 1000;
        //////////////////////////////////////////////////
        //////////////////////////////////////////////////
        //////////////////////////////////////////////////
        //////////////////////////////////////////////////
        //////////////////////////////////////////////////
        //////////////////////////////////////////////////

        var Display = Parse.Object.extend("Display");
        var query = new Parse.Query(Display);
        query.ascending('createdAt');
        query.equalTo("key",key);
        query.include('owner');
        query.include('schedule');
        query.limit(1);
        query.find({
          success: function(results) {

            self.setState({results:results});

            if(results.length == 0){

                var number = Math.floor((Math.random() * 10000000));
                ParseReact.Mutation.Create('Display', {
                  key: key,
                  randomNumber : number
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
                    }, timeBetweenChecks);

                }
                else if(results[0].get('owner') && !results[0].get('schedule'))
                {
                    var location = results[0].get('location');

                    window.setInterval(function(){                    
                    results[0].fetch({
                          success: function(myObject) {
                            // The object was refreshed successfully.
                            console.log('Checking for schedule assignment...');
                            if(!myObject.get('owner'))
                            {
                                window.location.reload();
                            }

                            if(myObject.get('schedule'))
                            {
                                window.location.reload();
                            }
                          },
                          error: function(myObject, error) {
                                console.log(error);
                                window.location.reload();
                          }
                        });
                    }, timeBetweenChecks * 10);

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

                            if(myObject.get('owner') == null)
                            {
                                window.location.reload();
                            }

                            if(!myObject.get('schedule')){
                                window.location.reload();
                            }
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
                    }, timeBetweenChecks * 5);

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
    render() {
        // var user = Parse.User.current();     
        var self = this;
        var screen;
        if(self.state.results){
        if(self.state.results.length == 1){
                //console.log(results[0]);

                if(!self.state.results[0].get('owner'))
                {
                    var id = self.state.results[0].get('randomNumber');
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
                    var owner = self.state.results[0].get('owner');
                    screen = <Screen scheduleId={scheduleId} owner={owner} />;
                }

            }
        }


        return (<div>{screen}</div>);
    }
});



module.exports = Display




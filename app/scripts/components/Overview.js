var Parse = require('parse');
var React = require('react');
var ParseReact = require('parse-react');
Parse.initialize('pp9waK9ticOFbhrJzrdITkRVQfCycHLqNPj2ZrN6', '8UXFi3hzHgbKWoMZIIX3ZgUg0tHKPzSK6w8Ul0M6');


var Overview = React.createClass({
    mixins: [ReactFireMixin],
    componentWillMount() {
        var ref = new Firebase("https://screenboss.firebaseio.com/livedisplays");
        this.bindAsArray(ref, "livedisplays");
        //var name = 'cat';
        // console.log('this.state.displays');
        // console.log(this.state.displays);
        // var displayRef = new Firebase("https://screenboss.firebaseio.com/livedisplays");
        // var hopperRef = displayRef.child(scheduleId);
        // hopperRef.update({
        //   "screen": screenShowing
        // });

    },
    render: function() {
       

        return (
            <div id="carousel-example-generic" className="carousel slide" style={{height:"100%",width:"100%",cursor:'none'}}>
                
                <div className="carousel-inner" role="listbox">
                    

                    {this.state.livedisplays.map(function(c) {
                        console.log(c['.key']);
                        return (
                            <div key={c['.key']} className="col-xs-2" >
                                <div className="col-xs-12"><h2>{c['.key']}</h2></div>
                                <img className="col-xs-12 img img-responsive" src={c.screen}  />
                            </div>
                        );
                    })}

                </div>
            </div>
        );
    }
});





module.exports = Overview




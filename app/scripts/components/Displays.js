import React from 'react';
import Parse from 'parse';
var ParseReact = require('parse-react');
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

var IndividualDisplay = require('./IndividualDisplay.js');


var Displays = React.createClass({
    mixins: [ParseReact.Mixin],
    observe: function() {
        // Subscribe to all Comment objects, ordered by creation date
        // The results will be available at this.data.comments
        var user = Parse.User.current();
        return {
            comments: new Parse.Query('Display').include('schedule').equalTo('owner',Parse.User.current()).descending('createdAt')
        };
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

        //<th>Published</th>
        return (
            
            <div className="col-xs-12">
                    {this.data.comments.map(function(c) {


                        return (
                        <IndividualDisplay display={c} key={c} />
                        );
                    

                    })}
            </div>
        );
    }
});

module.exports = Displays
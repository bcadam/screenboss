var React = require('react');
var Parse = require('parse');
var ParseReact = require('parse-react');

var ScreenDisplay = require('../components/ScreenDisplay.js');
var NewScreenForm = require('../components/NewScreenForm.js');



var ScreenListPage = React.createClass({
    mixins: [ParseReact.Mixin],
    observe: function() {

        return {
            comments: (new Parse.Query('Screen')).descending('createdAt')
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
        return (
            <div className="col-xs-12">

                <div className="col-xs-3">
                    <NewScreenForm />
                </div>

                <div className="col-xs-12">
                    {this.data.comments.map(function(c) {
                    return (
                        <div key={c.objectId}>
                    <ScreenDisplay asset={c} />
                    <br />
                    </div>
                    );
                    })}
                </div>

            </div>
        );
    }
});

module.exports = ScreenListPage
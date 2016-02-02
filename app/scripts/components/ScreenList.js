var React = require('react');
var Parse = require('parse');
var ParseReact = require('parse-react');

var ScreenDisplay = require('./ScreenDisplay.js');
var NewScreenForm = require('./NewScreenForm.js');

var ScreenList = React.createClass({
    mixins: [ParseReact.Mixin],
    observe: function() {
        var owner = Parse.User.current();

        return {
            comments: new Parse.Query('Screen').descending('createdAt')
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
                    {this.data.comments.map(function(c) {
                        //console.log(c.createdAt);
                        if (c.objectId)
                        {

                            return (
                                <ScreenDisplay key={c.createdAt} asset={c} />
                            );

                        }
                        else {
                            return (
                                <div key={c.createdAt}></div>
                            );

                        }
                        

                    })}
                </div>
        );
    }
});

module.exports = ScreenList
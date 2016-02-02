var React = require('react');
var Parse = require('parse');

var ScreenDisplay = require('../components/ScreenDisplay.js');
var ScreenList = require('../components/ScreenList.js');
var NewScreenForm = require('../components/NewScreenForm.js');



var ScreenListPage = React.createClass({
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

                <div className="col-xs-12 col-sm-3">
                    <NewScreenForm />
                </div>

                <div className="col-xs-12 col-sm-9">
                    <ScreenList />
                </div>

            </div>
        );
    }
});

module.exports = ScreenListPage
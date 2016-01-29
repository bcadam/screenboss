var React = require('react');
var Parse = require('parse');
var ParseReact = require('parse-react');

var ScreenDisplay = require('./ScreenDisplay.js');



var ScreenList = React.createClass({
    mixins: [ParseReact.Mixin],
    observe: function() {
        // Subscribe to all Comment objects, ordered by creation date
        // The results will be available at this.data.comments
        return {
            comments: (new Parse.Query('Screen')).descending('createdAt')
        };
    },
    render: function() {
        // Render the text of each comment as a list item
        var self = this;
        return (
            <div className="col-xs-12">
            <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="false">
                {this.data.comments.map(function(c) {
                return (
                <ScreenDisplay key={c.id} asset={c} />
                );
                })}
            </div>
            </div>
        );
    }
});

module.exports = ScreenList
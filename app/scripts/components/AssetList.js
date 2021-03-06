import React from 'react';
import Parse from 'parse';
var ParseReact = require('parse-react');

var IndividualAsset = require('./IndividualAsset.js');

var AssetList = React.createClass({
    mixins: [ParseReact.Mixin],
    observe: function() {
        // Subscribe to all Comment objects, ordered by creation date
        // The results will be available at this.data.comments
        var user = Parse.User.current();
        return {
            comments: (new Parse.Query('ScreenAsset').equalTo('owner',Parse.User.current())).descending('createdAt')
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
                    <IndividualAsset key={c.objectId + c.createdAt} asset={c} secondColumn={c.name}/>
                    );
                })}
            </div>
        );
    }
});

module.exports = AssetList
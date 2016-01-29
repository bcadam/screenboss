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
            comments: (new Parse.Query('ScreenAsset')).descending('createdAt')
        };
    },
    componentWillMount: function(){

              var currentUser = Parse.User.current();

              if(!currentUser)
              {
                window.location.assign("#/login");
              }
              
          }, 
    render: function() {
        // Render the text of each comment as a list item
        var self = this;

        //<th>Published</th>
        return (
            
            <div className="row">
                    {this.data.comments.map(function(c) {
                    return (
                    <IndividualAsset key={c.id} asset={c} secondColumn={c.name}/>
                    );
                    })}
                
            </div>
        );
    }
});

module.exports = AssetList
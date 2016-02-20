import React from 'react';
var Parse = require('parse');
var ParseReact = require('parse-react');

var AssetWithToggle = require('./AssetWithToggle.js');

var ScreenAssetList = React.createClass({
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
            <div className="table-responsive">
                <table className="table table-condensed">
                <thead>
                    <tr>
                        <th>File Name</th>
                        <th>Image</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.data.comments.map(function(c) {
                    return (
                    <AssetWithToggle key={c.id} asset={c} secondColumn={c.name} />
                    );
                    })}
                </tbody>
                </table>
            </div>
        );
    }
});

module.exports = ScreenAssetList
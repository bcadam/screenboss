import React from 'react';
import Parse from 'parse';
var ParseReact = require('parse-react');

var AssetList = require('./AssetList.js');
var Dropzone = require('./Dropzone.js');


var AssetListPage = React.createClass({
    render: function() {
        // Render the text of each comment as a list item
        var self = this;

        //<th>Published</th>
        return (
            
            <div className="row">
                <Dropzone />
                <AssetList />                
            </div>
        );
    }
});

module.exports = AssetListPage
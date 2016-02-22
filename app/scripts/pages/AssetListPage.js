import React from 'react';
import Parse from 'parse';
var ParseReact = require('parse-react');

var AssetList = require('../components/AssetList.js');
var Dropzone = require('../components/Dropzone.js');
var PickFile = require('../components/PickFile.js')





var AssetListPage = React.createClass({
    render: function() {
        // Render the text of each comment as a list item
        var self = this;
        //<th>Published</th>
        return (
            <div className="row">            
                <PickFile />
                <AssetList />                
            </div>
        );
    }
});

module.exports = AssetListPage
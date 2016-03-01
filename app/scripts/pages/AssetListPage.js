import React from 'react';
// import Parse from 'parse';
// var ParseReact = require('parse-react');

var AssetList = require('../components/AssetList.js');
var PickFile = require('../components/PickFile.js')
// var Dropzone = require('../components/Dropzone.js');


var AssetListPage = React.createClass({
    render: function() {

        var self = this;
        
        return (
            <div className="row">            
                <PickFile />
                <AssetList />                
            </div>
        );
    }
});

module.exports = AssetListPage
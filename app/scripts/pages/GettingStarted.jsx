import React from 'react';
import Parse from 'parse';
var ParseReact = require('parse-react');

var Dropzone = require('../components/Dropzone.js');
var AssetList = require('../components/AssetList.js');
var SiteDemoSimple = require('../components/SiteDemoSimple.js');
var NewScreenForm = require('../components/NewScreenForm.js');
var ScreenList = require('../components/ScreenList.js');


var GettingStarted = React.createClass({
    startTour: function(){
        window.location.assign("#/app/gettingstartedassets");
    },
    render: function() {
        // Render the text of each comment as a list item
        var self = this;

        //<th>Published</th>
        return (
            
            <div>
                <div style={{marginBottom:'20px'}}>
                    <SiteDemoSimple />
                    <div className="btn btn-success btn-lg col-xs-12" onClick={self.startTour}>Let's take the tour...</div>
                </div>
            </div>
        );
    }
});

module.exports = GettingStarted
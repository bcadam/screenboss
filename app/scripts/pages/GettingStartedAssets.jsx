import React from 'react';
import Parse from 'parse';
var ParseReact = require('parse-react');

var Dropzone = require('../components/Dropzone.js');
var AssetList = require('../components/AssetList.js');
var SiteDemoSimple = require('../components/SiteDemoSimple.js');
var NewScreenForm = require('../components/NewScreenForm.js');
var ScreenList = require('../components/ScreenList.js');


var GettingStartedAssets = React.createClass({
    componentDidMount: function(){
        introJs().setOption('doneLabel', 'Next page').start().oncomplete(function() {
          window.location.href = '/#/app/gettingstartedscreens';
        });
    },
    render: function() {
        // Render the text of each comment as a list item
        var self = this;

        //<th>Published</th>
        return (
            
            <div>
                <div data-step="1" data-intro="Add images to your library here. Make sure that they are big enough for your screen.">
                    <Dropzone />
                </div>
                <div data-step="2" data-intro="Your images can be re-used across screens.">
                    <AssetList />
                </div>
            </div>
        );
    }
});

module.exports = GettingStartedAssets
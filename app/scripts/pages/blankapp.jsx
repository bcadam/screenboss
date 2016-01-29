import React from 'react';
var Header = require('../components/Header.js');
var LeftSideBar = require('../components/LeftSideBar.js');


var BlankApp = React.createClass({
   
        render() {
            // const version = packageJSON.version;

            
            //console.log(this.props.children);
            return (
                <div>
                 
                                {this.props.children}

                </div>
            )
        }
});

module.exports = BlankApp
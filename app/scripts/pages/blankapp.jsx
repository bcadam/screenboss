import React from 'react';

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
import React from 'react';
import Parse from 'parse';
var ParseReact = require('parse-react');

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';

var AddSchedule = require('./AddSchedule');

var IndividualDisplay = React.createClass({
    render: function() {
        // Render the text of each comment as a list item
        var self = this;
        var c = self.props.display;

        var name = '';

        if(c.schedule){
            name = c.schedule.name
        }
        //<th>Published</th>
        return (

            <AppBar
                title={c.location + "... set to: " + name}
                showMenuIconButton={false}
                iconElementRight={
                  <div><IconMenu
                    iconButtonElement={
                      <AddSchedule asset={self.props.display} />
                    }
                  >
                  </IconMenu>
                  <a target="_blank" href={"/#/display/" + c.key} style={{color:'white'}}>Link to live screen</a></div>
                }
              />

        );
    }
});

module.exports = IndividualDisplay
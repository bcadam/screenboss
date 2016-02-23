import React from 'react';
import Parse from 'parse';
var ParseReact = require('parse-react');

import Card from 'material-ui/lib/card/card';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';

var AddSchedule = require('./AddSchedule');

var IndividualDisplay = React.createClass({
    getInitialState: function(){
      return {
        open:false,
        deleteOpen:false
      }
    },
    handleOpen: function(){
      this.setState({open: true});
    },
    deleteOpen: function(){
      this.setState({deleteOpen: true});
    },
    deleteClose: function(){
      this.setState({deleteOpen: false});
    },
    handleClose: function(){
      this.setState({open: false});
    },
    deleteDisplaySchedule: function(){
      var self = this;
      console.log(self.props.display);
      ParseReact.Mutation.Set(self.props.display.id,{schedule:null}).dispatch().then(function(){
          self.setState({open: false});
      });
    },
    deleteDisplay: function(){

      var self = this;
      console.log(self.props.display.objectId);
      // ParseReact.Mutation.Set(self.props.display.id,{schedule:null}).dispatch().then(function(){
      //     self.setState({open: false});
      // });

      var Display = Parse.Object.extend("Display");
      var query = new Parse.Query(Display);
      
      query.get(self.props.display.objectId, {
        success: function(display) {
          // The object was retrieved successfully.
          display.set('owner',null);
          display.save(null, {
            success: function(gameScore) {
              // Execute any logic that should take place after the object is saved.
              //alert('New object created with objectId: ' + gameScore.id);
              console.log("removed owner");
              window.location.reload();
              self.setState({deleteOpen: false});
            },
            error: function(gameScore, error) {
              // Execute any logic that should take place if the save fails.
              // error is a Parse.Error with an error code and message.
              //alert('Failed to create new object, with error code: ' + error.message);
            }
          });

        },
        error: function(object, error) {
          // The object was not retrieved successfully.
          // error is a Parse.Error with an error code and message.
          console.log("could not find object");
        }
      });


      // ParseReact.Mutation.Set(self.props.display.id,{owner:null}).dispatch().then(function(){
      //     self.setState({deleteOpen: false});
      // });
    },
    render: function() {
        // Render the text of each comment as a list item
        var self = this;
        var c = self.props.display;

        var name = 'Not set';

        if(c.schedule){
            name = c.schedule.name
        }

        var actionsDeleteScreen = [
        <FlatButton
          style={{marginRight:'10px'}}
          label="Cancel"
          secondary={true}
          onTouchTap={this.handleClose}
        />,
        <FlatButton
          label="Delete"
          primary={true}
          keyboardFocused={true}
          onTouchTap={this.deleteDisplaySchedule}
        />,
      ];

        var actionsDeleteDisplay = [
        <FlatButton
          style={{marginRight:'10px'}}
          label="Cancel"
          secondary={true}
          onTouchTap={this.deleteClose}
        />,
        <FlatButton
          label="Delete"
          primary={true}
          keyboardFocused={true}
          onTouchTap={this.deleteDisplay}
        />,
      ];



        if(self.props.display.schedule != null)
        {
          var button = <RaisedButton fullWidth={true} style={{maxWidth:'300px !important'}} label="Delete schedule" primary={true} onTouchTap={self.handleOpen} />;
        }
        //console.log(self.props.display);
        if(self.props.display.schedule  == null)
        {
          var button = <RaisedButton fullWidth={true} style={{maxWidth:'300px !important'}} label="Delete display" primary={true} onTouchTap={self.deleteOpen} />;
        }

        return (

            <Card style={{marginBottom:'20px'}}>
              <div className="col-xs-12">
                
                <div className="col-xs-6"><h3>{c.location}</h3></div>
                <div className="col-xs-6"><h3 style={{textAlign:'right'}}>Playlist: {name}</h3></div>
              
              </div>

              <div className="col-xs-12" style={{marginTop:'30px !important'}}>
                
                <div className="col-xs-12">
                  <h3><AddSchedule asset={self.props.display} /></h3>
                </div>

                <div className="col-xs-12 col-md-6 col-md-4" style={{marginBottom:'15px',marginTop:'40px'}}>
                  {button}
                </div>
              </div>


              <Dialog
                    title="Delete Schedule"
                    actions={actionsDeleteScreen}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                  >
                    Are you sure you want to delete this schedule from this screen.
                  </Dialog>
              <Dialog
                    title="Delete Display"
                    actions={actionsDeleteDisplay}
                    modal={false}
                    open={this.state.deleteOpen}
                    onRequestClose={this.deleteClose}
                  >
                    Are you sure you want to delete this display from your account.
                  </Dialog>
            </Card>

        );
    }
});

module.exports = IndividualDisplay


// <Card>
//                 <div title={c.location + " set to: " + name}
//                 showMenuIconButton={false}
//                 style={{marginBottom:'20px'}}
//                 iconElementRight={
//                   <div><IconMenu
//                     className='col-xs-6'
//                     iconButtonElement={
//                       <AddSchedule asset={self.props.display} style={{minWidth:'400px'}} />
//                     }
//                   >
//                   </IconMenu>
//                   <a target="_blank" href={"/#/display/" + c.key} style={{color:'white'}}>Link to live screen</a></div>
//                 }>
//             </Card>
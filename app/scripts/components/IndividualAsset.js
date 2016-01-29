import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';


import React from 'react';
var Parse = require('parse');
var ParseReact = require('parse-react');

var IndividualAsset = React.createClass({
    delete: function() {
        ParseReact.Mutation.Destroy(this.props.asset.id).dispatch();
    },
    getInitialState: function(){
        return{
            deleteOpen : false
        };
    },
    handleChange: function(){
        var self = this;
        this.setState({deleteOpen: !self.state.deleteOpen});
    },
    render: function() {
        var self = this;
        var tabPosition = {height:'200px !important',widht:'200px !important',borderTop:"solid",borderBottom:"solid",borderRight:"solid",borderColor:"grey",borderRadius:"10px",borderRadius:"10px",borderTopLeftRadius:"0px",borderBottomLeftRadius:"0px", padding:'10px !important',position:'absolute',top:"100px !important",left: '400px !important', backgroundColor:'white'};
        const actions = [
          <FlatButton
            label="Cancel"
            secondary={true}
            onTouchTap={this.handleChange} />,
          <FlatButton
            label="Submit"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.delete} />,
        ];

        return (
                <div className="image-container col-xs-6 col-md-3" style={{marginBottom:'10px'}}>
                    <img src={self.props.asset.file.url()} className="col-xs-12 img img-responsive"/>
                    <div onClick={self.handleChange} className="after"><i className="fa fa-trash fa-5x" style={{marginTop:'5%'}}></i></div>
                    <Dialog
                      title='Delete Asset?'
                      actions={actions}
                      modal={false}
                      open={self.state.deleteOpen}
                      onRequestClose={this.handleClose}>
                      Are you sure you would like to delete your asset? This cannot be undone.
                    </Dialog>
                </div>
            );
        }
});


module.exports = IndividualAsset
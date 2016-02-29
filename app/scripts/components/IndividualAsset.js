import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

import React from 'react';
var Parse = require('parse');
var ParseReact = require('parse-react');

// var Document = require('pdfjs');

var IndividualAsset = React.createClass({
    delete: function() {
        ParseReact.Mutation.Destroy(this.props.asset.id).dispatch().then(function(){},function(error){
            console.log(error);
        });

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
                    <img src={self.props.asset.fileThumbnail.url()} className="col-xs-12 img img-responsive" />
                    <div onClick={self.handleChange} className="after" style={{width:'100%',height:'100%'}}><i className="fa fa-trash fa-4x" style={{marginLeft:'40%',marginTop:'8%'}}></i></div>
                    <Dialog
                      title='Delete Asset?'
                      actions={actions}
                      modal={false}
                      open={self.state.deleteOpen}
                      onRequestClose={this.handleClose}>
                      Are you sure you would like to delete your asset? <b>This will delete it from all playlists.</b> This cannot be undone.
                    </Dialog>
                </div>
            );
        }
});


module.exports = IndividualAsset
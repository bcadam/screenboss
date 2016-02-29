import React from 'react';
import Parse from 'parse';
var ParseReact = require('parse-react');
import Snackbar from 'material-ui/lib/snackbar';
import TextField from 'material-ui/lib/text-field';
import CircularProgress from 'material-ui/lib/circular-progress';


var PickFile = React.createClass({
    componentWillMount: function() {
        (function(a){if(window.filepicker){return}var b=a.createElement("script");b.type="text/javascript";b.async=!0;b.src=("https:"===a.location.protocol?"https:":"http:")+"//api.filepicker.io/v2/filepicker.js";var c=a.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c);var d={};d._queue=[];var e="pick,pickMultiple,pickAndStore,read,write,writeUrl,export,convert,store,storeUrl,remove,stat,setKey,constructWidget,makeDropPane".split(",");var f=function(a,b){return function(){b.push([a,arguments])}};for(var g=0;g<e.length;g++){d[e[g]]=f(e[g],d._queue)}window.filepicker=d})(document);
    },
    handleChange: function(name, e) {
        var self = this;

        var change = {};
        change[name] = e.target.value;
        this.setState(change);

        if(!self.state.title && !self.state.description && !self.state.location && !self.state.date && !self.state.time){
          $('#fileButton').removeClass('disabled');
        }
    },
    handleRequestClose: function(){
      this.setState({
        open: false,
      });
    },
    getInitialState() {
        return {
            title: '',
            description: '',
            location:'',
            date:'',
            time:'',
            open: false,
            message:''
        };
    },
    filer: function(){
        var self = this;
        var userId = self.props.userId;

        if (! self.props.userId)
        {
          userId = Parse.User.current().id;
        }
        else{
          userId = self.props.userId;
        }
        //console.log(userId);

        filepicker.setKey("AYddgLB7cRj2z4JI1xXGzz");

        filepicker.pickAndStore(
          {
            openTo: 'COMPUTER',
            mimetypes: ['image/*'],
            multiple: false,
            services: ['COMPUTER','GOOGLE_DRIVE','GMAIL','IMAGE_SEARCH','CONVERT','IMGUR','FACEBOOK','URL'],
            cropDim: [1920, 1080],
            conversions: ['crop', 'rotate', 'filter'],
            mimetypes: ['image/*','application/pdf']
          },
          {
          },
          function(Blobs){

            self.setState({message:"File uploading.",open:true});
            console.log(Blobs);

            Parse.Cloud.run('saveBlob', { blob: Blobs , user: userId }).then(function(response) {
              console.log(response);
              self.setState({message:"File saved",open:true});
              setTimeout(function(){ window.location.reload(); }, 200);
            });

          },
          function(error){
          },
          function(progress){
            console.log(JSON.stringify(progress));
          }
        );

    },
    render: function() {
        // Render the text of each comment as a list item
        var self = this;

        //console.log(self.props.userId);
        var display;

        if(!this.state.open){
          display = <div id='fileButton' className="btn btn-success col-xs-12" onClick={self.filer} style={{marginBottom:'20px'}}>Upload new file</div>;
        }
        else{
          display = <div className="center-block col-md-offset-6 col-xs-offset-3 col-sm-offset-3"><CircularProgress className="center-block"/></div>;
        }
        return (
          <div>
            <Snackbar
              open={self.state.open}
              message={self.state.message}
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />
            <div className='col-xs-12'>
              {display}
            </div>
          </div>
            );
    }
        
});


module.exports = PickFile
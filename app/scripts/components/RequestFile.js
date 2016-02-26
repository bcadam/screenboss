import React from 'react';
import Parse from 'parse';
var ParseReact = require('parse-react');

import TextField from 'material-ui/lib/text-field';

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
    getInitialState() {
        return {
            title: '',
            description: '',
            location:'',
            date:'',
            time:''
        };
    },
    filer: function(){
        var self = this;
        var userId = self.props.userId;

        console.log(self.props.params.id);

        if (!self.props.params.id)
        {
            userId = Parse.User.current().id;
        }
        else{
          userId = self.props.params.id;
        }
        //console.log(userId);

        filepicker.setKey("AYddgLB7cRj2z4JI1xXGzz");

        filepicker.pickAndStore(
          {
            openTo: 'COMPUTER',
            multiple: false,
            services: ['COMPUTER','GOOGLE_DRIVE','GMAIL','IMAGE_SEARCH','CONVERT','IMGUR','FACEBOOK','URL'],
            cropDim: [1920, 1080],
            conversions: ['crop', 'rotate', 'filter']
          },
          {},
          function(Blobs){
            Parse.Cloud.run('saveBlob', { blob: Blobs , user: userId }).then(function(response) {
              console.log(response);
            });

            Parse.Cloud.run('alertUser', {
              id: self.props.params.id,
              title: self.state.title,
              description: self.state.description,
              location: self.state.location,
              date: self.state.date,
              time: self.state.time
            }).then(function(result) {
              // ratings should be 4.5
              console.log(result);
              setTimeout(function(){ window.location.reload(); }, 750);
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
        //console.log(self.props.params.id);
        return (
          <div>
            <div className='col-xs-12 col-md-6'>
              <div>
                <TextField fullWidth={true} id='eventTitle' floatingLabelText="Event or File Title" onChange={self.handleChange.bind(self, 'title')} value={self.state.title} />
              </div>
              <div>
                <TextField fullWidth={true} id='description' floatingLabelText="Description" onChange={self.handleChange.bind(self, 'description')} value={self.state.description} />
              </div>
              <div>
                <TextField fullWidth={true} id='location' floatingLabelText="Location" onChange={self.handleChange.bind(self, 'location')} value={self.state.location} />
              </div>
              <div>
                <TextField fullWidth={true} id='date' floatingLabelText="Date" onChange={self.handleChange.bind(self, 'date')} value={self.state.date} />
              </div>
              <div>
                <TextField fullWidth={true} id='time' floatingLabelText="Start and stop time" onChange={self.handleChange.bind(self, 'time')} value={self.state.time} />
              </div>
            </div>
            <div className='col-xs-12 col-md-6'>
              <div id='fileButton' className="btn btn-success col-xs-12 disabled" onClick={self.filer} style={{marginBottom:'20px'}}>Upload new file</div>
            </div>
            <div className='col-xs-12 col-md-6'>
              <div><h3>Please include any information relevant to your file.</h3></div>
            </div>
          </div>
            );
    }
        
});


module.exports = PickFile
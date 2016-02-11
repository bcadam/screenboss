import React from 'react';
import Parse from 'parse';
var ParseReact = require('parse-react');


var PickFile = React.createClass({
    componentWillMount: function() {
        (function(a){if(window.filepicker){return}var b=a.createElement("script");b.type="text/javascript";b.async=!0;b.src=("https:"===a.location.protocol?"https:":"http:")+"//api.filepicker.io/v2/filepicker.js";var c=a.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c);var d={};d._queue=[];var e="pick,pickMultiple,pickAndStore,read,write,writeUrl,export,convert,store,storeUrl,remove,stat,setKey,constructWidget,makeDropPane".split(",");var f=function(a,b){return function(){b.push([a,arguments])}};for(var g=0;g<e.length;g++){d[e[g]]=f(e[g],d._queue)}window.filepicker=d})(document);
    },
    filer: function(){
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
            Parse.Cloud.run('saveBlob', { blob: Blobs , user:Parse.User.current().id }).then(function(response) {
              console.log(response);
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

        return (
            <div className="btn btn-success col-xs-12" onClick={self.filer} style={{marginBottom:'20px'}}>Upload new file</div>
            );
    }
        
});


module.exports = PickFile
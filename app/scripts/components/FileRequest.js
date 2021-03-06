// var browserify = require("babelify");
// var babelify = require("babelify");
// browserify().transform(babelify, {presets: ["es2015", "react"]});

var React = require('react');
var Parse = require('parse');
var ParseReact = require('parse-react');
// Parse.initialize('pp9waK9ticOFbhrJzrdITkRVQfCycHLqNPj2ZrN6', '8UXFi3hzHgbKWoMZIIX3ZgUg0tHKPzSK6w8Ul0M6');
var PickFile = require('../components/PickFile.js')


import DropzoneStarter from 'react-dropzone';
import CircularProgress from 'material-ui/lib/circular-progress';
import Snackbar from 'material-ui/lib/snackbar';

var FileRequest = React.createClass({
    onDrop: function(files) {
        
        var self = this;
        self.setState({loading:true});

        var custom_acl = new Parse.ACL();
        custom_acl.setWriteAccess(self.state.userTarget, true);
        custom_acl.setReadAccess(self.state.userTarget, true);
        custom_acl.setPublicReadAccess(true);

        for (var i = 0; i < files.length; i++) {

            var myTargetFile = files[i];

            if (myTargetFile) {
                var fileName = myTargetFile.name;
                var parseFile = new Parse.File(fileName, myTargetFile);
                
                parseFile.save().then(function() {
                  // The file has been saved to Parse.
                  var variables = {
                        'file': parseFile,
                        'name': fileName,
                        'owner': self.state.userTarget,
                        'published': true,
                        'ACL' : custom_acl
                    };
                    
                    var newScreen = ParseReact.Mutation.Create('ScreenAsset', variables).dispatch();
                    self.setState({loading:false,open:true});

                }, function(error) {
                  // The file either could not be read, or could not be saved to Parse.
                  console.log(error);
                  self.setState({loading:false,open:true});
                });


            }
        };

    },
    closeSnack: function(){
        this.setState({open: !this.state.open});
    },
    getInitialState:function(){
        return{
            userTarget:null,
            loading: false,
            open:false
        };
    },
    render: function() {
       var display;
        if (this.state.loading)
        {
            display = <CircularProgress mode="indeterminate" size={2}/>
        }
        else {
            display = (<DropzoneStarter className='col-xs-12' style={{borderStyle:'dashed',minHeight:120}} onDrop={this.onDrop}>
              <h2>Add a new file by dropping it here, or click here to select one to upload.<br/ ><br/ >Please keep it less than 2mb and an image.</h2>
            </DropzoneStarter>);
        }

        //console.log(this.props.routeParams.id);
        var self = this;
        return (
            <div className='col-xs-12' style={{marginBottom:"20px"}}>
            {/**display**/}
            <Snackbar
          open={this.state.open}
          message="The file has been sent..."
          autoHideDuration={4000}
          onRequestClose={this.closeSnack}
        />
        <br />
        <PickFile userId={self.props.routeParams.id} />
            </div>
        );
    }
});


module.exports = FileRequest

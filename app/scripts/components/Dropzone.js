var React = require('react');
var Parse = require('parse');
var ParseReact = require('parse-react');

import DropzoneStarter from 'react-dropzone';
import CircularProgress from 'material-ui/lib/circular-progress';


var Dropzone = React.createClass({
    onDrop: function(files) {
        var self = this;
        self.setState({loading:true});

        var custom_acl = new Parse.ACL();
        custom_acl.setWriteAccess(Parse.User.current(), true);
        custom_acl.setReadAccess(Parse.User.current(), true);
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
                        'owner': Parse.User.current(),
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
    getInitialState:function(){
        return{
            loading:false
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
              <h2>Add a new file by dropping it here, or click here to select one to upload. Please keep it less than 2mb and an image.</h2>
            </DropzoneStarter>);
        }
        return (
            <div className='col-xs-12' style={{marginBottom:"20px"}}>
            {display}
            </div>
        );
    }
});

module.exports = Dropzone;
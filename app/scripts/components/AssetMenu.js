import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';


var Dropzone = require('./Dropzone.js');
var ScreenAssetList = require('./ScreenAssetList.js');


var AssetMenu = React.createClass({
    getInitialState: function(){
        return{
            open:false
        };
    },
    handleChange: function(){
        var stateHolder = this.state.open;
        this.setState({open:!stateHolder});
    },
    render: function() {
        var self = this;
        var tabPosition = {borderTop:"solid",borderBottom:"solid",borderRight:"solid",borderColor:"grey",borderRadius:"10px",borderRadius:"10px",borderTopLeftRadius:"0px",borderBottomLeftRadius:"0px", padding:'10px !important',position:'absolute',top:"100px !important",left: '400px !important', backgroundColor:'white', width:'auto', height:'auto'};

        return (
                <LeftNav width={400} openRight={false} open={self.state.open} style={{overflow:'visible'}}>
                <div style={tabPosition} onClick={self.handleChange} >
                    <i style={{position:'relative',color:'grey', display:'inline'}} className="fa fa-plus fa-3x"></i>
                    <i style={{marginLeft:'10px',position:'relative',color:'grey', display:'inline'}}  className="fa fa-file-image-o fa-3x"></i>
                </div>
                    <Dropzone />
                    <ScreenAssetList />
                </LeftNav>
            );
        }
});

module.exports = AssetMenu
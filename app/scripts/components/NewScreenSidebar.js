import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';

var NewScreenForm = require('./NewScreenForm.js');


var NewScreenSidebar = React.createClass({
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
        var tabPosition = {height:'200px !important',widht:'200px !important',borderTop:"solid",borderBottom:"solid",borderRight:"solid",borderColor:"grey",borderRadius:"10px",borderRadius:"10px",borderTopLeftRadius:"0px",borderBottomLeftRadius:"0px", padding:'10px !important',position:'absolute',top:"100px !important",left: '400px !important', backgroundColor:'white'};

        return (
                <LeftNav width={400} openRight={false} open={self.state.open} style={{overflow:'visible',borderRight:"solid",borderColor:"grey"}}>
                <div style={tabPosition} onClick={self.handleChange} >
                    <i style={{paddingLeft:'10px',position:'relative',color:'grey'}} className="fa fa-calendar-plus-o fa-3x"></i>
                </div> 

                <div style={{position:'relative', left:'15% !important'}}>
                    <NewScreenForm />
                </div>

                </LeftNav>
            );
        }
});

module.exports = NewScreenSidebar
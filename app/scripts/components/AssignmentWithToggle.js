var React = require('react');
var Parse = require('parse');
var ParseReact = require('parse-react');

import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import Toggle from 'material-ui/lib/toggle';
var LinkedStateMixin = require('react-addons-linked-state-mixin');


var WeekSelect = require('./WeekSelect.js');



var AssignmentWithToggle = React.createClass({
    mixins: [LinkedStateMixin],
    
    delete: function() {
        ParseReact.Mutation.Destroy(this.props.asset.id).dispatch();
    },
    getInitialState: function(){
        var self = this;
        //console.log(this.props.asset);
        return{
            deleteOpen : false,
            startDate: this.props.asset.startDate,
            endDate: this.props.asset.endDate,
            week: this.props.asset.week,
            viewerOpen:false,
            code: (    <DatePicker
                            autoOk={true}
                            hintText="Start"
                            mode="landscape"
                            onChange={self.handleStart} />)
        };
    },
    handleChange: function(){
        var self = this;
        this.setState({deleteOpen: !self.state.deleteOpen});
    },
    handleToggle: function(){
        var self = this;
        ParseReact.Mutation.Set(self.props.asset.id,{published: !self.props.asset.published}).dispatch();
    },
    handleStart:function(e,start){
        var self = this;
        //console.log(self.props.asset.objectId);
        //console.log(start);
        self.setState({startDate: start});
        ParseReact.Mutation.Set(self.props.asset.id, {startDate:start}).dispatch();
    },
    handleEnd:function(e,end){
        var self = this;
        //console.log(self.props.asset.objectId);
        //console.log(end);
        self.setState({startDate: end});
        ParseReact.Mutation.Set(self.props.asset.id, {endDate:end}).dispatch();    },
    handleCloseViewer: function(){
        var holder = this.state.viewerOpen;
        this.setState({viewerOpen : !holder});
    },
    resetStartDate:function(){
        this.setState({startDate:null});
        ParseReact.Mutation.Set(this.props.asset.id, {startDate:null}).dispatch();
        //console.log("startdate");
    },
    resetEndDate:function(){
        this.setState({endDate:null});
        ParseReact.Mutation.Set(this.props.asset.id, {endDate:null}).dispatch();
        //console.log("enddate");
    },
    render: function() {
        // Render the text of each comment as a list item
        var self = this;
        //console.log(self.props.asset);
        const actions = [
          <FlatButton
            label="Cancel"
            secondary={true}
            onTouchTap={self.handleChange} />,
          <FlatButton
            label="Confirm"
            primary={true}
            keyboardFocused={true}
            onTouchTap={self.delete} />,
        ];

        var startDate = self.props.asset.startDate;
        var endDate = self.props.asset.endDate;
        
        if (!startDate){
            startDate = (    <DatePicker
                            autoOk={true}
                            hintText="Start"
                            mode="landscape"
                            onChange={self.handleStart} />);
        }
        else {
            startDate = startDate.toString();
            startDate = <div onClick={self.resetStartDate}>{startDate}</div>;
        }
        if (!endDate){
            endDate = (    <DatePicker
                            autoOk={true}
                            hintText="End"
                            mode="landscape"
                            onChange={self.handleEnd}  />);
        }
        else {
            endDate = endDate.toString();
            endDate = <div onClick={self.resetEndDate}>{endDate}</div>;
        }

        // console.log('self');

        // console.log(this.state.week);
        // console.log(this.props.asset);

        return (
            <div className='row' style={{marginTop:'25px',marginBottom:'15px'}}>
                
                <div className='col-xs-12'><h4>{self.props.asset.screenAsset.name}</h4></div>
                <div className="col-xs-4">
                    <img style={{marginBottom:'10px'}} onClick={self.handleCloseViewer} src={self.props.asset.screenAsset.fileThumbnail.url()} className='img img-responsive'/>
                </div>
                <div className="col-xs-5">
                    <div className="col-xs-12" style={{marginBottom:'20px'}}>{startDate}<br />{endDate}</div>
                    <div className="col-xs-12"><WeekSelect week={self.linkState('week')} asset={self.props.asset} /></div>
                </div>
                <div className="col-xs-3">
                    <div className="col-xs-12" style={{marginBottom:'10px'}}><Toggle toggled={self.props.asset.published} onToggle={self.handleToggle} /></div>
                    <div className="col-xs-12"><FlatButton label="Delete" primary={true} onClick={self.handleChange} /></div>
                </div>
                

                <Dialog
                  modal={false}
                  open={self.state.viewerOpen}
                  onRequestClose={self.handleCloseViewer}>
                  <img src={self.props.asset.screenAsset.fileThumbnail.url()} style={{display: 'block',marginLeft: 'auto',marginRight:' auto'}} className='img img-responsive'/>
                </Dialog>
                <Dialog
                  title='Delete Asset?'
                  actions={actions}
                  modal={false}
                  open={self.state.deleteOpen}
                  onRequestClose={self.handleChange}>
                  Are you sure you would like to delete your assignment? This will not delete the file from your database. This cannot be undone.
                </Dialog>
            </div>

        );
    }
});

module.exports = AssignmentWithToggle
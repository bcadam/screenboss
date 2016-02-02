var React = require('react');
var Parse = require('parse');
var ParseReact = require('parse-react');

import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';


var AssignmentWithToggle = React.createClass({
    delete: function() {
        ParseReact.Mutation.Destroy(this.props.asset.id).dispatch();
    },
    getInitialState: function(){
        var self = this;
        return{
            deleteOpen : false,
            startDate: this.props.asset.startDate,
            endDate: this.props.asset.endDate,
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
            label="Submit"
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

        return (

            <TableRow>
                <TableRowColumn>{self.props.asset.screenAsset.name}</TableRowColumn>
                <TableRowColumn><img src={self.props.asset.screenAsset.fileThumbnail.url()} className='img img-responsive'/></TableRowColumn>
                <TableRowColumn>{startDate}<br />{endDate}</TableRowColumn>
                <TableRowColumn><FlatButton label="Delete" secondary={true} onClick={self.handleChange} /></TableRowColumn>
                <Dialog
                  title='Delete Asset?'
                  actions={actions}
                  modal={false}
                  open={self.state.deleteOpen}
                  onRequestClose={self.handleClose}>
                  Are you sure you would like to delete your assignment? This will not delete the file from your database. This cannot be undone.
                </Dialog>
                {/*<tr className="text-left col-xs-12">
                            <td style={{textTransform:'capitalize'}}>{self.props.asset.screenAsset.name}</td>
                            <td><img style={{maxHeight:'100px',maxWidth:'100px'}} className='img-responsive' src={self.props.asset.screenAsset.file.url()} /></td>
                            <td>{startDate}<br />{endDate}</td>
                            <td><FlatButton label="Delete" secondary={true} onClick={self.handleChange} /></td>
                            <Dialog
                              title='Delete Asset?'
                              actions={actions}
                              modal={false}
                              open={self.state.deleteOpen}
                              onRequestClose={self.handleClose}>
                              Are you sure you would like to delete your assignment? This will not delete the file from your database. This cannot be undone.
                            </Dialog>
                        </tr>*/}
            </TableRow>

        );
    }
});

module.exports = AssignmentWithToggle
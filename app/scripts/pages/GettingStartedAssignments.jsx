import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

var Dropzone = require('../components/Dropzone.js');
var AssetList = require('../components/AssetList.js');
var SiteDemoSimple = require('../components/SiteDemoSimple.js');
var ScreenList = require('../components/ScreenList.js');

import Dialog from 'material-ui/lib/dialog';

import FlatButton from 'material-ui/lib/flat-button';

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import DatePicker from 'material-ui/lib/date-picker/date-picker';

import Toggle from 'material-ui/lib/toggle';

var ScreenList = React.createClass({
    mixins: [ParseReact.Mixin],
    observe: function() {
        var owner = Parse.User.current();

        return {
            comments: new Parse.Query('Screen').descending('createdAt')
        };

    },
    componentWillMount: function(){
        var currentUser = Parse.User.current();
        if(!currentUser)
        {
            window.location.assign("#/app/login");
        }  
    }, 
    render: function() {
        // Render the text of each comment as a list item
        var self = this;
        return (
                <div className="col-xs-12">
                    {this.data.comments.map(function(c) {
                        //console.log(c.createdAt);
                        if (c.objectId)
                        {

                            return (
                                <ScreenDisplay key={c.createdAt} asset={c} />
                            );

                        }
                        else {
                            return (
                                <div key={c.createdAt}></div>
                            );

                        }
                        

                    })}
                </div>
        );
    }
});

var GettingStartedAssignment = React.createClass({
    componentDidMount: function(){
        
        // introJs().setOption('doneLabel', 'Next page').start().oncomplete(function() {
        //   window.location.href = '/#/app/gettingstartedassignments';
        // });

        console.log('MountedGettingStartedAssignment');
        setTimeout(function() {
                  

                  introJs().setOption('doneLabel', 'Next page').start().oncomplete(function() {
                      window.location.href = '/#/app/gettingstartedassignments';
                    });
                }, 2 * 1000);
        
    },
    render: function() {
        // Render the text of each comment as a list item
        var self = this;
        return (
            
            <div>
                <div>
                    <ScreenList />
                </div>
            </div>
        );
    }
});

var AddAssetDropDown = React.createClass({
    mixins: [ParseReact.Mixin],
    observe: function() {
        // Subscribe to all Comment objects, ordered by creation date
        // The results will be available at this.data.comments
        //var id = this.props.asset.objectId;
        return {
            comments: new Parse.Query('ScreenAsset').descending('createdAt')
        };
    },
    handleChange:function(e, index, value){
        //console.log(e);
        //console.log(index);
        //console.log(value);
        //console.log(this.props.asset.id);
        //console.log(this.data.comments[value]);
        this.setState({index:index});
    },
    getInitialState: function(){
        var self = this;
        return{
            index: 0,
            toBeAddedAsset: null
        };
    },
    addAsset: function(){
        //console.log(this);
        var self = this;
        var screen = this.props.asset.id;
        var owner = Parse.User.current();
        var screenAsset = this.data.comments[self.state.index];

        var custom_acl = new Parse.ACL();
        custom_acl.setWriteAccess(Parse.User.current(), true);
        custom_acl.setReadAccess(Parse.User.current(), true);
        custom_acl.setPublicReadAccess(true);

        var configs ={
            screen : screen,
            owner : owner,
            screenAsset : screenAsset,
            ACL : custom_acl,
            published:true
        };
        ParseReact.Mutation.Create('AssignmentPattern',configs).dispatch();

    },
    render: function() {
        var self = this;
        var i = -1
        var img = <div></div>;

        if (self.data.comments[self.state.index])
        {
            img = <img className='img-responsive' style={{maxHeight:"200px"}} src={self.data.comments[self.state.index].fileThumbnail.url()} />;
        }
        
        //console.log(self.data.comments[self.state.index]);
        return (
            <div className='col-xs-12 row'>
                
                <div className='col-xs-12 col-md-6 product'>
                    {img}
                </div>

                <div className='col-xs-12 col-md-6'>
                    <div className='col-xs-12'>
                        <DropDownMenu value={self.state.index} style={{width:"100%"}} onChange={this.handleChange}>
                                {this.data.comments.map(function(c) {
                                    i = i +1;
                                return (
                                <MenuItem key={c.id} value={i} primaryText={c.name} />
                                );
                                })}
                        </DropDownMenu>
                    </div>
                    <div className='col-xs-12' style={{marginTop:"20px"}} data-step="4" data-intro="Click to add a file to the schedule.">
                        <RaisedButton label="Add file" secondary={true} onClick={self.addAsset} />
                    </div>

                    <div className='col-xs-12' style={{marginTop:"20px"}} >
                        <a href={'/#/screen/' + self.props.asset.objectId} target="_blank"><h3>Screen URL</h3></a>
                    </div>
                </div>

            </div>          
            
        );
    }
});

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
                            onChange={self.handleStart} data-step="5" data-intro="Click to add a file to the schedule." />);
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
                <TableRowColumn><Toggle style={{margin:'40%'}} toggled={self.props.asset.published} onToggle={self.handleToggle} /></TableRowColumn>
                <TableRowColumn><FlatButton label="Delete" primary={true} onClick={self.handleChange} /></TableRowColumn>
                <Dialog
                  title='Delete Asset?'
                  actions={actions}
                  modal={false}
                  open={self.state.deleteOpen}
                  onRequestClose={self.handleClose}>
                  Are you sure you would like to delete your assignment? This will not delete the file from your database. This cannot be undone.
                </Dialog>
            </TableRow>

        );
    }
});

var ScreenDisplay = React.createClass({
    mixins: [ParseReact.Mixin],
    observe: function() {
        // Subscribe to all Comment objects, ordered by creation date
        // The results will be available at this.data.comments
        var id = this.props.asset.objectId;
        return {
            comments: new Parse.Query('AssignmentPattern').equalTo('screen', new Parse.Object('Screen', { id: id })).include('screenAsset').descending('createdAt')
        };
    },
    componentDidMount: function(){
        
        // introJs().setOption('doneLabel', 'Next page').start().oncomplete(function() {
        //   window.location.href = '/#/app/gettingstartedassignments';
        // });
        console.log('Mounted ScreenDisplay');
    },
    handleChangePublished: function() {
        ParseReact.Mutation.Set(this.props.asset.id, {
            'published': !this.props.asset.published
        }).dispatch();
    },
    delete: function() {
        ParseReact.Mutation.Destroy(this.props.asset.id).dispatch();
    },
    getInitialState: function(){
        return {
            deleteOpen: false
        };
    },
    handleChange: function(){
        var self = this;
        this.setState({deleteOpen: !self.state.deleteOpen});
    },
    render: function() {
        // Render the text of each comment as a list item
        var self = this;
        const actions = [
          <FlatButton
            label="Cancel"
            secondary={true}
            onTouchTap={this.handleChange} />,
          <FlatButton
            label="Confirm"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.delete} />,
        ];

        var publishedButton;
        var stringOfPublished;

        if (!self.props.asset.published){
            stringOfPublished = "Not published";
             publishedButton = (<RaisedButton primary={true} name="checkboxName2" value="checkboxValue2" label={stringOfPublished} defaultChecked={self.props.asset.published} onClick={self.handleChangePublished} />)
        }
        else {
            stringOfPublished = "Published";
            publishedButton = (<RaisedButton secondary={true} name="checkboxName2" value="checkboxValue2" label={stringOfPublished} defaultChecked={self.props.asset.published} onClick={self.handleChangePublished} />)
        }


        return (
            <div>
                <Card initiallyExpanded={true}>
                    <CardHeader
                      title={self.props.asset.name}
                      subtitle={self.props.asset.description}
                      actAsExpander={true}
                      showExpandableButton={true}

                    />
                    <CardText expandable={true}>
                        <AddAssetDropDown asset={self.props.asset} />

                        <Table selectable={false}>
                            <TableHeader adjustForCheckbox={false} >
                              <TableRow>
                                <TableHeaderColumn>File Name</TableHeaderColumn>
                                <TableHeaderColumn>Image</TableHeaderColumn>
                                <TableHeaderColumn>Date</TableHeaderColumn>
                                <TableHeaderColumn>Published</TableHeaderColumn>
                                <TableHeaderColumn>Delete</TableHeaderColumn>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {self.data.comments.map(function(c) {
                                    return (
                                    <AssignmentWithToggle key={c.id} asset={c} />
                                    );
                                    })}
                            </TableBody>
                        </Table>
                        </CardText>

                        <CardActions expandable={true}>
                            {publishedButton}
                            <FlatButton label="Delete Schedule" primary={true} onClick={self.handleChange} />
                        </CardActions>
                        <Dialog
                          title='Delete Asset?'
                          actions={actions}
                          modal={false}
                          open={self.state.deleteOpen}
                          onRequestClose={this.handleClose}>
                          Are you sure you would like to delete your schedule? This means that you will have to change the url of each of your screens. This cannot be undone.
                        </Dialog>
                    </Card>
                    <br />
                    </div>
        );
    }
});


module.exports = GettingStartedAssignment
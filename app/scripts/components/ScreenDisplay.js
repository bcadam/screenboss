var React = require('react');
var Parse = require('parse');
var ParseReact = require('parse-react');
var AddAssetDropDown = require('./AddAssetDropDown');
var AssignmentWithToggle = require('./AssignmentWithToggle');

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';


var ScreenDisplay = React.createClass({
    mixins: [ParseReact.Mixin],
    observe: function() {
        // Subscribe to all Comment objects, ordered by creation date
        // The results will be available at this.data.comments
        var id = this.props.asset.objectId;
        return {
            comments: new Parse.Query('AssignmentPattern').equalTo('screen', new Parse.Object('Screen', { id: id })).descending('createdAt')
        };
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
            label="Submit"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.delete} />,
        ];

        var publishedButton;
        var stringOfPublished;

        if (!self.props.asset.published){
            stringOfPublished = "Not published";
             publishedButton = (<RaisedButton className='col-xs-12 col-md-4' primary={true} fullWidth={true} name="checkboxName2" value="checkboxValue2" label={stringOfPublished} defaultChecked={self.props.asset.published} onClick={self.handleChangePublished} />)
        }
        else {
            stringOfPublished = "Published";
            publishedButton = (<RaisedButton className='col-xs-12 col-md-4' secondary={true} fullWidth={true} name="checkboxName2" value="checkboxValue2" label={stringOfPublished} defaultChecked={self.props.asset.published} onClick={self.handleChangePublished} />)
        }


        return (
            <div className="panel panel-default">
            <div className="panel panel-default">
                

                <Toolbar className="panel-heading" role="tab" id={"heading" + self.props.asset.name} data-toggle="collapse" data-parent="#accordion" href={"#" + self.props.asset.objectId} aria-expanded="false" aria-controls={self.props.asset.objectId}>
                    <ToolbarGroup firstChild={false} float="left">
                        <ToolbarTitle text={self.props.asset.name} />
                    </ToolbarGroup>
                    <ToolbarGroup float="right">
                        <ToolbarTitle text="Toggle" className="hidden-xs" />
                    </ToolbarGroup>
                </Toolbar>


                <div id={self.props.asset.objectId} className="panel-collapse collapse in" role="tabpanel" aria-labelledby={"heading" + self.props.asset.objectId}>
                  <div className="panel-body">
                  <AddAssetDropDown asset={self.props.asset} />
                
                <div className="table-responsive">
                <table className="table table-condensed">

                    <thead>
                        <tr>
                            <th>File</th>
                            <th>Image</th>
                            <th>Date</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.data.comments.map(function(c) {
                        return (
                        <AssignmentWithToggle key={c.id} asset={c} />
                        );
                        })}
                    </tbody>

                </table>
                </div>

                {publishedButton}
                <FlatButton className='col-xs-12' label="Delete Schedule" primary={true} onClick={self.handleChange} fullWidth={true} />

                <Dialog
                  title='Delete Asset?'
                  actions={actions}
                  modal={false}
                  open={self.state.deleteOpen}
                  onRequestClose={this.handleClose}>
                  Are you sure you would like to delete your schedule? This means that you will have to change the url of each of your screens. This cannot be undone.
                </Dialog>


                  </div>
                </div>
              </div>
            </div>
        );
    }
});

module.exports = ScreenDisplay
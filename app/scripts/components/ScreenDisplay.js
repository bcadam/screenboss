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
             publishedButton = (<RaisedButton primary={true} name="checkboxName2" value="checkboxValue2" label={stringOfPublished} defaultChecked={self.props.asset.published} onClick={self.handleChangePublished} />)
        }
        else {
            stringOfPublished = "Published";
            publishedButton = (<RaisedButton secondary={true} name="checkboxName2" value="checkboxValue2" label={stringOfPublished} defaultChecked={self.props.asset.published} onClick={self.handleChangePublished} />)
        }


        return (
                <Card>
                    <CardHeader
                      title={self.props.asset.name}
                      subtitle={self.props.asset.description}
                      actAsExpander={true}
                      showExpandableButton={true}

                    />
                    <CardText expandable={true}>
                        <AddAssetDropDown asset={self.props.asset} />

                        {/*<Table>
                                                    <TableHeader>
                                                      <TableRow>
                                                        <TableHeaderColumn>File Name</TableHeaderColumn>
                                                        <TableHeaderColumn>Image</TableHeaderColumn>
                                                        <TableHeaderColumn>Date</TableHeaderColumn>
                                                        <TableHeaderColumn>Delete</TableHeaderColumn>
                                                      </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                      {self.data.comments.map(function(c) {
                                                            return (
                                                            <TableRow>
                                                                <TableRowColumn>{c.screenAsset.name}</TableRowColumn>
                                                                <TableRowColumn><img src={c.screenAsset.file.url()} className='img img-responsive'/></TableRowColumn>
                                                                <TableRowColumn>Employed</TableRowColumn>
                                                                <TableRowColumn>Delete</TableRowColumn>
                                                            </TableRow>
                                                            );
                                                            })}
                                                    </TableBody>
                                                  </Table>*/}





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
                                    {self.data.comments.map(function(c) {
                                    return (
                                    <AssignmentWithToggle key={c.id} asset={c} />
                                    );
                                    })}
                                </tbody>
                            </table>
                            </div>
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
        );
    }
});

module.exports = ScreenDisplay
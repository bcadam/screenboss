var React = require('react');
var Parse = require('parse');
var ParseReact = require('parse-react');

var AddAssetDropDown = require('./AddAssetDropDown');
var AssignmentWithToggle = require('./AssignmentWithToggle');

import Dialog from 'material-ui/lib/dialog';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';

import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

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
            comments: new Parse.Query('AssignmentPattern').equalTo('screen', new Parse.Object('Screen', { id: id })).include('screenAsset').descending('createdAt')
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
    handleClose:function(){
      this.setState({});
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
        //console.log(Parse.User.current());
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

        //console.log(self);
        return (
            <div>
                <Card>
                    <AppBar
                        title={self.props.asset.name}
                        iconElementLeft={<IconButton><NavigationClose /></IconButton>}
                        actAsExpander={true}
                        showMenuIconButton={false}
                        style={{backgroundColor:'#0D83CC'}}
                        iconClassNameRight="muidocs-icon-navigation-expand-more"
                    />

                    <CardText expandable={true}>
                        
                        <AddAssetDropDown asset={self.props.asset} user={Parse.User.current()}/>
                        <div selectable={false}>
                            <div>
                              {self.data.comments.map(function(c) {
                                    return (
                                    <AssignmentWithToggle key={c.id} asset={c} />
                                    );
                                    })}
                            </div>
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
                      onRequestClose={this.handleChange}>
                      Are you sure you would like to delete your schedule? This means that you will have to change the url of each of your screens. This cannot be undone.
                    </Dialog>
                </Card>
                    <br />
            </div>
        );
    }
});

module.exports = ScreenDisplay
var React = require('react');
var Parse = require('parse');
var ParseReact = require('parse-react');

var AddAssetDropDown = require('./AddAssetDropDown');
var AssignmentWithToggle = require('./AssignmentWithToggle');

var GoogleEvents = require('./GoogleEvents');

import Dialog from 'material-ui/lib/dialog';

import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';

var CalendarDisplay = React.createClass({
    mixins: [ParseReact.Mixin],
    observe: function() {
        // Subscribe to all Comment objects, ordered by creation date
        // The results will be available at this.data.comments
        var id = this.props.asset.objectId;
        return {
            comments: new Parse.Query('Calendar').descending('createdAt')
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
                <Card>  
                      <CardHeader
                        title={self.props.asset.name}
                        subtitle={self.props.asset.calendarId}
                        actAsExpander={false}
                        showExpandableButton={false}
                        initiallyExpanded={true}
                        style={{margin:'5px'}}
                      />
                      <div style={{margin:'10px'}}>
                      {publishedButton}
                      <FlatButton label="Delete Calendar" primary={true} onClick={self.handleChange} />
                      </div>
                      {/* <GoogleEvents title={self.props.asset.name} calendarId={self.props.asset.calendarId} />
                      */}                      
                      <Dialog
                          title='Delete Asset?'
                          actions={actions}
                          modal={false}
                          open={self.state.deleteOpen}
                          onRequestClose={this.handleClose}>
                          Are you sure you would like to delete your calendar?
                      </Dialog>

                    </Card>
                    <br />
                    </div>
        );
    }
});

module.exports = CalendarDisplay


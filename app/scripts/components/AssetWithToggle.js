var React = require('react');
import Parse from 'parse';
var ParseReact = require('parse-react');

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';


var AssetWithToggle = React.createClass({
    handleChangePublished: function() {
        ParseReact.Mutation.Set(this.props.asset.id, {
            'published': !this.props.asset.published
        }).dispatch();
    },
    delete: function() {
        ParseReact.Mutation.Destroy(this.props.asset.id).dispatch();
    },
    getInitialState: function(){
        return{
            deleteOpen : false
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

        //<td><Checkbox name="checkboxName2" value="checkboxValue2" defaultChecked={self.props.asset.published} onClick={self.handleChangePublished} /></td>

        return (
            <tr className="text-left col-xs-12">
            <td>{self.props.secondColumn}</td>
            <td><img className='img-responsive' src={self.props.asset.file.url()}  style={{padding:'10px',maxHeight:'100px'}} /></td>
            <td><FlatButton label="Delete" primary={true} onClick={self.handleChange} /></td>
            <Dialog
              title='Delete Asset?'
              actions={actions}
              modal={false}
              open={self.state.deleteOpen}
              onRequestClose={this.handleClose}>
              Are you sure you would like to delete your asset? This cannot be undone.
            </Dialog>
            </tr>
        );
    }
});

module.exports = AssetWithToggle
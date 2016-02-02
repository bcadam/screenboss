var React = require('react');
var Parse = require('parse');
var ParseReact = require('parse-react');

import RaisedButton from 'material-ui/lib/raised-button';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';


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

        var configs ={
            screen : screen,
            owner : owner,
            screenAsset : screenAsset,
            ACL : custom_acl
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
                    <div className='col-xs-12' style={{marginTop:"20px"}}>
                        <RaisedButton label="Add file" secondary={true} onClick={self.addAsset} />
                    </div>

                    <div className='col-xs-12' style={{marginTop:"20px"}}>
                        <a href={'/#/screen/' + self.props.asset.objectId} target="_blank"><h3>Screen URL</h3></a>
                    </div>
                </div>

            </div>          
            
        );
    }
});

module.exports = AddAssetDropDown
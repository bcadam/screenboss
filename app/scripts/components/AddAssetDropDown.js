var React = require('react');
var Parse = require('parse');
var ParseReact = require('parse-react');

import RaisedButton from 'material-ui/lib/raised-button';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';


var AddAssetDropDown = React.createClass({
    mixins: [ParseReact.Mixin],
    observe: function() {
        return {
            comments: new Parse.Query('ScreenAsset').descending('createdAt')
        };
    },
    handleChange:function(e, index, value){
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
        return (
            <div className='col-xs-12 row'>
                
                <div className='col-xs-12 col-md-6 product'>
                    {img}
                </div>

                <div className='col-xs-12 col-md-6'>
                    <div className='col-xs-12'>
                        <DropDownMenu autoWidth={false} value={self.state.index} style={{width:"100%"}} onChange={this.handleChange}>
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
                </div>

            </div>          
            
        );
    }
});

module.exports = AddAssetDropDown
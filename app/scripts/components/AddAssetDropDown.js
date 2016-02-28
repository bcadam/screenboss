var React = require('react');
var Parse = require('parse');
var ParseReact = require('parse-react');

import RaisedButton from 'material-ui/lib/raised-button';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';


var AddAssetDropDown = React.createClass({
    mixins: [ParseReact.Mixin],
    observe: function() {
        var user = this.props.user;
        return {
            comments: new Parse.Query('ScreenAsset').equalTo('owner',user).descending('createdAt')
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

        var week = {"friday":true,"monday":true,"saturday":false,"sunday":false,"thursday":true,"tuesday":true,"wednesday":true};

        var configs ={
            screen : screen,
            owner : owner,
            screenAsset : screenAsset,
            startDate: new Date(),
            ACL : custom_acl,
            published:true,
            week: week
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

        var length = self.data.comments.length;
        var display;
        if(length == 0){
            display = <div><a href="/#/app/assets"><h2>Add files first</h2></a></div>;
        }else{
            display = (
                <div className='col-xs-12 col-md-6'>
                    <div className='col-xs-12'>
                        <DropDownMenu full={true} fullWidth={{true}} value={self.state.index} style={{width:"100%",marginLeft:'-50px',padding:'0px'}} onChange={this.handleChange}>
                                {this.data.comments.map(function(c) {
                                    i = i +1;
                                return (
                                <MenuItem key={c.id} style={{width:"100% !important"}} value={i} primaryText={c.name} fullWidth={{true}} />
                                );
                                })}
                        </DropDownMenu>
                    </div>
                    <div className='col-xs-12' style={{marginTop:"20px"}}>
                        <RaisedButton label="Add file" secondary={true} onClick={self.addAsset} />
                    </div>
                </div>);
        }

        return (
            <div className='col-xs-12 row'>
                
                <div className='col-xs-12 col-md-6 product'>
                    {img}
                </div>

                {display}

            </div>          
            
        );
    }
});

module.exports = AddAssetDropDown
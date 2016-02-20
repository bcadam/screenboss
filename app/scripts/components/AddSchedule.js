var React = require('react');
var Parse = require('parse');
var ParseReact = require('parse-react');

import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';


var AddSchedule = React.createClass({
    mixins: [ParseReact.Mixin],
    observe: function() {
        return {
            schedules: new Parse.Query('Screen').descending('createdAt')
        };
    },
    handleChange:function(e, index, value){

        this.setState({index:index});
        var self = this;
    
        var display = this.props.asset.id;
        var schedule = this.data.schedules[index].id;

        console.log(display);
        console.log(schedule);
  
        var configs ={
            schedule : schedule
        };

        ParseReact.Mutation.Set(display, configs).dispatch().then(function(){
            window.location.reload();
        });
    },
    getInitialState: function(){
        var self = this;
        return{
            index: 0,
            toBeAddedAsset: null
        };
    },
    addAsset: function(){
        var self = this;
        var display = this.props.asset.id;
        var schedule = this.data.schedules[self.state.index].id;

        console.log(display);
        console.log(schedule);
       
        var configs ={
            schedule : schedule
        };

        ParseReact.Mutation.Set(display, configs).dispatch().then(function(){
            window.location.reload();
        });

    },
    render: function() {
        var self = this;
        var i = -1

        return (
            <div>
                <DropDownMenu value={self.state.index} style={{width:"100%"}} onChange={this.handleChange}>
                    {this.data.schedules.map(function(c) {
                        i = i +1;
                        return (
                        <MenuItem key={c.id} value={i} primaryText={c.name} fullWidth={true} />
                        );
                    })}
                </DropDownMenu>
            </div>            
        );
    }
});

module.exports = AddSchedule




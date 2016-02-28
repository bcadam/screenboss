import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';

var LinkedStateMixin = require('react-addons-linked-state-mixin');

var Day = React.createClass({
    handleClick(){
        var holder = this.props.publish.value;
        holder[this.props.spell] = !holder[this.props.spell];
        this.props.publish.requestChange(holder);
    },
    render() {
        var self = this;
        var inline = {display:'inline'};
        var padding = {padding:'10px'};

        var spell = this.props.spell;
        var publish = this.props.publish;

        var dayClass = ((publish.value[ spell ]) ? {color:'white',display:'inline',backgroundColor:'#2196F3',padding:'15px'} : {display:'inline',backgroundColor:'#E3F2FD',padding:'15px'});

        var notClickable = {
            MozUserSelect: '-moz-none',
            KhtmlUserSelect: 'none',
            WebkitUserSelect: 'none',
            OUserSelect: 'none',
            userSelect: 'none',
            cursor:'pointer'
        };

        var dayClass = $.extend(dayClass, notClickable);

        return (
            <div style={dayClass} onClick={this.handleClick}>
                <b>{this.props.day}</b>
            </div>);
    }
});


var WeekSelect = React.createClass({
    mixins: [LinkedStateMixin],
    getInitialState: function(){
        return {
            week : this.props.week
        }
    },
    componentWillUpdate: function(nextProps,nextState){
        //console.log("this is happening");
        //console.log(nextState);
        //ParseReact.Mutation.Set(holder, nextState).dispatch().then(function(){return true;});
        //console.log(this.props.id);
         ParseReact.Mutation.Set({
                className: 'AssignmentPattern',
                objectId: 'LeMyH16cCA'
              }, nextState ).dispatch({waitForServer: true});

        return true;
    },
    render: function() {
        var self = this;
        var inline = {display:'inline'};
        var padding = {padding:'10px'};

        var notClickable = {
            MozUserSelect: '-moz-none',
            KhtmlUserSelect: 'none',
            WebkitUserSelect: 'none',
            OUserSelect: 'none',
            userSelect: 'none',
        };

        return (
            <div style={notClickable} >
                <Day day="Mo" spell="monday" style={notClickable} publish={self.state.week} />
                <Day day="Tu" spell="tuesday" style={notClickable} publish={self.state.week} />
                <Day day="We" spell="wednesday" style={notClickable} publish={self.state.week} />
                <Day day="Th" spell="thursday" style={notClickable} publish={self.state.week} />
                <Day day="Fr" spell="friday" style={notClickable} publish={self.state.week} />
                <Day day="Sa" spell="saturday" style={notClickable} publish={self.state.week} />
                <Day day="Su" spell="sunday" style={notClickable} publish={self.state.week} />
            </div>);
        }
});

var Tester = React.createClass({
    mixins: [LinkedStateMixin],
    getInitialState: function() {
        return {
            "week" : {
                "monday": true,
                "tuesday": true,
                "wednesday": true,
                "thursday": true,
                "friday": true,
                "saturday": true,
                "sunday": true
            }
        };
    },
    render: function() {
        var self = this;

        return (
            <div>
                <WeekSelect week={self.linkState('week')} id={'LeMyH16cCA'} />
            </div>);
        }
});

module.exports = Tester




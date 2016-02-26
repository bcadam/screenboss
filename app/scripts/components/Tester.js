var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');


var Day = React.createClass({
    handleClick(){
        var holder = !this.props.publish.value;
        this.props.publish.requestChange(holder);
    },
    render() {
        var self = this;
        var inline = {display:'inline'};
        var padding = {padding:'10px'};

        var dayClass = ((self.props.publish.value) ? {color:'white',display:'inline',backgroundColor:'#2196F3',padding:'15px'} : {display:'inline',backgroundColor:'#E3F2FD',padding:'15px'});

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
    getDefaultProps: function() {
        return {
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: true,
            sunday: true
        };
    },
    getInitialState: function(){
        console.log(this.props.week);
        return {
            monday: this.props.monday,
            tuesday: this.props.tuesday,
            wednesday: this.props.wednesday,
            thursday: this.props.thursday,
            friday: this.props.friday,
            saturday: this.props.saturday,
            sunday: this.props.sunday
        }
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

        //console.log(self.props.week);
        return (
            <div>
                <Day day="Mo" style={notClickable} publish={self.linkState('monday')} />
                <Day day="Tu" style={notClickable} publish={self.linkState('tuesday')} />
                <Day day="We" style={notClickable} publish={self.linkState('wednesday')} />
                <Day day="Th" style={notClickable} publish={self.linkState('thursday')} />
                <Day day="Fr" style={notClickable} publish={self.linkState('friday')} />
                <Day day="Sa" style={notClickable} publish={self.linkState('saturday')} />
                <Day day="Su" style={notClickable} publish={self.linkState('sunday')} />
            </div>);
        }
});

var Week = React.createClass({
    mixins: [LinkedStateMixin],
    getInitialState: function() {
        return {
            week : {
                monday: true,
                tuesday: true,
                wednesday: true,
                thursday: true,
                friday: true,
                saturday: true,
                sunday: true
            }  
        };
    },
    render: function() {
        var self = this;
        return (
            <div>
                <WeekSelect week={self.linkState('week')} />
            </div>);
        }
});

module.exports = Week




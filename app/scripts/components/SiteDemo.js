var React = require('react');
import RaisedButton from 'material-ui/lib/raised-button';


var SiteDemo = React.createClass({
    getInitialState: function(){
        return{
            tutorialOpen : true,
            wording: "Show tutorial"
        };
    },
    handleChange: function(){
        var self = this;
        // Parse.User.current().set('tutorialOpen', !self.state.tutorialOpen).save().then(function(){

        //     var otherWording;
        //     if (self.state.wording == 'Show tutorial')
        //     {
        //         otherWording = 'Hide tutorial';
        //     }
        //     else {
        //         otherWording = 'Show tutorial'
        //     }

        //     self.setState({
        //         tutorialOpen : ! self.state.tutorialOpen,
        //         wording : otherWording
        //     });
        // });


            var otherWording;
            if (self.state.wording == 'Show tutorial')
            {
                otherWording = 'Hide tutorial';
            }
            else {
                otherWording = 'Show tutorial'
            }

            self.setState({
                tutorialOpen : ! self.state.tutorialOpen,
                wording : otherWording
            });

    },
    render: function() {
        var self = this;
        var showClass;

        //console.log(self.state.tutorialOpen);

        if (self.state.tutorialOpen == true){
            showClass = "showingClass";
        }
        else {
            showClass = "hidden";
        }

        return (
            <section>
                <div className="big-gap" />
                    <div className="container">
                        <div className="box">
                            
                            <div className="row">
                            <RaisedButton className='col-xs-12 col-md-3' label={self.state.wording} fullWidth={true} primary={true} onClick={self.handleChange} data-toggle="collapse" data-target="#collapseExample" aria-expanded={self.handleChange} aria-controls="collapseExample"/>
                            </div>
                            
                            <div className="collapse row clearfix {showClass}" id="collapseExample">
                                <br />
                                <div className="row">
                                    <div className="col-md-4 col-sm-6">
                                        <div className="center">
                                            <i className="icon-md icon-color1 fa-3x fa-calendar"></i>
                                            <h4>Create a schedule</h4>
                                            <p>Create a pattern that can be re-used across mutliple screens. Files can be set to appear and expire based on their date.</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-sm-6">
                                        <div className="center">
                                            <i className="icon-md icon-color3 fa-3x fa-cloud-upload"></i>
                                            <h4>Add files to the schedule</h4>
                                            <p>Add any images you would like to be part of the schedule rotation.</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-sm-6">
                                        <div className="center">
                                            <i className="icon-md icon-color6 fa-3x fa-chrome"></i>
                                            <h4>Set the displays to the url provided</h4>
                                            <p>In a browser of your choosing, set each display to the url of the schedule you want it to be on. The content is automatically updated from your account.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <div style={{marginBottom:"-50px"}} />
                <div className={"big-gap-remove" + " " + showClass} />
            </section>
        );
    }
});

module.exports = SiteDemo
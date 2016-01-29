import React from 'react';

var SiteDemoSimple = React.createClass({
    render: function() {
        var self = this;
        var showClass;

        //console.log(self.state.tutorialOpen);

        

        return (
      
                                <div className="row">
                                    <div className="col-xs-12 col-xs-12 col-md-4 col-lg-4 col-xl-4">
                                        <div className="center">
                                            <i className="fa fa-3x fa-calendar"></i>
                                            <h4>Create a schedule</h4>
                                            <p>Create a pattern that can be re-used across mutliple screens. Files can be set to appear and expire based on their date.</p>
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-xs-12 col-md-4 col-lg-4 col-xl-4">
                                        <div className="center">
                                            <i className="fa fa-3x fa-file-image-o"></i>
                                            <h4>Add files to the schedule</h4>
                                            <p>Add any images you would like to be part of the scheduled rotation.</p>
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-xs-12 col-md-4 col-lg-4 col-xl-4">
                                        <div className="center">
                                            <i className="fa fa-3x fa-chrome"></i>
                                            <h4>Set the displays to the url provided</h4>
                                            <p>In a browser of your choosing, set each display to the url of the schedule you want it to be on. The content is automatically updated from your account.</p>
                                        </div>
                                    </div>
                                </div>
                       
        );
    }
});

module.exports = SiteDemoSimple
import React from 'react';

var SiteDemoSimple = React.createClass({
    render: function() {
        var self = this;
        var showClass;

        //console.log(self.state.tutorialOpen);

        var subHeaders = {color: '#777',
        fontWeight: '300',
        fontSize: '18px',
        marginTop: '10px',
        lineHeight: '1.1',
        marginBottom: '10px',
        fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
        display: 'block',
        WebkitMarginBefore: '1.33em',
        WebkitMarginAfter: '1.33em',
        WebkitMarginStart: '0px',
        WebkitMarginEnd: '0px',
        textAlign: 'center'};

        var subHeaderParagraph = {
        margin: '0 0 10px',
        boxSizing: 'border-box',
        color: '#999',
        fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
        fontSize: '14px',
        lineHeight: '1.428571429'
        };

        return (
      
                                <div className="row" style={subHeaders}>
                                    <div className="col-xs-12 col-xs-12 col-md-4 col-lg-4 col-xl-4">
                                        <div className="center">
                                            <i className="fa fa-3x fa-calendar"></i>
                                            <h4>Create a schedule</h4>
                                            <p style={subHeaderParagraph}>Create a pattern that can be re-used across mutliple screens. Files can be set to appear and expire based on their date.</p>
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-xs-12 col-md-4 col-lg-4 col-xl-4">
                                        <div className="center">
                                            <i className="fa fa-3x fa-file-image-o"></i>
                                            <h4>Add files to the schedule</h4>
                                            <p style={subHeaderParagraph}>Add any images you would like to be part of the scheduled rotation.</p>
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-xs-12 col-md-4 col-lg-4 col-xl-4">
                                        <div className="center">
                                            <i className="fa fa-3x fa-chrome"></i>
                                            <h4>Set the displays to the url provided</h4>
                                            <p style={subHeaderParagraph}>In a browser of your choosing, set each display to the url of the schedule you want it to be on. The content is automatically updated from your account.</p>
                                        </div>
                                    </div>
                                </div>
                       
        );
    }
});

module.exports = SiteDemoSimple
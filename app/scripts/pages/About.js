import Parse from 'parse';
import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

import Header from '../components/Header.js';
import LeftSideBar from '../components/LeftSideBar.js';

//https://www.google.com/design/spec/style/color.html#color-color-palette

var Home = React.createClass({
    mixins: [LinkedStateMixin],
    getInitialState: function(){
        return{
            items : [],
            loading: false,
            open: false
        };
    },
    componentDidMount() {

        // Parse.initialize('pp9waK9ticOFbhrJzrdITkRVQfCycHLqNPj2ZrN6','Pp9mBdqFMmnjFLT4skUMif2Tz7bie3hCqKv5CfRj');
        // var obj = new Parse.Object('GameScore');
        // obj.set('score',1337);
        // obj.save().then(function(obj) {
        //   console.log(obj.toJSON());
        //   var query = new Parse.Query('GameScore');
        //   query.get(obj.id).then(function(objAgain) {
        //     console.log(objAgain.toJSON());
        //   }, function(err) {console.log(err); });
        // }, function(err) { console.log(err); });


        window.sr = ScrollReveal();
        sr.reveal('.left',{origin:'left'});
        sr.reveal('.right',{origin:'right'});

    },
    onStatusChange(state) {
        this.setState(state);
    },

    render() {

        var style = {
            featureTitle:{color:' #777',fontWeight: '300',fontSize: '18px',marginTop: '0px',marginBottom: '10px',fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif'},
            mainSlider: {backgroundImage: 'url(../images/slider-bg.jpg)',backgroundAttachment: 'fixed',backgroundSize: 'cover',backgroundPosition: '50% 20%',backgroundRepeat: 'no-repeat',padding: '20px 0',color:' #fff',position: 'relative',display: 'block',boxSizing: 'border-box',height: '350px',fontWeight: '300',fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif'},
            carouselInner:{position: 'relative',width: '100%',overflow: 'hidden',boxSizing: 'border-box',display: 'block',color: '#fff',fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',fontSize: '14px',lineHeight: '1.428571429'},
            itemActive: {opacity: '1',transition: 'opacity ease-in-out 500ms',zIndex: '2',top: 'auto',position: 'relative',left: '0 !important',width: '100%',display: 'block !important',textAlign: 'center',boxSizing: 'border-box',color: '#fff',fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',fontSize: '14px',lineHeight: '1.428571429'},
            itemContainer : {maxWidth:' 1170px',paddingRight: '15px',paddingLeft: '15px',marginRight: 'auto',marginLeft: 'auto',boxSizing: 'border-box',textSlign: 'center',color: '#fff'},
            mainSliderH1:{animation:'scaleUp400ms',fontSize:'68px',textShadow:'03pxrgba(0,0,0,0.1)',color:'#fff',fontWeight:'300',marginTop:'20px',marginBottom:'10px',fontFamily:'"HelveticaNeue",Helvetica,Arial,sans-serif',lineHeight:'1.1',margin:'.67em0',WebkitMarginBefore:'0.83em',WebkitMarginAfter:'0.83em',display:'block'},
            pLead:{fontSize: '21px',fontWeight: '200',lineHeight: '1.4',marginBottom:' 20px',margin: '0 0 10px',boxSizing: 'border-box',display: 'block',WebkitMarginBefore: "1em",WebkitMarginAfter: "1em",WebkitMarginStart: '0px',WebkitMarginEnd: '0px'}
        };

    return (
    <div>
        <Header open={this.linkState("open")} /><LeftSideBar open={this.linkState("open")} />
        <section id="main-slider" className="carousel" style={style.mainSlider}>
            <div className="carousel-inner" style={style.carouselInner}>
                <div className="item active" style={style.itemActive}>
                    <div className="container" style={style.itemContainer}>
                        <div className="carousel-content">
                            <h1 style={style.mainSliderH1} className="title">About</h1>
                            <p className="lead" style={style.pLead}>We are here to make managing screens easier.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className='col-xs-12' style={{marginTop:'10px'}}>
            <div>
                <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97350&w=350&h=350" className="hidden-xs left col-xs-3 img img-responsive" />
                <div className='col-xs-12 col-sm-9 right'>
                    <h3>Title</h3>
                    <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed vel felis eget diam venenatis accumsan et nec erat. Fusce viverra nibh neque, et viverra diam molestie vel. Quisque viverra quis nisl at efficitur. Nullam eu urna fermentum, commodo nunc nec, suscipit neque. Aliquam erat volutpat. Nullam suscipit efficitur ante sit amet iaculis. Integer maximus quam at nisl rutrum auctor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin ornare est turpis, eu viverra eros vestibulum quis. Proin tellus neque, pulvinar eu massa vel, placerat mollis justo. Morbi volutpat, mi condimentum vulputate feugiat, erat leo interdum magna, sed malesuada massa lectus ac quam. Proin at orci eleifend, pulvinar eros a, eleifend ligula. Donec hendrerit mi quis volutpat consectetur. Donec ac sapien elementum, feugiat nibh non, suscipit velit.</p>
                </div>
            </div>
        </section>
    </div>
    );
  }
});

export default Home;
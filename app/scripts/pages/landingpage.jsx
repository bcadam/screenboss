import React from 'react';
import ItemList from '../components/itemList.jsx';
import ItemStore from '../stores/itemStore';
import ItemActions from '../actions/itemActions';
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
    

    window.sr = ScrollReveal();
    sr.reveal('.title');
    sr.reveal('.firstPrice',{delay:0});
    sr.reveal('.secondPrice',{delay:100});
    sr.reveal('.thirdPrice',{delay:200});

    this.unsubscribe = ItemStore.listen(this.onStatusChange);
    ItemActions.loadItems();

    /*<![CDATA[*/window.olark||(function(c){var f=window,d=document,l=f.location.protocol=="https:"?"https:":"http:",z=c.name,r="load";var nt=function(){
f[z]=function(){
(a.s=a.s||[]).push(arguments)};var a=f[z]._={
},q=c.methods.length;while(q--){(function(n){f[z][n]=function(){
f[z]("call",n,arguments)}})(c.methods[q])}a.l=c.loader;a.i=nt;a.p={
0:+new Date};a.P=function(u){
a.p[u]=new Date-a.p[0]};function s(){
a.P(r);f[z](r)}f.addEventListener?f.addEventListener(r,s,false):f.attachEvent("on"+r,s);var ld=function(){function p(hd){
hd="head";return["<",hd,"></",hd,"><",i,' onl' + 'oad="var d=',g,";d.getElementsByTagName('head')[0].",j,"(d.",h,"('script')).",k,"='",l,"//",a.l,"'",'"',"></",i,">"].join("")}var i="body",m=d[i];if(!m){
return setTimeout(ld,100)}a.P(1);var j="appendChild",h="createElement",k="src",n=d[h]("div"),v=n[j](d[h](z)),b=d[h]("iframe"),g="document",e="domain",o;n.style.display="none";m.insertBefore(n,m.firstChild).id=z;b.frameBorder="0";b.id=z+"-loader";if(/MSIE[ ]+6/.test(navigator.userAgent)){
b.src="javascript:false"}b.allowTransparency="true";v[j](b);try{
b.contentWindow[g].open()}catch(w){
c[e]=d[e];o="javascript:var d="+g+".open();d.domain='"+d.domain+"';";b[k]=o+"void(0);"}try{
var t=b.contentWindow[g];t.write(p());t.close()}catch(x){
b[k]=o+'d.write("'+p().replace(/"/g,String.fromCharCode(92)+'"')+'");d.close();'}a.P(2)};ld()};nt()})({
loader: "static.olark.com/jsclient/loader0.js",name:"olark",methods:["configure","extend","declare","identify"]});
/* custom configuration goes here (www.olark.com/documentation) */
olark.identify('3932-129-10-4975');/*]]>*/

  },

  componentWillUnmount() {
    this.unsubscribe();
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

    var pricingTableItem = {
        position: 'relative',
        minHeight: '1px',
        paddingRight: '15px',
        paddingLeft: '15px',
        fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
        fontSize: '14px',
        lineJeight: '1.428571429'
    };

    var pricingPlan = {
        background: '#fff',
        listStyle: 'none',
        margin: '0 0 20px',
        textAlign: 'center',
        padding: '0',
        borderBottom: '1px solid #e1e1e1'
    };

    var planName = {
        padding: "15px 0",
        fontSize: "18px",
        fontWeight: "700",
        margin: '0 15px',
        borderBottom: '1px dashed #eee',
        boxSizing: 'border-box',
        display: 'list-item',
        textAlign: '-webkit-match-parent',
        listStyle: 'none',
        fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
        lineHeight: '1.428571429'
    };


    var planPrice = {
        color: '#fff',
        backgroundColor: '#52b6ec',
        borderBottomColor: '#52b6ec',
        margin: '0',
        padding: '15px 0',
        fontSize: '48px',
        borderBottom: '1px dashed #eee',
        boxSizing: 'border-box',
        display: 'list-item',
        textAlign: '-webkit-match-parent',
        listStyle: 'none',
        fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
        lineHeight: '1.428571429'
    };

    var backgroundA = '#03A9F4';
    var backgroundB = '#FFC107';
    var backgroundC = '#009688';

    var planPriceA = {
        color: '#fff',
        backgroundColor: backgroundA,
        borderBottomColor: backgroundA,
        margin: '0',
        padding: '15px 0',
        fontSize: '48px',
        borderBottom: '1px dashed #eee',
        boxSizing: 'border-box',
        display: 'list-item',
        textAlign: '-webkit-match-parent',
        listStyle: 'none',
        fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
        lineHeight: '1.428571429'
    };

    var planPriceB = {
        color: '#fff',
        backgroundColor: backgroundB,
        borderBottomColor: backgroundB,
        margin: '0',
        padding: '15px 0',
        fontSize: '48px',
        borderBottom: '1px dashed #eee',
        boxSizing: 'border-box',
        display: 'list-item',
        textAlign: '-webkit-match-parent',
        listStyle: 'none',
        fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
        lineHeight: '1.428571429'
    };

    var planPriceC = {
        color: '#fff',
        backgroundColor: backgroundC,
        borderBottomColor: backgroundC,
        margin: '0',
        padding: '15px 0',
        fontSize: '48px',
        borderBottom: '1px dashed #eee',
        boxSizing: 'border-box',
        display: 'list-item',
        textAlign: '-webkit-match-parent',
        listStyle: 'none',
        fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
        lineHeight: '1.428571429'
    };

    var planPriceFree = {
        padding: '15px 0',
        fontSize: '48px',
        margin: '0 15px',
        borderBottom: '1px dashed #eee',
        color:' transparent !important',
        textShadow: '0 0 8px rgba(0, 0, 0, 0.5) !important',
        boxSizing: 'border-box',
        display: 'list-item',
        textAlign: '-webkit-match-parent',
        listStyle: 'none'
    };

    var planLine = {
        padding: '10px 0',
        margin: '0 15px',
        borderBottom: '1px dashed #eee',
        boxSizing: 'border-box',
        display: 'list-item',
        textAlign: '-webkit-match-parent',
        listStyle: 'none',
        color: '#999',
        fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
        fontSize: '14px',
        lineHeight: '1.428571429'
    };

    var planLineBlur = {
        padding: '10px 0',
        margin: '0 15px',
        borderBottom: '1px dashed #eee',
        boxSizing: 'border-box',
        display: 'list-item',
        textAlign: '-webkit-match-parent',
        listStyle: 'none',
        WebkitUserSelect: 'none',
        color: "transparent '!important'",
        textShadow: '0 0 8px rgba(0, 0, 0, 0.5) !important',
        fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
        fontSize: '14px',
        lineHeight: '1.428571429'
    };

    return (
      <div>
      <Header open={this.linkState('open')} /><LeftSideBar open={this.linkState('open')} />
    <section id="main-slider" className="carousel" style={style.mainSlider}>
        <div className="carousel-inner" style={style.carouselInner}>
            <div className="item active" style={style.itemActive}>
                <div className="container" style={style.itemContainer}>
                    <div className="carousel-content">
                        <h1 style={style.mainSliderH1} className='title'>Digital Signage Management</h1>
                        <p className="lead hidden-xs" style={style.pLead}>Easily control and schedule content for electronic displays.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
        <section className="content col-xs-12">
            <div className='row'>
                <div className="col-xs-12 col-sm-4" style={{textAlign:'center'}}>
                    <div style={{backgroundColor:"#e74c3c",height:'68px',width:'68px',borderRadius:'100%',float: 'none',margin:'0 auto'}}><i className="fa fa-calendar fa-3x" style={{color:'white',marginTop:'20%'}}></i></div>
                        <div style={subHeaders}>Set a schedule</div><div style={subHeaderParagraph}>Set the date that files are added to the the screens. Never have to remember to add something again.</div>
                    </div>
                <div className="col-xs-12 col-sm-4" style={{textAlign:'center'}}>
                    <div style={{backgroundColor:"#2ecc71",height:'68px',width:'68px',borderRadius:'100%',float: 'none',margin:'0 auto'}}><i className="fa fa-repeat fa-3x" style={{color:'white',marginTop:'20%'}}></i></div>
                        <div style={subHeaders}>Share and reuse content</div><div style={subHeaderParagraph}>Re-use your best content and share it across mutliple screens.</div>
                </div>
                <div className="col-xs-12 col-sm-4" style={{textAlign:'center'}}>
                    <div style={{backgroundColor:"#3498db",height:'68px',width:'68px',borderRadius:'100%',float: 'none',margin:'0 auto'}}><i className="fa fa-cloud-upload fa-3x" style={{color:'white',marginTop:'20%'}}></i></div>
                        <div style={subHeaders}>Request files</div><div style={subHeaderParagraph}>Easily get new files to display from colleagues and clients.</div>
                </div>
            </div>
            <br />
            <div className='row'>
                <div className="col-xs-12 col-sm-4" style={{textAlign:'center'}}>
                    <div style={{backgroundColor:"#8e44ad",height:'68px',width:'68px',borderRadius:'100%',float: 'none',margin:'0 auto'}}><i className="fa fa-mobile fa-3x" style={{color:'white',marginTop:'20%'}}></i></div>
                        <div style={subHeaders}>Manage from your phone</div><div style={subHeaderParagraph}>Easily upload files and change patterns from your phone. Manage all your screens while on the go.</div>
                </div>
                <div className="col-xs-12 col-sm-4" style={{textAlign:'center'}}>
                    <div style={{backgroundColor:"#1abc9c",height:'68px',width:'68px',borderRadius:'100%',float: 'none',margin:'0 auto'}}><i className="fa fa-wrench fa-3x" style={{color:'white',marginTop:'20%'}}></i></div>
                        <div style={subHeaders}>Easy to setup</div><div style={subHeaderParagraph}>Get started quickly. No complicated code, no system logs. Just click and go.</div>
                </div>
                <div className="col-xs-12 col-sm-4" style={{textAlign:'center'}}>
                    <div style={{backgroundColor:"#2c3e50",height:'68px',width:'68px',borderRadius:'100%',float: 'none',margin:'0 auto'}}><i className="fa fa-chrome fa-3x" style={{color:'white',marginTop:'20%'}}></i></div>
                        <div style={subHeaders}>Show Google Calendars</div><div style={subHeaderParagraph}>No need to manually enter your events. Everything displays automatically.</div>
                </div>
            </div>
        </section>
        <div id="pricing-table" className="col-xs-12">
            <div className="col-sm-4" style={pricingTableItem}>
                <ul className="plan featured firstPrice" style={pricingPlan}>
                    <li className="plan-name" style={planName}>Launch</li>
                    <li className="plan-price" style={planPriceA}>$50<div style={{fontSize:'12pt',display:'inline'}}>/month</div></li>
                    <li style={planLine}>1 Schedule</li>
                    <li style={planLine}>25 Files</li>
                    <li style={planLine}>Unlimited Screens</li>
                    <li style={planLine}>Unlimited Team Uploads</li>
                    <li style={planLine}>Email Support</li>
                    <li style={planLine} className="plan-action"><a href="/#/app/login" className="btn btn-primary btn-lg">Sign Up</a></li>
                </ul>
            </div>
            <div className="col-sm-4" style={pricingTableItem}>
                <ul className="plan featured secondPrice" style={pricingPlan}>
                    <li className="plan-name" style={planName}>Growth</li>
                    <li className="plan-price" style={planPriceB}>$100<div style={{fontSize:'12pt',display:'inline'}}>/month</div></li>
                    <li style={planLine}>3 Schedules</li>
                    <li style={planLine}>100 Files</li>
                    <li style={planLine}>Unlimited Screens</li>
                    <li style={planLine}>Unlimited Team Uploads</li>
                    <li style={planLine}>Email Support</li>
                    <li style={planLine} className="plan-action"><a href="/#/app/login" className="btn btn-primary btn-lg">Sign Up</a></li>
                </ul>
            </div>
            <div className="col-sm-4" style={pricingTableItem}>
                <ul className="plan featured thirdPrice" style={pricingPlan}>
                    <li className="plan-name" style={planName}>Scale</li>
                    <li className="plan-price" style={planPriceC}>$300<div style={{fontSize:'12pt',display:'inline'}}>/month</div></li>
                    <li style={planLine}>Unlimited Schedules</li>
                    <li style={planLine}>Unlimited Files</li>
                    <li style={planLine}>Unlimited Screens</li>
                    <li style={planLine}>Unlimited Team Uploads</li>
                    <li style={planLine}><b>Phone Support</b></li>
                    <li style={planLine} className="plan-action"><a href="/#/app/login" className="btn btn-primary btn-lg">Sign Up</a></li>
                </ul>
            </div>
        </div>
    </div>
    );
  }
});

export default Home;
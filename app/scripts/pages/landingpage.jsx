import React from 'react';
import ItemList from '../components/itemList.jsx';
import ItemStore from '../stores/itemStore';
import ItemActions from '../actions/itemActions';

class Home extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      items : [],
      loading: false
    };
  }

  componentDidMount() {
    this.unsubscribe = ItemStore.listen(this.onStatusChange.bind(this));
    ItemActions.loadItems();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onStatusChange(state) {
    this.setState(state);
  }

  render() {

    var featureTitle = {color:' #777',fontWeight: '300',fontSize: '18px',marginTop: '0px',marginBottom: '10px',fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif'};
    
    var mainSlider = {backgroundImage: 'url(../images/slider-bg.jpg)',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat',
    padding: '50px 0',
    color:' #fff',
    position: 'relative',
    display: 'block',
    boxSizing: 'border-box',
    height: '300px',
    fontWeight: '300',
    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif'};

    var mainSliderH1 = {fontSize: '68px',
    textShadow: '0 3px rgba(0, 0, 0, 0.1)',
    color: '#fff',
    marginTop: '20px',
    marginBottom: '10px'};

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

    <header className="header">
            <a href="/#/" className="logo">
                ScreenBoss
            </a>
            <nav className="navbar navbar-static-top" role="navigation">
                {/*<a href="#" className="navbar-btn sidebar-toggle" data-toggle="offcanvas" role="button">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </a>*/}
                <div className="navbar-right">
                    <ul className="nav navbar-nav">
                        {/*<li className="dropdown messages-menu">
                                                    <a href="/#/" className="dropdown-toggle" data-toggle="dropdown">
                                                        <i className="fa fa-envelope"></i>
                                                        <span className="label label-success">4</span>
                                                        Home
                                                    </a>
                                                    <ul className="dropdown-menu">
                                                                                    <li className="header">You have 4 messages</li>
                                                                                    <li>
                                                                                        <ul className="menu">
                                                                                            <li>
                                                                                                <a href="#">
                                                                                                    <div className="pull-left">
                                                                                                        <img src="images/avatar3.png" className="img-circle" alt="User Image"/>
                                                                                                    </div>
                                                                                                    <h4>
                                                                                                        Support Team
                                                                                                        <small><i className="fa fa-clock-o"></i> 5 mins</small>
                                                                                                    </h4>
                                                                                                    <p>Why not buy a new awesome theme?</p>
                                                                                                </a>
                                                                                            </li>
                                                                                            <li>
                                                                                                <a href="#">
                                                                                                    <div className="pull-left">
                                                                                                        <img src="images/avatar2.png" className="img-circle" alt="user image"/>
                                                                                                    </div>
                                                                                                    <h4>
                                                                                                        AdminLTE Design Team
                                                                                                        <small><i className="fa fa-clock-o"></i> 2 hours</small>
                                                                                                    </h4>
                                                                                                    <p>Why not buy a new awesome theme?</p>
                                                                                                </a>
                                                                                            </li>
                                                                                            <li>
                                                                                                <a href="#">
                                                                                                    <div className="pull-left">
                                                                                                        <img src="images/avatar.png" className="img-circle" alt="user image"/>
                                                                                                    </div>
                                                                                                    <h4>
                                                                                                        Developers
                                                                                                        <small><i className="fa fa-clock-o"></i> Today</small>
                                                                                                    </h4>
                                                                                                    <p>Why not buy a new awesome theme?</p>
                                                                                                </a>
                                                                                            </li>
                                                                                            <li>
                                                                                                <a href="#">
                                                                                                    <div className="pull-left">
                                                                                                        <img src="images/avatar2.png" className="img-circle" alt="user image"/>
                                                                                                    </div>
                                                                                                    <h4>
                                                                                                        Sales Department
                                                                                                        <small><i className="fa fa-clock-o"></i> Yesterday</small>
                                                                                                    </h4>
                                                                                                    <p>Why not buy a new awesome theme?</p>
                                                                                                </a>
                                                                                            </li>
                                                                                            <li>
                                                                                                <a href="#">
                                                                                                    <div className="pull-left">
                                                                                                        <img src="images/avatar.png" className="img-circle" alt="user image"/>
                                                                                                    </div>
                                                                                                    <h4>
                                                                                                        Reviewers
                                                                                                        <small><i className="fa fa-clock-o"></i> 2 days</small>
                                                                                                    </h4>
                                                                                                    <p>Why not buy a new awesome theme?</p>
                                                                                                </a>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </li>
                                                                                    <li className="footer"><a href="#">See All Messages</a></li>
                                                                                </ul>
                                                </li>*/}
                        <li className="dropdown notifications-menu">
                            <a href="/#/app" className="dropdown-toggle" data-toggle="dropdown">
                                {/*
                                                                <span className="label label-warning">10</span>*/}
                                App  <i className="fa fa-fort-awesome"></i> 
                            </a>
                            {/*<ul className="dropdown-menu">
                                                            <li className="header">You have 10 notifications</li>
                                                            <li>
                                                                <ul className="menu">
                                                                    <li>
                                                                        <a href="#">
                                                                            <i className="ion ion-ios7-people info"></i> 5 new members joined today
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="#">
                                                                            <i className="fa fa-warning danger"></i> Very long description here that may not fit into the page and may cause design problems
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="#">
                                                                            <i className="fa fa-users warning"></i> 5 new members joined
                                                                        </a>
                                                                    </li>
                            
                                                                    <li>
                                                                        <a href="#">
                                                                            <i className="ion ion-ios7-cart success"></i> 25 sales made
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="#">
                                                                            <i className="ion ion-ios7-person danger"></i> You changed your username
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                            <li className="footer"><a href="#">View all</a></li>
                                                        </ul>*/}
                        </li>
                        {/*<li className="dropdown tasks-menu">
                                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                                        <i className="fa fa-tasks"></i>
                                                        <span className="label label-danger">9</span>
                                                    </a>
                                                    <ul className="dropdown-menu">
                                                        <li className="header">You have 9 tasks</li>
                                                        <li>
                                                            <ul className="menu">
                                                                <li>
                                                                    <a href="#">
                                                                        <h3>
                                                                            Design some buttons
                                                                            <small className="pull-right">20%</small>
                                                                        </h3>
                                                                        <div className="progress xs">
                                                                            <div className="progress-bar progress-bar-aqua" style={{width: "20%"}} role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                                                                <span className="sr-only">20% Complete</span>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">
                                                                        <h3>
                                                                            Create a nice theme
                                                                            <small className="pull-right">40%</small>
                                                                        </h3>
                                                                        <div className="progress xs">
                                                                            <div className="progress-bar progress-bar-green" style={{width: "40%"}} role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                                                                <span className="sr-only">40% Complete</span>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">
                                                                        <h3>
                                                                            Some task I need to do
                                                                            <small className="pull-right">60%</small>
                                                                        </h3>
                                                                        <div className="progress xs">
                                                                            <div className="progress-bar progress-bar-red" style={{width: "60%"}} role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                                                                <span className="sr-only">60% Complete</span>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">
                                                                        <h3>
                                                                            Make beautiful transitions
                                                                            <small className="pull-right">80%</small>
                                                                        </h3>
                                                                        <div className="progress xs">
                                                                            <div className="progress-bar progress-bar-yellow" style={{width: "80%"}} role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                                                                <span className="sr-only">80% Complete</span>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li className="footer">
                                                            <a href="#">View all tasks</a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="dropdown user user-menu">
                                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                                        <i className="glyphicon glyphicon-user"></i>
                                                        <span>Jane Doe <i className="caret"></i></span>
                                                    </a>
                                                    <ul className="dropdown-menu">
                                                        <li className="user-header bg-light-blue">
                                                            <img src="images/avatar3.png" className="img-circle" alt="User Image" />
                                                            <p>
                                                                Jane Doe - Web Developer
                                                                <small>Member since Nov. 2012</small>
                                                            </p>
                                                        </li>
                                                        <li className="user-body">
                                                            <div className="col-xs-4 text-center">
                                                                <a href="#">Followers</a>
                                                            </div>
                                                            <div className="col-xs-4 text-center">
                                                                <a href="#">Sales</a>
                                                            </div>
                                                            <div className="col-xs-4 text-center">
                                                                <a href="#">Friends</a>
                                                            </div>
                                                        </li>
                                                        <li className="user-footer">
                                                            <div className="pull-left">
                                                                <a href="#" className="btn btn-default btn-flat">Profile</a>
                                                            </div>
                                                            <div className="pull-right">
                                                                <a href="#" className="btn btn-default btn-flat">Sign out</a>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </li>*/}
                    </ul>
                </div>
            </nav>
        </header>
    <section id="main-slider" className="carousel" style={mainSlider}>
        <div className="carousel-inner">
            <div className="item active">
                <div className="container">
                    <div className="carousel-content">
                        <h1 style={mainSliderH1}>Digital Signage Management</h1>
                        <p className="lead">Easily control and schedule content for displays.</p>
                    </div>
                </div>
            </div>
                <div className="item">
                <div className="container">
                    <div className="carousel-content">
                        <h1>ShapeBootstrap.net</h1>
                        <p className="lead">Download free but 100% premium quaility twitter Bootstrap based WordPress and HTML themes <br />from shapebootstrap.net</p>
                    </div>
                </div>
            </div>
        </div>
        <a className="prev" href="#main-slider" data-slide="prev"><i className="icon-angle-left"></i></a>
        <a className="next" href="#main-slider" data-slide="next"><i className="icon-angle-right"></i></a>
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
                        <div style={subHeaders}>No software only a browser</div><div style={subHeaderParagraph}>No need to download and manage new software on your sceens. Everything runs in the broswer.</div>
                </div>
            </div>
        </section>
        <div id="pricing-table" className="col-xs-12">
            <div className="col-sm-4" style={pricingTableItem}>
                <ul className="plan featured" style={pricingPlan}>
                    <li className="plan-name" style={planName}>Beta Test</li>
                    <li className="plan-price" style={planPrice}>Free</li>
                    <li style={planLine}>Unlimited Screens</li>
                    <li style={planLine}>Unlimited Paterns</li>
                    <li style={planLine}>Unlimited Files</li>
                    <li style={planLine}>Unlimited Team Uploads</li>
                    <li style={planLine}>Email Support</li>
                    <li style={planLine} className="plan-action"><a href="/#/app/" className="btn btn-primary btn-lg">Sign Up</a></li>
                </ul>
            </div>
            <div className="col-sm-4 blurry-text notPickable" style={pricingTableItem}>
                <ul className="plan" style={pricingPlan}>
                    <li className="plan-name" style={planName}>Standard</li>
                    <li className="plan-price blurry-text" style={planPriceFree}>$49</li>
                    <li style={{color:'#999 blurry-text'}}>10GB Storage</li>
                    <li style={planLineBlur}>2GB RAM</li>
                    <li style={planLineBlur}>1TB Bandwidth</li>
                    <li style={planLineBlur}>100 Email Address</li>
                    <li style={planLineBlur}>Forum Support</li>
                    <li style={planLineBlur} className="plan-action"><a href="/#/app/" className="btn btn-primary btn-lg blurry-text" style={{WebkitUserSelect: 'none'}}>Signup</a></li>
                </ul>
            </div>
            <div className="col-sm-4 blurry-text notPickable" style={pricingTableItem}>
                <ul className="plan" style={pricingPlan}>
                    <li className="plan-name" style={planName}>Advanced</li>
                    <li style={planPriceFree} className="plan-price blurry-text">$199</li>
                    <li style={planLineBlur}>30GB Storage</li>
                    <li style={planLineBlur}>5GB RAM</li>
                    <li style={planLineBlur}>5TB Bandwidth</li>
                    <li style={planLineBlur}>1000 Email Address</li>
                    <li style={planLineBlur}>Forum Support</li>
                    <li style={planLineBlur} className="plan-action"><a href="/#/app/" className="btn btn-primary btn-lg blurry-text" style={{WebkitUserSelect: 'none'}}>Signup</a></li>
                </ul>
            </div>
        </div>
    </div>
    );
  }
}

export default Home;
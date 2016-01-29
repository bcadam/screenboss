

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


    return (
      <div >
      <div className='hidden'>
        <p>ScreenBoss makes it easy to manage all of your digital displays in one place. Upload files to the cloud and show them anywhere. Easily request files from colleagues and clients.</p>
        <p>Set your electronic signage on schedules so you can set it and forget it. No contracts signage solution that is purely cloud-based. ScreenBoss is an intuitive CMS to manage your displays. Ease-of-use, scalability, with dynamic data. A great tool even for those with no technical skills.</p>
      </div>
    <header id='header' role='banner'>
        <div className='container'>
            <div id='navbar' className='navbar navbar-default'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <a className='navbar-brand' href='index.html'></a>
                </div>
                <div className='collapse navbar-collapse'>
                    <ul className='nav navbar-nav'>
                        <li className='active'><a href='#main-slider'><i className='icon-home'></i></a></li>
                        <li><a href='#features'>Features</a></li>
                        <li><a href='#pricing'>Pricing</a></li>
                        <li><a href='#contact' className='hidden-xs'>Contact</a></li>
                        <li><a href='/app.html' onclick='location.href = "app.html";'>App</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </header>

    <section id='main-slider' className='carousel'>
        <div className='carousel-inner'>
            <div className='item active'>
                <div className='container'>
                    <div className='carousel-content'>
                        <h1>Digital Signage Management</h1>
                        <p className='lead'>Easily control and schedule content for displays.</p>
                    </div>
                </div>
            </div>
            <div className='item'>
                <div className='container'>
                    <div className='carousel-content'>
                        <h1>ShapeBootstrap.net</h1>
                        <p className='lead'>Download free but 100% premium quaility twitter Bootstrap based WordPress and HTML themes <br />from shapebootstrap.net</p>
                    </div>
                </div>
            </div> 
        </div>
        <a className='prev' href='#main-slider' data-slide='prev'><i className='icon-angle-left'></i></a>
        <a className='next' href='#main-slider' data-slide='next'><i className='icon-angle-right'></i></a>
    </section>

    <section id='features'>
        <div className='container'>
            <div className='box first'>
                <div className='row'>
                    <div className='col-md-4 col-sm-6'>
                        <div className='center'>
                            <i className='icon-md icon-color1 fa-3x fa-calendar'></i>
                            <h4>Set a schedule</h4>
                            <p>Set the date that files are added to the the screens. Never have to remember to add something again.</p>
                        </div>
                    </div>
                    <div className='col-md-4 col-sm-6'>
                        <div className='center'>
                            <i className='icon-md icon-color2 fa-3x fa-retweet'></i>
                            <h4>Share and reuse content</h4>
                            <p>Re-use your best content and share it across mutliple screens.</p>
                        </div>
                    </div>
                    <div className='col-md-4 col-sm-6'>
                        <div className='center'>
                            <i className='icon-md icon-color3 fa-3x fa-cloud-upload'></i>
                            <h4>Request files</h4>
                            <p>Easily get new files to display from colleagues and clients.</p>
                        </div>
                    </div>
                    <div className='col-md-4 col-sm-6'>
                        <div className='center'>
                            <i className='icon-md icon-color4 fa-3x fa-mobile'></i>
                            <h4>Manage from your phone</h4>
                            <p>Easily upload files and change patterns from your phone. Manage all your screens while on the go.</p>
                        </div>
                    </div>
                    <div className='col-md-4 col-sm-6'>
                        <div className='center'>
                            <i className='icon-md icon-color5 fa-3x fa-wrench'></i>
                            <h4>Easy to setup</h4>
                            <p>Get started quickly. No complicated code, no system logs. Just click and go.</p>
                        </div>
                    </div>
                    <div className='col-md-4 col-sm-6'>
                        <div className='center'>
                            <i className='icon-md icon-color6 fa-3x fa-chrome'></i>
                            <h4>No software only a browser</h4>
                            <p>No need to download and manage new software on your sceens. Everything runs in the broswer.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

     <section id='pricing'>
        <div className='container'>
            <div className='box'>
                <div id='pricing-table' className='row'>
                    <div className='col-sm-4'>
                        <ul className='plan featured'>
                            <li className='plan-name'>Beta Test</li>
                            <li className='plan-price'>Free</li>
                            <li>Unlimited Screens</li>
                            <li>Unlimited Paterns</li>
                            <li>Unlimited Files</li>
                            <li>Unlimited Team Uploads</li>
                            <li>Email Support</li>
                            <li className='plan-action'><a href='/app.html' className='btn btn-primary btn-lg'>Signup</a></li>
                        </ul>
                    </div>
                    <div className='col-sm-4 blurry-text notPickable'>
                        <ul className='plan'>
                            <li className='plan-name'>Standard</li>
                            <li className='plan-price blurry-text'>$49</li>
                            <li style={{color:'#999 blurry-text'}}>10GB Storage</li>
                            <li>2GB RAM</li>
                            <li>1TB Bandwidth</li>
                            <li>100 Email Address</li>
                            <li>Forum Support</li>
                            <li className='plan-action'><a href='#' className='btn btn-primary btn-lg blurry-text'>Signup</a></li>
                        </ul>
                    </div>
                    <div className='col-sm-4 blurry-text notPickable'>
                        <ul className='plan'>
                            <li className='plan-name'>Advanced</li>
                            <li className='plan-price blurry-text'>$199</li>
                            <li>30GB Storage</li>
                            <li>5GB RAM</li>
                            <li>5TB Bandwidth</li>
                            <li>1000 Email Address</li>
                            <li>Forum Support</li>
                            <li className='plan-action'><a href='#' className='btn btn-primary btn-lg blurry-text'>Signup</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>



    <section id='contact'>
    <div className='container'>
        <div className='box last'>
            <div className='row'>
                <div className='col-sm-12'>
                    <h1>Contact Form</h1>
                    <p>We would love to hear from you. Please drop us a line if you have any questions.</p>
                    <div className='status alert alert-success' style={{display: 'none'}}></div>
                    <form id='main-contact-form' className='contact-form' name='contact-form' action='http://formspree.io/you@email.com' role='form'>
                        <input type='hidden' name='_subject' value='New ScreenBoss Email' />
                        <div className='row'>
                            <div className='col-sm-6'>
                                <div className='form-group'>
                                    <input type='text' className='form-control' required='required' placeholder='Name' name='name' />
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div className='form-group'>
                                    <input type='text' className='form-control' required='required' placeholder='Email address' name='_replyto' />
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-12'>
                                <div className='form-group'>
                                    <textarea name='message' id='message' required='required' className='form-control' rows='8' placeholder='Message'></textarea>
                                </div>
                                <div className='form-group'>
                                    <button type='submit' className='btn btn-danger btn-lg' value='Send'>Send Message</button>
                                    <input type='hidden' name='_next' value='http://screenboss.co/index.html#main-slider' />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>


    <footer id='footer'>
        <div className='container'>
            <div className='row'>
                <div className='col-sm-6'>
                </div>
                <div className='col-sm-6'>
                </div>
            </div>
        </div>
    </footer>
    </div>
    );
  }
}

export default Home;
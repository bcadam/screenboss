var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var Parse = require('parse');
var ParseReact = require('parse-react');
Parse.initialize('pp9waK9ticOFbhrJzrdITkRVQfCycHLqNPj2ZrN6', '8UXFi3hzHgbKWoMZIIX3ZgUg0tHKPzSK6w8Ul0M6');

var key = window.location.href;
var count = key.indexOf('screen/');
key = key.substring(count + 7, key.length);
//console.log(key);

var LoginForm = React.createClass({
    getInitialState: function() {
        return {
            name: '',
            password: ''
        };
    },
    handleChange: function(name, e) {
        var change = {};
        change[name] = e.target.value;
        this.setState(change);
    },
    login: function() {
        //console.log(this.props.user);

        var self = this;

        Parse.User.logIn(this.state.name, this.state.password, {
            success: function(user) {
                // Do stuff after successful login.
                self.props.user.requestChange(user);
            },
            error: function(user, error) {
                // The login failed. Check error to see why.
            }
        });

    },
    render: function() {
        return (
            <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="well login-box">
                                        <legend>Login</legend>
                                        <div className="form-group col-xs-12">
                                            <label for="username-email">E-mail</label>
                                            <input type="text" className='form-control' id="screenName" placeholder="E-mail" onChange={this.handleChange.bind(this, 'name')} />
                                        </div>
                                        <div className="form-group col-xs-12">
                                            <label for="password">Password</label>
                                            <input id="password" placeholder="Password" type="text" className="form-control" onChange={this.handleChange.bind(this, 'password')} />
                                        </div>
                                        <div className="row form-group text-center">
                                            <input type="submit" className="btn btn-success btn-login-submit col-xs-12" value="Login" onClick={this.login} />
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
        );
    }
});

var ScreenDisplayAnimator = React.createClass({
    mixins: [ParseReact.Mixin],
    observe: function() {
        // Subscribe to all Comment objects, ordered by creation date
        // The results will be available at this.data.comments
        //var user = Parse.User.current();
        return {
            screens: (new Parse.Query('AssignmentPattern')).include('screenAsset').include('screen').equalTo('screen', new Parse.Object('Screen', {
                id: key
            })).descending('createdAt').skip(1),
            firstScreen: (new Parse.Query('AssignmentPattern')).include('screenAsset').include('screen').equalTo('screen', new Parse.Object('Screen', {
                id: key
            })).descending('createdAt').limit(1)
        };
    },
    logOut: function(){
        var self = this;
        Parse.User.logOut().then(function(){
            self.props.user.requestChange(null);
        });
    },
    render: function() {

        //var imageClass = this.props.imageClass.value;
        var holder = this.props.imageClass;
        //console.log(holder);
        //console.log(this.data.firstScreen);
        return (
            <div id="carousel-example-generic" className="carousel slide" data-interval="15000" data-ride="carousel" style={{height:"100%",width:"100%",cursor:'none'}} onClick={this.logOut}>
                  <div className="carousel-inner" role="listbox">
                    {this.data.firstScreen.map(function(c) {
                    return (
                    <div key={c.objectId} className="product item active">
                      <img src={c.screenAsset.file.url()} className="vcenter img img-responsive" style={holder.value}/>
                    </div>
                    );
                    })}
                    {this.data.screens.map(function(c) {
                    return (
                    <div key={c.objectId} className="product item">
                      <img src={c.screenAsset.file.url()} className="vcenter img img-responsive" style={holder.value}/>
                    </div>
                    );
                    })}
                  </div>
                </div>
        );
    }
});

var ScreenDisplayPage = React.createClass({
    mixins: [LinkedStateMixin],

    returnSomething(something) {
        //this is only for testing purposes. Check /test/components/App-test.js
        return something;
    },
    getInitialState() {
        return {
            user: Parse.User.current(),
            imageClass: {
                width: "100%",
                height: "auto",
                overflow: "hidden"
            }
        };
    },
    render() {
        // var user = Parse.User.current();
        // console.log(user);
        var self = this;
        var loggedIn = (<ScreenDisplayAnimator user={self.linkState('user')} imageClass={self.linkState('imageClass')} />);

        var notLoggedIn = <LoginForm user={this.linkState('user')} />;
        var display = ((this.state.user != null) ? loggedIn : notLoggedIn);

        return (
            <div onClick={this.handleClick}>{display}</div>
        );
    }
});



module.exports = ScreenDisplayPage



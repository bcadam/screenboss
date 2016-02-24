import React from 'react';
import Parse from 'parse';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';


var LoginForm = React.createClass({
    getInitialState: function() {
        return {
            name: '',
            password: '',
            user: this.props.user
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

        Parse.User.logIn(this.state.name, this.state.password,{
          success: function(user) {
            // Do stuff after successful login.
            //self.props.user.requestChange(user);
            window.location.assign("/#/app/");
            
          },
          error: function(user, error) {
            // The login failed. Check error to see why.
            alert("Failed to log in. Please double check your email and password.");
          }
        });

    },
    resetPassword: function() {
        //console.log(this.props.user);

        Parse.User.requestPasswordReset(this.state.name, {
          success: function() {
          // Password reset request was sent successfully
          alert("An email is on the way...")
          },
          error: function(error) {
            // Show the error message somewhere
            alert("Failed to reset. Please double check you have entered your full email.");
          }
        });

    },
    createAccount: function() {
        //console.log(this.props.user);
        var self = this;

        var user = new Parse.User();
        user.set("username",this.state.name);
        user.set("email", this.state.name);
        user.set("password",this.state.password);
        user.set("tutorialOpen", true);

        user.signUp(null, {
          success: function(user) {
            //Hooray! Let them use the app now.
            this.props.user.requestChange(user)
            //window.location.assign("/#/app/");
          },
          error: function(user, error) {
            // Show the error message somewhere and let the user try again.
            alert("Failed to create a new account. Please check your email address.");
          }
        });

        // Parse.User.logIn(this.state.name, this.state.password,{
        //   success: function(user) {
        //     // Do stuff after successful login.
        //     self.props.user.requestChange(user);
        //   },
        //   error: function(user, error) {
        //     // The login failed. Check error to see why.
        //   }
        // });

    },
    render: function() {
        console.log(this.state.user);
        return (
                  <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="login-box">
                                        <div className="form-group col-xs-12">
                                            <TextField fullWidth={true} id='assetName' hintText="" floatingLabelText="Email" onChange={this.handleChange.bind(this, 'name')} />
                                        </div>
                                        <div className="form-group col-xs-12">
                                            <TextField fullWidth={true} type="password" id="password" placeholder="Password" onChange={this.handleChange.bind(this, 'password')} />
                                        </div>
                                        <div className="row form-group text-center">
                                            <RaisedButton fullWidth={true} type="submit" className="btn btn-success btn-login-submit col-xs-12" label="Login" primary={true} onClick={this.login} />
                                        </div>
                                        <div className="row form-group text-center">
                                            <RaisedButton fullWidth={true}  type="submit" className="btn btn-success btn-login-submit col-xs-12" label="Create Account" secondary={true} onClick={this.createAccount} />
                                        </div>
                                        <div className="row form-group text-center">
                                            <FlatButton  fullWidth={true} type="submit" className="btn btn-success btn-login-submit col-xs-12" label="Reset Password" onClick={this.resetPassword} />
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
              );
    }
});

module.exports = LoginForm;

import React from 'react';
import Parse from 'parse';
var moment = require('moment');
var ParseReact = require('parse-react');
var StripeCheckout = require('react-stripe-checkout');

import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import FontIcon from 'material-ui/lib/font-icon';
import LockOpen from 'material-ui/lib/svg-icons/action/lock-open';
import ActionAndroid from 'material-ui/lib/svg-icons/action/android';
import Dialog from 'material-ui/lib/dialog';


var CreditCard = React.createClass({
    onToken: function(token){
        console.log(token);
        var self = this;
        Parse.Cloud.run('stripeToken', { 
            token: token,
            userId: Parse.User.current().id
        })
        .then(function(result) {
          // ratings should be 4.5
            console.log(result);
          self.forceUpdate();
          window.location.reload();
          //self.setState({snackMessage:result,open:true,message:"Please send me the file so it can be displayed.",email:""});
        });
    },
    getInitialState:function() {
        return {
              toggle : 1,
              open:false
        };
    },
    handleOpen: function() {
        this.setState({open: true});
      },

    handleClose: function(){
        this.setState({open: false});
    },
    cancelSubscription: function(){
        var self = this;
        var newToggle = self.state.toggle + 1;

        Parse.Cloud.run('cancelSubscription', { 
            subscriptionId: Parse.User.current().get('subscriptionId'),
            stripeId: Parse.User.current().get('stripeId'),
            userId: Parse.User.current().id
        })
        .then(function(result) {
          console.log(result);
          window.location.reload();
        });
    },
    renewSubscription: function(){
        var self = this;
        var newToggle = self.state.toggle + 1;

        Parse.Cloud.run('renewSubscription', { 
            stripeId: Parse.User.current().get('stripeId'),
            userId: Parse.User.current().id
        })
        .then(function(result) {
          console.log(result);
          window.location.reload();
        });
    },
    render: function() {
        
        var subscriptionId = Parse.User.current().get('subscriptionId');
        var email = Parse.User.current().get('email');
        var stripeId = Parse.User.current().get('stripeId');

        var self = this;
        var display;
        // //var display = (<button className="myOwnButton btn btn-warning" onClick={self.cancelSubscription} >
        //         Cancel Subscription
        //       </button>);

        var styles = {
          button: {
            margin: 12,
          },
          exampleImageInput: {
            cursor: 'pointer',
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            width: '100%',
            opacity: 0,
          },
        };

        var key = "pk_live_lji5reYLb5YYjHM75tJwd7UI";
        //var key = "pk_test_sd7yOGYw0CMM6FmSHdtnEqlr";

        if(Parse.User.current() && !subscriptionId && !stripeId){
            display = (<StripeCheckout
              name="ScreenBoss"
              description="Launch Plan"
              image="http://www.screenboss.co/images/favicon-96x96.png"
              componentClass="div"
              panelLabel="Subscribe"
              amount={5000}
              currency="USD"
              stripeKey={key}
              locale="en"
              email={email}
              // Note: Enabling either address option will give the user the ability to 
              // fill out both. Addresses are sent as a second parameter in the token callback. 
              shippingAddress={false}
              billingAddress={false}
              // Note: enabling both zipCode checks and billing or shipping address can have 
              // unintended consequences. 
              zipCode={false}
              alipay={false}
              bitcoin={false}
              allowRememberMe={true}
              token={this.onToken}
              // Note: `reconfigureOnUpdate` should be set to true IFF if you do not change 
              // the core stripe config (stripeKey, image, ...) on subsequent components. It can 
              // improve performance if you have a lot of buttons that tie to the same account. 
              reconfigureOnUpdate={false}
              >
              <RaisedButton
                  label="Subscribe at $50/month"
                  linkButton={true}
                  secondary={true}
                  style={styles.button}
                    icon={<ActionAndroid />}
                />
            </StripeCheckout>);
        }
        
        var actions;
        if(subscriptionId && stripeId)
        {
            actions = [
              <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.handleClose}
              />,
              <FlatButton
                label="I'm sure"
                primary={true}
                onTouchTap={this.cancelSubscription}
              />,
            ];
            display = (<div><RaisedButton
                  label="Cancel Subscription"
                  linkButton={true}
                  primary={true}
                  onTouchTap={self.handleOpen}
                  style={styles.button}
                    icon={<ActionAndroid />}
                /><Dialog
          title="Are you sure?"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          Please let us know if there is anything we can do to help at <b>info@screenboss.co</b>
        </Dialog></div>);
        }

        
        if(!subscriptionId && stripeId)
        {
             display = (<RaisedButton
                  label="Renew Subscription at $50/month"
                  linkButton={true}
                  secondary={true}
                  onTouchTap={self.renewSubscription}
                  style={styles.button}
                    icon={<ActionAndroid />}
                />);
        }

        return (
            <div>{display}</div>
        )
    }
})

module.exports = CreditCard



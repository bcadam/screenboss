import React from 'react';
import Parse from 'parse';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';


var LogOut = React.createClass({
    componentWillMount:function() {
          Parse.User.logOut();
    },
    render: function() {
        return (
                  <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                You have been logged out.
                            </div>
                        </div>
                    </div>
                  </div>
              );
    }
});

module.exports = LogOut;

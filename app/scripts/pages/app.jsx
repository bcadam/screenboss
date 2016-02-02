import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';
Parse.initialize('pp9waK9ticOFbhrJzrdITkRVQfCycHLqNPj2ZrN6', '8UXFi3hzHgbKWoMZIIX3ZgUg0tHKPzSK6w8Ul0M6');

import LinkedStateMixin from 'react-addons-linked-state-mixin';

var Header = require('../components/Header.js');
var LeftSideBar = require('../components/LeftSideBar.js');


var App = React.createClass({
    mixins: [LinkedStateMixin],

        getInitialState() {
            return {
                user: Parse.User.current(),
                open: false,
            };
        },
        
        render() {
        

            return (
				<div>
			        <Header open={this.linkState('open')} /><LeftSideBar open={this.linkState('open')} />
			        {/*<div className="wrapper row-offcanvas row-offcanvas-left">
			        			        	<LeftSideBar />


			        	<aside className="right-side">    */}            
			                {/**<section className="content-header">
			                    <h1>
			                        Home Page
			                        <small>{/**Control panel</small>
			                    </h1>
			                    <ol className="breadcrumb">
			                        <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
			                        <li className="active">Blank page</li>
			                    </ol>
			                </section>**/}

			                <section className="content">

			                    {this.props.children}

			                </section>
			           {/* </aside>

			        </div>*/}
		        </div>    
            )
        }
});

module.exports = App
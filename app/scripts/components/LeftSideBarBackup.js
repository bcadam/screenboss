import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';



var LeftSideBar = React.createClass({
    render: function() {
        // Render the text of each comment as a list item
        var user = Parse.User.current();

        var email = '';

        if(user)
        {
            email = user.get('email');
        }
        return (
            <aside className="left-side sidebar-offcanvas">                
                <section className="sidebar">
                    <div className="user-panel">
                        <div className="pull-left image">
                            {/*<i className="fa fa-user fa-3x img-circle"></i>*/}
                            {/*<img src="../images/avatar3.png" className="img-circle" alt="User Image" />*/}
                        </div>
                        <div className="pull-left info">
                            <div className='text-center' style={{fontSize:"14px"}}>{email}</div>
                            {/**<a href="#"><i className="fa fa-circle text-success"></i> Online</a>**/}
                        </div>
                    </div>
                    {/*<form action="#" method="get" className="sidebar-form">
                                            <div className="input-group">
                                                <input type="text" name="q" className="form-control" placeholder="Search..."/>
                                                <span className="input-group-btn">
                                                    <button type='submit' name='seach' id='search-btn' className="btn btn-flat"><i className="fa fa-search"></i></button>
                                                </span>
                                            </div>
                                        </form>*/}
                    <ul className="sidebar-menu">
                        <li className="active">
                            <a href="/#/app/">
                                <i className="fa fa-dashboard"></i> <span>Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="/#/app/screens">
                                <i className="fa fa-th"></i> <span>Screens</span>{/**<small className="badge pull-right bg-green">new</small>**/}
                            </a>
                        </li>
                        <li>
                            <a href="/#/app/assets">
                                <i className="fa fa-picture-o"></i> <span>Files</span>{/**<small className="badge pull-right bg-green">new</small>**/}
                            </a>
                        </li>
                        {/*<li className="treeview">
                                                    <a href="#">
                                                        <i className="fa fa-bar-chart-o"></i>
                                                        <span>Charts</span>
                                                        <i className="fa fa-angle-left pull-right"></i>
                                                    </a>
                                                    <ul className="treeview-menu">
                                                        <li><a href="charts/morris.html"><i className="fa fa-angle-double-right"></i> Morris</a></li>
                                                        <li><a href="charts/flot.html"><i className="fa fa-angle-double-right"></i> Flot</a></li>
                                                        <li><a href="charts/inline.html"><i className="fa fa-angle-double-right"></i> Inline charts</a></li>
                                                    </ul>
                                                </li>
                                                <li className="treeview">
                                                    <a href="#">
                                                        <i className="fa fa-laptop"></i>
                                                        <span>UI Elements</span>
                                                        <i className="fa fa-angle-left pull-right"></i>
                                                    </a>
                                                    <ul className="treeview-menu">
                                                        <li><a href="UI/general.html"><i className="fa fa-angle-double-right"></i> General</a></li>
                                                        <li><a href="UI/icons.html"><i className="fa fa-angle-double-right"></i> Icons</a></li>
                                                        <li><a href="UI/buttons.html"><i className="fa fa-angle-double-right"></i> Buttons</a></li>
                                                        <li><a href="UI/sliders.html"><i className="fa fa-angle-double-right"></i> Sliders</a></li>
                                                        <li><a href="UI/timeline.html"><i className="fa fa-angle-double-right"></i> Timeline</a></li>
                                                    </ul>
                                                </li>
                                                <li className="treeview">
                                                    <a href="#">
                                                        <i className="fa fa-edit"></i> <span>Forms</span>
                                                        <i className="fa fa-angle-left pull-right"></i>
                                                    </a>
                                                    <ul className="treeview-menu">
                                                        <li><a href="forms/general.html"><i className="fa fa-angle-double-right"></i> General Elements</a></li>
                                                        <li><a href="forms/advanced.html"><i className="fa fa-angle-double-right"></i> Advanced Elements</a></li>
                                                        <li><a href="forms/editors.html"><i className="fa fa-angle-double-right"></i> Editors</a></li>                                
                                                    </ul>
                                                </li>
                        <li className="treeview">
                            <a href="#">
                                <i className="fa fa-table"></i> <span>Tables</span>
                                <i className="fa fa-angle-left pull-right"></i>
                            </a>
                            <ul className="treeview-menu">
                                <li><a href="tables/simple.html"><i className="fa fa-angle-double-right"></i> Simple tables</a></li>
                                <li><a href="tables/data.html"><i className="fa fa-angle-double-right"></i> Data tables</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="calendar.html">
                                <i className="fa fa-calendar"></i> <span>Calendar</span>
                                <small className="badge pull-right bg-red">3</small>
                            </a>
                        </li>
                        <li>
                            <a href="mailbox.html">
                                <i className="fa fa-envelope"></i> <span>Mailbox</span>
                                <small className="badge pull-right bg-yellow">12</small>
                            </a>
                        </li>*/}
                        {/*<li className="treeview">
                                                    <a href="#">
                                                        <i className="fa fa-folder"></i> <span>Examples</span>
                                                        <i className="fa fa-angle-left pull-right"></i>
                                                    </a>
                                                    <ul className="treeview-menu">
                                                        <li><a href="examples/invoice.html"><i className="fa fa-angle-double-right"></i> Invoice</a></li>
                                                        <li><a href="examples/login.html"><i className="fa fa-angle-double-right"></i> Login</a></li>
                                                        <li><a href="examples/register.html"><i className="fa fa-angle-double-right"></i> Register</a></li>
                                                        <li><a href="examples/lockscreen.html"><i className="fa fa-angle-double-right"></i> Lockscreen</a></li>
                                                        <li><a href="examples/404.html"><i className="fa fa-angle-double-right"></i> 404 Error</a></li>
                                                        <li><a href="examples/500.html"><i className="fa fa-angle-double-right"></i> 500 Error</a></li>                                
                                                        <li><a href="examples/blank.html"><i className="fa fa-angle-double-right"></i> Blank Page</a></li>
                                                    </ul>
                                                </li>
                                                <li className="treeview">
                                                    <a href="#">
                                                        <i className="fa fa-folder"></i>  Multilevel Menu
                                                        <i className="fa fa-angle-left pull-right"></i>
                                                    </a>                            
                        
                                                    <ul className="treeview-menu">
                                                        <li className="treeview">
                                                            <a href="#">
                                                                First level
                                                                <i className="fa fa-angle-left pull-right"></i>
                                                            </a>
                        
                                                            <ul className="treeview-menu">
                                                                <li className="treeview">
                                                                    <a href="#">
                                                                        Second level
                                                                        <i className="fa fa-angle-left pull-right"></i>
                                                                    </a>
                        
                                                                    <ul className="treeview-menu">
                                                                        <li>
                                                                            <a href="#">Third level</a>
                                                                        </li>
                                                                    </ul>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>*/}
                    </ul>
                </section>
            </aside>
        );
    }
});

module.exports = LeftSideBar





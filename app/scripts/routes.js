import React from 'react';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import createHistory from 'history/lib/createHashHistory'

import App from './pages/app.jsx';
import BlankApp from './pages/blankapp.jsx';
import Home from './pages/home.jsx';
import Info from './pages/info.jsx';
import NotFound from './pages/notFound.jsx';
import Main from './pages/main.jsx';
import LandingPage from './pages/landingpage.jsx';

var ScreenList = require('./components/ScreenList.js');
var ScreenDisplay = require('./components/ScreenDisplay.js');
var LoginForm = require('./components/LoginForm.js');
var LogOut = require('./components/LogOut.js');
var AssetList = require('./components/AssetList.js');
var Screen = require('./components/Screen.js');
var Dropzone = require('./components/Dropzone.js');

const historyOptions = {
  queryKey : false
};

const routes = (
  <Router history={createHistory(historyOptions)}>
    <Route path='/screen/' component={ BlankApp }>
      <Route path=':id' component={ Screen } />
    </Route>
    <Route path='/app' component={ App }>
      <IndexRoute component={ Main } />
      <Route path='info' component={ Info } />
      <Route path='screens' component={ ScreenList } />
      <Route path='assets' component={ AssetList } />
      <Route path='login' component={ LoginForm } />
      <Route path='logout' component={ LogOut } />
      <Route path='app' component={ Main } />
      <Route path='home' component={ Home } />
      <Route path='*' component={NotFound}/>
    </Route>
    <Route path='/' component={ BlankApp }>
      <IndexRoute component={ LandingPage }/>
      <Route path='*' component={NotFound}/>
    </Route>

  </Router>
);

export default routes;
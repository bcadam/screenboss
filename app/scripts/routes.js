import React from 'react';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import createHistory from 'history/lib/createHashHistory'

import App from './pages/app.jsx';
import BlankApp from './pages/blankapp.jsx';
import NotFound from './pages/notFound.jsx';
import Main from './pages/main.jsx';
import LandingPage from './pages/landingpage.jsx';
import ScreenListPage from './pages/ScreenListPage.js';
import AssetListPage from './pages/AssetListPage.js';

import GettingStarted from './pages/GettingStarted.jsx';
import GettingStartedAssets from './pages/GettingStartedAssets.jsx';
import GettingStartedScreens from './pages/GettingStartedScreens.jsx';

var LoginForm = require('./components/LoginForm.js');
var LogOut = require('./components/LogOut.js');
var Screen = require('./components/Screen.js');

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
      <Route path='screens' component={ ScreenListPage } />
      <Route path='assets' component={ AssetListPage } />

      <Route path='login' component={ LoginForm } />
      <Route path='logout' component={ LogOut } />

      <Route path='gettingstarted' component={ GettingStarted } />
      <Route path='gettingstartedassets' component={ GettingStartedAssets } />
      <Route path='gettingstartedscreens' component={ GettingStartedScreens } />

      <Route path='*' component={NotFound}/>
    </Route>
    <Route path='/' component={ BlankApp }>
      <IndexRoute component={ LandingPage }/>
      <Route path='*' component={NotFound}/>
    </Route>

  </Router>
);

export default routes;
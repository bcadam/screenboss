import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from './pages/app.jsx';
import BlankApp from './pages/blankapp.jsx';
import NotFound from './pages/notFound.jsx';
import Main from './pages/main.jsx';
import LandingPage from './pages/landingpage.jsx';
import ScheduleListPage from './pages/ScheduleListPage.js';
import AssetListPage from './pages/AssetListPage.js';
import CalendarsPage from './pages/CalendarsPage.js';
import About from './pages/About.js';

var LoginForm = require('./components/LoginForm.js');
var LogOut = require('./components/LogOut.js');
var Screen = require('./components/Screen.js');
var Display = require('./components/Display.js');
var RequestFile = require('./components/RequestFile.js');
var GoogleEvents = require('./components/GoogleEvents.js');
var Profile = require('./components/Profile.js');
var CreditCard = require('./components/CreditCard.js');
var SendFile = require('./components/SendFile.js');
var Claim = require('./components/Claim.js');
var Displays = require('./components/Displays.js');
var Overview = require('./components/Overview.js');


var Tester = require('./components/Tester.js');


const routes = (
  <Router>
    
    <Route path='screen' component={ BlankApp }>
      <Route path=':id' component={ Screen } />
    </Route>

    <Route path='display' component={ BlankApp }>
      <Route path=':id' component={ Display } />
    </Route>

    <Route path='/app' component={ App }>
      <IndexRoute component={ Profile } />
      <Route path='playlists' component={ ScheduleListPage } />
      <Route path='calendars' component={ CalendarsPage } />
      <Route path='assets' component={ AssetListPage } />
      <Route path='events' component={ GoogleEvents } />
      <Route path='profile' component={ Profile } />
      <Route path='creditcard' component={ CreditCard } />
      <Route path='filerequest/:id' component={ RequestFile } />
      <Route path='sendfile' component={ SendFile } />
      <Route path='claim' component={ Claim } />
      <Route path='displays' component={ Displays } />

      <Route path='login' component={ LoginForm } />
      <Route path='logout' component={ LogOut } />




      <Route path='tester' component={ Tester } />

      <Route path='*' component={NotFound}/>

    </Route>

    <Route path='/admin' component={ App }>
      <IndexRoute component={ Profile } />
      <Route path='overview' component={ Overview } />

      <Route path='*' component={NotFound}/>

    </Route>


    <Route path='/' component={ BlankApp }>
      <IndexRoute component={ LandingPage }/>
      <Route path='about' component={ About } />
      <Route path='*' component={NotFound}/>
    </Route>

  </Router>
);

export default routes;


// import GettingStarted from './pages/GettingStarted.jsx';
// import GettingStartedAssets from './pages/GettingStartedAssets.jsx';
// import GettingStartedScreens from './pages/GettingStartedScreens.jsx';
// import GettingStartedAssignments from './pages/GettingStartedAssignments.jsx';
   {/*<Route path='gettingstarted' component={ GettingStarted } />
            <Route path='gettingstartedassets' component={ GettingStartedAssets } />
            <Route path='gettingstartedscreens' component={ GettingStartedScreens } />
            <Route path='gettingstartedassignments' component={ GettingStartedAssignments } />*/}


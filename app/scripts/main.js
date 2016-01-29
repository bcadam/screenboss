import ReactDOM from 'react-dom';
import React from 'react';
import routes from './routes';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';

import createHistory from 'history/lib/createHashHistory';

var history = createHistory({
  queryKey: false
});


// import createBrowserHistory from 'history/lib/createBrowserHistory'

// ReactDOM.render (( 
//   <Router history={createBrowserHistory()} routes={routes} /> 
// ), document.getElementById('app'));



ReactDOM.render(
  <Router history={history} routes={routes} />,
  document.getElementById('app')
)
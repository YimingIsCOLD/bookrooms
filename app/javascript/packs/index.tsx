import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import NotFoundView from './containers/NotFoundView';
import DashboardLayout from './containers/DashboardLayout';
import UpcomingMeetingsView from './containers/UpcomingMeetingsView';
import SearchMeetingRoomsView from './containers/SearchMeetingRoomsView';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Redirect exact from="/" to="/dashboard" />

        <Route path="/dashboard">
          <DashboardLayout>
            <Switch>
              <Route exact path="/dashboard/upcoming" component={UpcomingMeetingsView} />
              <Route exact path="/dashboard/search" component={SearchMeetingRoomsView} />
              <Redirect to="/dashboard/upcoming" />
            </Switch>
          </DashboardLayout>
        </Route>

        <Route path="*" component={NotFoundView} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

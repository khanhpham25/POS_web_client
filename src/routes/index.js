import React from 'react';
import { Route, Switch } from 'react-router-dom';

export default () => {
  <Router>
    <Application>
      <Switch>
        <AppliedRoute
          path="/"
          exact
          component={AsyncHome}
          props={childProps}
        />
        <UnauthenticatedRoute
          path="/login"
          exact
          component={AsyncLogin}
          props={childProps}
        />
        <UnauthenticatedRoute
          path="/signup"
          exact
          component={AsyncSignup}
          props={childProps}
        />
        <AuthenticatedRoute
          path="/notes/new"
          exact
          component={AsyncNewNote}
          props={childProps}
        />
        <AuthenticatedRoute
          path="/notes/:id"
          exact
          component={AsyncNotes}
          props={childProps}
        />
        {/* Finally, catch all unmatched routes */}
        <Route component={AsyncNotFound} />
      </Switch>
    </Application>
  </Router>
};

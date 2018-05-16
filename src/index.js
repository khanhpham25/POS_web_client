import 'config/global';
import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import 'assets/css/application.css';
import 'assets/js/application';
import indexRoutes from './routes';
import dashboardRoutes from './routes/dashboard';
import DashboardLayout from 'layouts/Dashboard';
import EmptyLayout from 'layouts/Empty';
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './Store';
import { Provider } from 'react-redux';
import PrivateRoute from 'routes/shared_components/private_route';
import { isAuthenticated } from 'helpers/is_authenticated';

const DashboardRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={matchProps => (
      isAuthenticated()
        ? <DashboardLayout>
          <Component {...matchProps} />
        </DashboardLayout>
        : <Redirect to={{
          pathname: '/login',
          state: { from: matchProps.location }
        }} />
    )} />
  )
};

const EmptyLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={matchProps => (
      <EmptyLayout>
        <Component {...matchProps} />
      </EmptyLayout>
    )} />
  )
};

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return <EmptyLayoutRoute path={prop.path} component={prop.component} key={'empty' + key} />;
        })}
        {dashboardRoutes.map((prop, key) => {
          return <DashboardRoute path={prop.path} exact={prop.exact || false} component={prop.component} key={'dash' + key} />;
        })}
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();

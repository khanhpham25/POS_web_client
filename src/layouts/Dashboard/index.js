import React, { Component, Fragment } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar';

import AppHeader from './Header';
import Sidebar from './Sidebar';
import AppFooter from './Footer';
import { Layout } from 'antd';

class DashboardLayout extends Component {
  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
  }
  componentDidUpdate() {
    //this.refs.mainPanel.scrollTop = 0;
  }

  render() {
    const childWithProps = (props) => {
      return (
        React.Children.map(this.props.children, (child) => {
          return React.cloneElement(child, props);
        })
      )
    };

    return (
      <Fragment>
        <Layout style={{ minHeight: '100vh' }}>
          <Sidebar />
          <Layout>
            <AppHeader />
            {childWithProps(this.props)}
            <AppFooter />
          </Layout>
        </Layout>
      </Fragment >
    );
  }
}

export default DashboardLayout;

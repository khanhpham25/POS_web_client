import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
// creates a beautiful scrollbar
import { Layout } from 'antd';

import AppHeader from './partials/Header';
import Sidebar from './partials/Sidebar';
import AppFooter from './partials/Footer';
import Loading from 'components/loading';

class DashboardLayout extends Component {
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
            <Loading loading={this.props.isShow} />
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

const mapStateToProps = state => {
  return {
    isShow: state.dashboardReducer.isShow
  };
};

export default connect(mapStateToProps)(DashboardLayout);

import React, { Component, Fragment } from 'react';

import { Layout } from 'antd';
const { Footer } = Layout;

class AppFooter extends Component {
  render() {
    return (
      <Footer style={{ textAlign: 'center' }}>
        Point of Sale System For Retailers ©2018
      </Footer>
    );
  }
}

export default AppFooter;

import React, { Component, Fragment } from 'react';

import { Layout } from 'antd';
const { Footer } = Layout;

class AppFooter extends Component {
  render() {
    return (
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2016 Created by Ant UED
      </Footer>
    );
  }
}

export default AppFooter;

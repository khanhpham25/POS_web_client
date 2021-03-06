import React, { Component } from 'react';
import { Tabs } from 'antd';
import InfoTab from './InfoTab';
// import InventoryCardTab from './InventoryCardTab';
// import InStockTab from './InStockTab';

const TabPane = Tabs.TabPane;

class CustomerDetail extends Component {
  render() {
    return (
      <div className='card-container'>
        <Tabs type='card'>
          <TabPane tab='Info' key='1'>
            <InfoTab {...this.props} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default CustomerDetail;

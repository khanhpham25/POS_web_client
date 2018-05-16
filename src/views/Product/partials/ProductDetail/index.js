import React, { Component } from 'react';
import { Tabs } from 'antd';
import InfoTab from './InfoTab';
import InventoryCardTab from './InventoryCardTab';
import InStockTab from './InStockTab';

const TabPane = Tabs.TabPane;

class ProductDetail extends Component {
  render() {
    const { product, categories } = this.props;

    return (
      <div className='card-container'>
        <Tabs type='card'>
          <TabPane tab='Info' key='1'>
            <InfoTab product={product} categories={categories} />
          </TabPane>
          <TabPane tab='Inventory Cards' key='2'>
            <InventoryCardTab />
          </TabPane>
          <TabPane tab='In Stock' key='3'>
            <InStockTab />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default ProductDetail;

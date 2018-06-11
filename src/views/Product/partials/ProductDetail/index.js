import React, { Component } from 'react';
import { Tabs } from 'antd';
import InfoTab from './InfoTab';
import InventoryCardTab from './InventoryCardTab';
import InStockTab from './InStockTab';

const TabPane = Tabs.TabPane;

class ProductDetail extends Component {
  render() {
    const { product, categories, updateProductStatus, deleteProduct } = this.props;

    return (
      <div className='card-container'>
        <Tabs type='card'>
          <TabPane tab='Info' key='1'>
            <InfoTab product={product} categories={categories}
              updateProductStatus={updateProductStatus} deleteProduct={deleteProduct} />
          </TabPane>
          <TabPane tab='Inventory Cards' key='2'>
            <InventoryCardTab />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default ProductDetail;

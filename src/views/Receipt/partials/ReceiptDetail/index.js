import React, { Component } from 'react';
import { Tabs } from 'antd';
import InfoTab from './InfoTab';

const TabPane = Tabs.TabPane;

class ReceiptDetail extends Component {
  render() {
    const { receipt, categories, updateProductStatus, deleteProduct, setSelectedTempInventNote } = this.props;

    return (
      <div className='card-container'>
        <Tabs type='card'>
          <TabPane tab='Info' key='1'>
            <InfoTab receipt={receipt} categories={categories} setSelectedTempInventNote={setSelectedTempInventNote}
              updateProductStatus={updateProductStatus} deleteProduct={deleteProduct} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default ReceiptDetail;

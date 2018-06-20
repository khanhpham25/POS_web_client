import React, { Component } from 'react';
import { Tabs } from 'antd';
import InfoTab from './InfoTab';

const TabPane = Tabs.TabPane;

class NoteDetail extends Component {
  render() {
    const { note, categories, updateProductStatus, deleteProduct } = this.props;

    return (
      <div className='card-container'>
        <Tabs type='card'>
          <TabPane tab='Info' key='1'>
            <InfoTab note={note} categories={categories}
              updateProductStatus={updateProductStatus} deleteProduct={deleteProduct} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default NoteDetail;

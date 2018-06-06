import React, { Component } from 'react';
import { List } from 'antd';

import ProductItem from './ProducItem';

class ProductList extends Component {
  render() {
    const { data, onQuantityChange, onRemoveItemFromList } = this.props;
    let source = [...data];

    return (
      <div>
        <List
          size='large'
          dataSource={source.reverse()}
          renderItem={item => (<List.Item><ProductItem data={item} onQuantityChange={onQuantityChange} onRemoveItemFromList={onRemoveItemFromList} /></List.Item>)}
        />
      </div>
    );
  }
}

export default ProductList;

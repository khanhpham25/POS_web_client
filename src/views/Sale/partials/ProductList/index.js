import React, { Component } from 'react';
import { List } from 'antd';

import ProductItem from './ProducItem';

class ProductList extends Component {
  render() {
    const { data, onQuantityChange } = this.props;
    let source = [...data];

    return (
      <div>
        <List
          size='large'
          dataSource={source.reverse()}
          renderItem={item => (<List.Item><ProductItem data={item} onQuantityChange={onQuantityChange} /></List.Item>)}
        />
      </div>
    );
  }
}

export default ProductList;

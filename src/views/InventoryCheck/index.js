import _ from 'lodash';
import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Col, AutoComplete, Input, Icon, Tabs, Button } from 'antd';

import {
  onSelectProduct, onQuantityChange, onRemoveItemFromList, onNoteInputChange, saveTemporarily,
  completeInventoryCheck
} from './actions';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ProductList from './partials/ProductList';
import ProductOption from './partials/ProductOption';
import InventoryForm from './partials/InventoryForm';

const { Content } = Layout;
const TabPane = Tabs.TabPane;
const Option = AutoComplete.Option;

class InventoryCheckContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
    };
  }

  onSelect = (value) => {
    const { onSelectProduct, products } = this.props;
    onSelectProduct(value, products);
  }

  renderOption = (item) => {
    return (
      <Option key={item.id} text={item.name}>
        <ProductOption data={item} />
      </Option>
    );
  }

  searchResult = (query) => {
    let searchQuery = _.words(query);
    let isNameIncluding;
    let foundQuery;
    let dataSource = [...this.props.products];
    searchQuery = [...new Set(searchQuery)];

    return dataSource.filter(data => {
      isNameIncluding = false;
      foundQuery = 0;

      searchQuery.forEach(value => {
        if (data.name.toLowerCase().includes(value.toLowerCase())) {
          foundQuery++;
        } else {
          return;
        }
      });

      if (foundQuery == searchQuery.length) isNameIncluding = true;

      return isNameIncluding;
    });
  }

  handleSearch = (value) => {
    this.setState({
      dataSource: value ? this.searchResult(value) : [],
    });
  }

  render() {
    const { data, onQuantityChange, onRemoveItemFromList, onNoteInputChange,
      saveTemporarily, completeInventoryCheck } = this.props;
    const { dataSource } = this.state;

    return (
      <Content style={{ margin: '0 16px' }}>
        <div style={{ padding: 24, background: '#f0f2f5', minHeight: 360 }}
          className='inventory-check-container' >
          <Row type='flex' gutter={32} className='receipt-container' >
            <Col md={17} xl={17} className='product-list'
              style={{ padding: 24, background: '#fff' }} >
              <Row type='flex' >
                <Col lg={24} >
                  <AutoComplete
                    allowClear={true}
                    className='global-search'
                    size='large'
                    dataSource={dataSource.map(this.renderOption)}
                    style={{ width: 500 }}
                    placeholder='Find product (F3)'
                    optionLabelProp='text'
                    onSelect={this.onSelect}
                    onSearch={this.handleSearch}
                  >
                    <Input id='auto-complete-product-invent'
                      suffix={(
                        <Button className='search-btn' size='large' type='primary'>
                          <Icon type='search' />
                        </Button>
                      )}
                    />
                  </AutoComplete>
                </Col>
              </Row>
              <Row type='flex' >
                <Col lg={24} >
                  <ProductList data={data.checkingProducts} onQuantityChange={onQuantityChange}
                    onRemoveItemFromList={onRemoveItemFromList} />
                </Col>
              </Row>
            </Col>
            <Col md={7} xl={7} className='inventory-form' style={{ padding: 24, background: '#fff' }} >
              <InventoryForm data={data} onNoteInputChange={onNoteInputChange}
                saveTemporarily={saveTemporarily} completeInventoryCheck={completeInventoryCheck} />
            </Col>
          </Row>
        </div>
      </Content>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    products: state.productReducer.products.length > 0 ? state.productReducer.products : JSON.parse(localStorage.products),
    data: state.inventoryCheckReducer.data,
  })
};

const mapDispatchToProps = dispatch => bindActionCreators({
  onSelectProduct,
  onQuantityChange,
  onRemoveItemFromList,
  onNoteInputChange,
  saveTemporarily,
  completeInventoryCheck
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(InventoryCheckContainer);

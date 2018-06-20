import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { Layout, Menu, Tabs, Button, AutoComplete, Input, Icon } from 'antd';
import Receipt from './partials/Receipt';
import ProductOption from './partials/ProductOption';
import swal from 'sweetalert';
import $ from 'jquery';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  onSelectProduct, onQuantityChange, onPaymentTypeChange, onReceiptInputChange,
  onSelectCustomer, onChangeTab, onAddNewTransaction, onRemoveTransaction,
  createReceipt, onCustomerInputChange, onRemoveItemFromList
} from './actions';

const TabPane = Tabs.TabPane;
const Option = AutoComplete.Option;
const { Header, Content, Footer } = Layout;

class SaleIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', function (event) {
      switch (event.which) {
        case 114:
          event.preventDefault();
          document.getElementById('auto-complete-product').focus();
          return;

        case 113:
          document.getElementById('new-transaction').click();
          return;

        case 115:
          document.getElementById('auto-complete-customer').focus();
          return;

        case 120:
          $('.checkout-btn:visible')[0].click();
          return;
      }
    });
  }

  onSelect = (value) => {
    const { onSelectProduct, products } = this.props;
    onSelectProduct(value, products);
  }

  onChange = (activeKey) => {
    this.props.onChangeTab(activeKey);
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  add = () => {
    this.props.onAddNewTransaction();
  }

  remove = (targetKey) => {
    const { panes, onRemoveTransaction } = this.props;

    panes.forEach(pane => {
      if (pane.key == targetKey) {
        if (pane.data.boughtProducts.length > 0) {
          swal({
            title: `Close Receipt ${pane.index}`,
            text: `The information of Receipt ${pane.index} will not be saved! Are you sure?`,
            icon: 'warning',
            buttons: true,
            dangerMode: true,
          }).then(willConfirm => {
            if (willConfirm) onRemoveTransaction(targetKey);
          });
        } else {
          onRemoveTransaction(targetKey);
        }
      }
      return;
    })
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
    const {
      panes, activeKey, onQuantityChange, customers, payment_methods, onCustomerInputChange,
      onPaymentTypeChange, onReceiptInputChange, onSelectCustomer, createReceipt,
      onRemoveItemFromList
    } = this.props;
    const { dataSource } = this.state;

    let tabPanes = null;

    tabPanes = panes.map(pane => {
      return (
        <TabPane tab={`Receipt ${pane.index}`} key={pane.key}>
          <Receipt customers={customers} data={pane.data} payment_methods={payment_methods}
            onQuantityChange={onQuantityChange} onPaymentTypeChange={onPaymentTypeChange}
            onReceiptInputChange={onReceiptInputChange} onSelectCustomer={onSelectCustomer}
            createReceipt={createReceipt} onCustomerInputChange={onCustomerInputChange}
            onRemoveItemFromList={onRemoveItemFromList}
          />
        </TabPane>
      );
    });

    return (
      <Fragment>
        <Layout style={{ minHeight: '100vh' }} className='sale-screen' >
          <Header>
            <div className='sale-header-menu' >
              <NavLink to='/' className='nav-text home-btn'>
                <Icon type='home' />
              </NavLink>
              <Button onClick={this.add} className='new-transaction-btn' id='new-transaction' >
                <Icon type='plus' />
                Transaction (F2)
              </Button>
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
                <Input id='auto-complete-product'
                  suffix={(
                    <Button className='search-btn' size='large' type='primary'>
                      <Icon type='search' />
                    </Button>
                  )}
                />
              </AutoComplete>
            </div>
          </Header>
          <Content>
            <div className='sale-container'
              style={{ background: '#fff', padding: 12 }}>
              <Tabs
                hideAdd
                onChange={this.onChange}
                activeKey={activeKey}
                type='editable-card'
                onEdit={this.onEdit}
              >
                {tabPanes}
              </Tabs>
            </div>
          </Content>
        </Layout>
      </Fragment >
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    products: state.productReducer.products.length > 0 ? state.productReducer.products : JSON.parse(localStorage.products),
    customers: JSON.parse(localStorage.customers),
    payment_methods: JSON.parse(localStorage.payment_methods),
    panes: state.saleReducer.panes,
    activeKey: state.saleReducer.activeKey,
  })
};

const mapDispatchToProps = dispatch => bindActionCreators({
  onSelectProduct,
  onQuantityChange,
  onPaymentTypeChange,
  onReceiptInputChange,
  onSelectCustomer,
  onAddNewTransaction,
  onRemoveTransaction,
  onChangeTab,
  createReceipt,
  onCustomerInputChange,
  onRemoveItemFromList
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(SaleIndex);

import React, { Component } from 'react';
import {
  Table, Icon, Button, Row, Col, Layout, Breadcrumb, Input, Menu, Dropdown,
} from 'antd';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  getProducts, onTableRowChange, handleSearchProduct, handleRowSelected,
  allowSellingProducts, stopSellingProducts, deleteProducts, updateProductStatus,
  deleteProduct, onImportOptionChange
} from '../../actions';
import ProductDetail from '../ProductDetail';
import ProductModal from '../ProductModal';
import ProductImportModal from '../ImportModal';
import swal from 'sweetalert';

const { Content } = Layout;

class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredInfo: null,
      sortedInfo: null,
      isProductModalVisible: false,
      isImportModalVisible: false
    }
  }

  componentDidMount() {
    this.props.getProducts();
  }

  onSelectChange = (selectedRowKeys) => {
    this.props.handleRowSelected(selectedRowKeys);
  }

  handleMenuClick = (e) => {
    const { allowSellingProducts, stopSellingProducts, deleteProducts, selectedRowKeys } = this.props;

    if (e.key == 'allow') {
      swal({
        title: `Confirmation`,
        text: `You want to continue selling these products?`,
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then(willConfirm => {
        if (willConfirm) allowSellingProducts(selectedRowKeys);
      });
    }
    else if (e.key == 'stop') {
      swal({
        title: `Confirmation`,
        text: `You want to stop selling these products?`,
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then(willConfirm => {
        if (willConfirm) stopSellingProducts(selectedRowKeys);
      });
    }
    else {
      swal({
        title: `Delete Products`,
        text: `Do you want to delete these products?`,
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then(willConfirm => {
        if (willConfirm) deleteProducts(selectedRowKeys);
      });
    }
  }

  render() {
    const {
      products, categories, expandedRowKeys, dataSource, selectedRowKeys,
      deleteProduct, updateProductStatus, getProducts, onImportOptionChange,
      updateStockCount
    } = this.props;
    const { isProductModalVisible, isImportModalVisible } = this.state;
    let { sortedInfo, filteredInfo } = this.state;
    let categoryFilters = [];
    let totalInStock = 0;

    categories.map(category => {
      categoryFilters.push({ text: category.name, value: category.name });
    });
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    products.map(product => { totalInStock += product.stock_count });
    const hasSelected = selectedRowKeys.length > 0;
    const expandedRowRender = record => <ProductDetail key={record.id}
      product={record} categories={categories} deleteProduct={deleteProduct}
      updateProductStatus={updateProductStatus} />;
    const title = () => (<span style={{ marginLeft: 8 }}>
      {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
    </span>);
    const showHeader = true;
    const footer = () => 'Total In Stock: ' + totalInStock;
    const rowKey = (record) => { return record.id };
    const scroll = { y: 480 };
    const pagination = {
      position: 'bottom', defaultPageSize: 10, showSizeChanger: true,
      pageSizeOptions: ['10', '20', '30', '40']
    };

    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key='allow'>Allow Selling</Menu.Item>
        <Menu.Item key='stop'>Stop Selling</Menu.Item>
        <Menu.Item key='delete'>Delete</Menu.Item>
      </Menu>
    );

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    const tableConfig = {
      rowKey,
      expandedRowKeys,
      bordered: false,
      loading: false,
      size: 'middle',
      expandedRowRender,
      expandRowByClick: true,
      title,
      showHeader,
      footer,
      rowSelection,
      scroll: undefined
    };

    const columns = [{
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      width: 200,
      sorter: true,
      render: (text, record) => (
        <span>{record.code}</span>
      ),
    }, {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        return 0;
      },
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
    }, {
      title: 'Category',
      dataIndex: 'category.name',
      key: 'category_name',
      filters: categoryFilters,
      filteredValue: filteredInfo.category_name || null,
      onFilter: (value, record) => record.category.name.includes(value),
    }, {
      title: 'Sale Price',
      dataIndex: 'sale_price',
      key: 'sale_price',
      sorter: (a, b) => a.sale_price - b.sale_price,
      sortOrder: sortedInfo.columnKey === 'sale_price' && sortedInfo.order,

    }, {
      title: 'Initial Cost',
      dataIndex: 'initial_cost',
      key: 'initial_cost',
      sorter: (a, b) => a.initial_cost - b.initial_cost,
      sortOrder: sortedInfo.columnKey === 'initial_cost' && sortedInfo.order,

    }, {
      title: 'In Stock',
      dataIndex: 'stock_count',
      key: 'stock_count',
      sorter: (a, b) => a.stock_count - b.stock_count,
      sortOrder: sortedInfo.columnKey === 'stock_count' && sortedInfo.order,
    }];

    let multiSelectAction;
    if (hasSelected) {
      multiSelectAction = (<Dropdown overlay={menu}>
        <Button>
          Actions <Icon type='down' />
        </Button>
      </Dropdown>);
    }

    return (
      <div>
        <Row type='flex' justify='end'>
          <Col lg={12} >
            <Row type='flex' justify='start' gutter={16} >
              <Col lg={8} >
                <Input className='product-search' placeholder='Search by name, product code'
                  onChange={this.handleProductSearch.bind(this)}
                  suffix={(<Icon type='search' />)}
                />
              </Col>
              <Col lg={6} >
                {multiSelectAction}
              </Col>
            </Row>
          </Col>
          <Col lg={12} >
            <Row type='flex' justify='end' gutter={16}>
              <Col>
                <Button type='primary' onClick={this.showProductModal.bind(this)} >
                  <Icon type='plus' /> New Product
                </Button>
              </Col>
              <Col>
                <Button type='default' onClick={this.showImportModal.bind(this)} ><Icon type='login' /> Import</Button>
              </Col>
              <Col>
                <Button type='default' ><Icon type='logout' /> Export</Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Table {...tableConfig} columns={columns} dataSource={dataSource}
          onExpand={this.onTableRowExpand.bind(this)}
          onChange={this.handleChange.bind(this)} />

        <ProductModal title='Create Product' action='create'
          product={{ name: '', category: { id: '' }, initial_cost: 0, sale_price: 0, stock_count: 0 }}
          categories={categories}
          visible={isProductModalVisible}
          onClose={this.hideProductModal.bind(this)} />

        <ProductImportModal visible={isImportModalVisible}
          updateStockCount={updateStockCount}
          getProducts={getProducts} onImportOptionChange={onImportOptionChange}
          onClose={this.hideImportModal.bind(this)} />
      </div>
    );
  }

  onTableRowExpand(expanded, record) {
    var keys = [];
    if (expanded) {
      keys.push(record.id);
    }

    this.props.onTableRowChange(keys);
  }

  handleChange(pagination, filters, sorter) {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  }

  showProductModal(event) {
    //show product thi gui request lay du lieu product de edit ve
    this.setState({
      isProductModalVisible: true,
    });
  }

  showImportModal(event) {
    this.setState({
      isImportModalVisible: true,
    });
  }

  hideProductModal(event) {
    this.setState({
      isProductModalVisible: false,
    });
  }

  hideImportModal(event) {
    this.setState({
      isImportModalVisible: false,
    });
  }

  handleProductSearch(event) {
    this.props.handleSearchProduct(event.target.value);
  }
}

const mapStateToProps = (state) => ({
  errors: state.productReducer.errors,
  products: state.productReducer.products,
  categories: state.productReducer.categories,
  expandedRowKeys: state.productReducer.expandedRowKeys,
  dataSource: state.productReducer.dataSource,
  selectedRowKeys: state.productReducer.selectedRowKeys,
  updateStockCount: state.productReducer.updateStockCount
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getProducts,
  onTableRowChange,
  handleSearchProduct,
  handleRowSelected,
  deleteProducts,
  stopSellingProducts,
  allowSellingProducts,
  updateProductStatus,
  deleteProduct,
  onImportOptionChange
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);

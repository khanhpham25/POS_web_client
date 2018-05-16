import React, { Component } from 'react';
import { Table, Icon, Button, Row, Col } from 'antd';
import { Layout, Breadcrumb } from 'antd';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getProducts, onTableRowChange } from '../../actions';
import ProductDetail from '../ProductDetail';

import ProductModal from '../ProductModal';

const { Content } = Layout;

class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredInfo: null,
      sortedInfo: null,
      isProductModalVisible: false
    }
  }

  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const { products, categories, expandedRowKeys } = this.props;
    const { isProductModalVisible } = this.state;
    let { sortedInfo, filteredInfo } = this.state;
    let categoryFilters = [];
    let totalInStock = 0;

    categories.map(category => {
      categoryFilters.push({ text: category.name, value: category.name });
    });
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    products.map(product => { totalInStock += product.stock_count });

    const expandedRowRender = record => <ProductDetail key={record.id}
      product={record} categories={categories} />;
    const title = () => 'Product List';
    const showHeader = true;
    const footer = () => 'Total In Stock: ' + totalInStock;
    const rowKey = (record) => { return record.id };
    const scroll = { y: 480 };
    const pagination = {
      position: 'bottom', defaultPageSize: 10, showSizeChanger: true,
      pageSizeOptions: ['10', '20', '30', '40']
    };

    const tableConfig = {
      rowKey,
      expandedRowKeys,
      bordered: false,
      loading: false,
      pagination,
      size: 'middle',
      expandedRowRender,
      expandRowByClick: true,
      title,
      showHeader,
      footer,
      rowSelection: {},
      scroll: undefined
    };

    const columns = [{
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      width: 200,
      sorter: true,
      render: (text, record) => (
        <span>{`TBDC${10000 + record.id}`}</span>
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

    return (
      <div>
        <Row type='flex' justify='end' gutter={16}>
          <Col>
            <Button type='primary' onClick={this.showProductModal.bind(this)} >
              <Icon type='plus' /> New Product
            </Button>
          </Col>
          <Col>
            <Button type='default' ><Icon type='login' /> Import</Button>
          </Col>
          <Col>
            <Button type='default' ><Icon type='logout' /> Export</Button>
          </Col>
        </Row>
        <Table {...tableConfig} columns={columns} dataSource={products}
          onExpand={this.onTableRowExpand.bind(this)}
          onChange={this.handleChange.bind(this)} />

        <ProductModal title='Create Product' action='create'
          product={{ name: '', category: { id: '' }, initial_cost: 0, sale_price: 0, stock_count: 0 }}
          categories={categories}
          visible={isProductModalVisible}
          onClose={this.hideProductModal.bind(this)} />
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

  hideProductModal(event) {
    this.setState({
      isProductModalVisible: false,
    });
  }
}

const mapStateToProps = (state) => ({
  errors: state.productReducer.errors,
  products: state.productReducer.products,
  categories: state.productReducer.categories,
  expandedRowKeys: state.productReducer.expandedRowKeys
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getProducts,
  onTableRowChange
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);

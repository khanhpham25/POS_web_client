import React, { Component } from 'react';
import { Table, Icon, Button, Row, Col, Layout, Breadcrumb, Input, Menu, Dropdown } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import swal from 'sweetalert';

import {
  getCustomers, onTableRowChange, handleSearchCustomer, handleRowSelected, deleteCustomers
} from '../../actions';
import CustomerDetail from '../CustomerDetail';
import CustomerModal from '../CustomerModal';

const { Content } = Layout;

class CustomerList extends Component {
  constructor() {
    super();

    this.state = {
      filteredInfo: null,
      sortedInfo: null,
      isCustomerModalVisible: false
    };
  }

  componentDidMount() {
    this.props.getCustomers();
  }

  onSelectChange = (selectedRowKeys) => {
    this.props.handleRowSelected(selectedRowKeys);
  }

  handleMenuClick = (e) => {
    const { deleteCustomers, selectedRowKeys } = this.props;

    swal({
      title: `Delete customers`,
      text: `Do you want to delete these customers?`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(willConfirm => {
      if (willConfirm) deleteCustomers(selectedRowKeys);
    });
  }

  render() {
    const { customers, customerTypes, expandedRowKeys,
      dataSource, selectedRowKeys } = this.props;
    let { sortedInfo, filteredInfo, isCustomerModalVisible } = this.state;

    let customerTypeFilters = [];

    customerTypes.map(cusType => {
      customerTypeFilters.push({ text: cusType.name, value: cusType.name });
    });
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    const hasSelected = selectedRowKeys.length > 0;
    const expandedRowRender = record => <CustomerDetail key={record.id}
      customer={record} customerTypes={customerTypes} />;
    const title = () => (<span style={{ marginLeft: 8 }}>
      {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
    </span>);
    const showHeader = true;
    const rowKey = (record) => { return record.id };
    const scroll = { y: 480 };
    const pagination = {
      position: 'bottom', defaultPageSize: 10, showSizeChanger: true,
      pageSizeOptions: ['10', '20', '30', '40']
    };

    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key='delete'>Delete</Menu.Item>
      </Menu>
    );

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
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
      rowSelection,
      scroll: undefined
    };

    const columns = [{
      title: 'Customer Code',
      dataIndex: 'code',
      key: 'code',
      render: (text, record) => (
        record.code && record.code !== 'null' ? record.code : <span>{`TBDC${10000 + record.id}`}</span>
      )
    }, {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        return 0;
      },
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order
    }, {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone'
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    }, {
      title: 'Customer Type',
      dataIndex: 'customer_type.name',
      key: 'customer_type',
      filters: customerTypeFilters,
      filteredValue: filteredInfo.customer_type || null,
      onFilter: (value, record) => record.customer_type.name.includes(value)
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
          <Col lg={12}>
            <Row type='flex' justify='start' gutter={16}>
              <Col lg={8} >
                <Input className='customer-search' placeholder='Search by name, customer code'
                  onChange={this.handleCustomerSearch.bind(this)}
                  suffix={(<Icon type='search' />)}
                />
              </Col>
              <Col lg={6} >
                {multiSelectAction}
              </Col>
            </Row>
          </Col>
          <Col lg={12}>
            <Row type='flex' justify='end' gutter={16}>
              <Col>
                <Button type='primary' onClick={this.showCustomerModal.bind(this)} >
                  <Icon type='plus' /> New customer
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>

        <Table {...tableConfig} columns={columns} dataSource={dataSource}
          onExpand={this.onTableRowExpand.bind(this)}
          onChange={this.handleChange.bind(this)}
        />

        <CustomerModal title='Create customer' action='create'
          customer={{ name: '', customer_type: { id: '' } }}
          customerTypes={customerTypes}
          visible={isCustomerModalVisible}
          onClose={this.hideCustomerModal.bind(this)} />
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
      sortedInfo: sorter
    });
  }

  showCustomerModal(event) {
    this.setState({
      isCustomerModalVisible: true,
    });
  }

  hideCustomerModal(event) {
    this.setState({
      isCustomerModalVisible: false,
    });
  }

  handleCustomerSearch(event) {
    this.props.handleSearchCustomer(event.target.value);
  }
}

const mapStateToProps = state => {
  return {
    errors: state.customerReducer.errors,
    customers: state.customerReducer.customers,
    customerTypes: state.customerReducer.customerTypes,
    expandedRowKeys: state.customerReducer.expandedRowKeys,
    dataSource: state.customerReducer.dataSource,
    selectedRowKeys: state.customerReducer.selectedRowKeys
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getCustomers, onTableRowChange, handleSearchCustomer, handleRowSelected,
  deleteCustomers
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerList);

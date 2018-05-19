import React, { Component } from 'react';
import { Table, Icon, Switch, Radio, Form, Divider } from 'antd';
import { Layout, Breadcrumb } from 'antd';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getCustomers } from '../../actions';
import CustomerDetail from '../CustomerDetail';

const { Content } = Layout;
const FormItem = Form.Item;

class CustomerList extends Component {
  constructor() {
    super();

    this.state = {
      expandedRowKeys: [],
      filteredInfo: null,
      sortedInfo: null
    };
  }

  componentDidMount() {
    this.props.getCustomers();
  }

  render() {
    const { customers, customerTypes } = this.props;
    const { expandedRowKeys } = this.state;
    let { sortedInfo, filteredInfo } = this.state;

    let customerTypeFilters = [];

    customerTypes.map(cusType => {
      customerTypeFilters.push({ text: cusType.name, value: cusType.name });
    });
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    const expandedRowRender = record => <CustomerDetail key={record.id}
      customer={record} customerTypes={customerTypes} />;
    const title = () => 'Customer List';
    const showHeader = true;
    const footer = () => 'Here is footer';
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
      title: 'Id',
      dataIndex: 'id',
      key: 'id'
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
      title: 'Customer Code',
      dataIndex: 'code',
      key: 'code',
      render: (text, record) => (
        record.code && record.code !== 'null' ? record.code : <span>{`TBDC${10000 + record.id}`}</span>
      )
    }, {
      title: 'Customer Type',
      dataIndex: 'customer_type.name',
      key: 'customer_type',
      filters: customerTypeFilters,
      filteredValue: filteredInfo.customer_type || null,
      onFilter: (value, record) => record.customer_type.name.includes(value)
    }];

    return (
      <div>
        <Table {...tableConfig} columns={columns} dataSource={customers}
          onExpand={this.onTableRowExpand.bind(this)}
          onChange={this.handleChange.bind(this)}
        />
      </div>
    );
  }

  onTableRowExpand(expanded, record) {
    var keys = [];
    if (expanded) {
      keys.push(record.id);
    }

    this.setState({ expandedRowKeys: keys });
  }

  handleChange(pagination, filters, sorter) {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  }
}

const mapStateToProps = state => {
  return {
    errors: state.customerReducer.errors,
    customers: state.customerReducer.customers,
    customerTypes: state.customerReducer.customerTypes
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getCustomers
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerList);

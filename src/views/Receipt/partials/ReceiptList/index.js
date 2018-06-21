import React, { Component } from 'react';
import {
  Table, Icon, Button, Row, Col, Layout, Breadcrumb, Input, Menu, Dropdown,
} from 'antd';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  getReceipts, handleSearchReceipt, onReceiptTableRowChange
} from '../../actions';
import { setSelectedTempInventNote } from 'views/InventoryCheck/actions';

import ReceiptDetail from '../ReceiptDetail';
import swal from 'sweetalert';
import moment from 'moment';

const { Content } = Layout;

class ReceiptList extends Component {
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
    this.props.getReceipts();
  }

  render() {
    const {
      receipts, expandedRowKeys, dataSource, setSelectedTempInventNote
    } = this.props;
    const { isProductModalVisible, isImportModalVisible } = this.state;
    let { sortedInfo, filteredInfo } = this.state;

    const expandedRowRender = record => <ReceiptDetail key={record.id} setSelectedTempInventNote={setSelectedTempInventNote}
      receipt={record} />;
    const showHeader = true;
    const rowKey = (record) => { return record.id };
    const scroll = { y: 480 };
    const pagination = {
      position: 'bottom', defaultPageSize: 10, showSizeChanger: true,
      pageSizeOptions: ['10', '20', '30', '40']
    };
    sortedInfo = sortedInfo || {};

    const tableConfig = {
      rowKey,
      expandedRowKeys,
      bordered: false,
      loading: false,
      size: 'middle',
      expandedRowRender,
      expandRowByClick: true,
      showHeader,
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
      title: 'Date Time',
      dataIndex: 'date_time',
      key: 'date_time',
      sorter: (a, b) => a.inventory_date - b.inventory_date,
      sortOrder: sortedInfo.columnKey === 'date_time' && sortedInfo.order,
      render: (text, record) => (
        <span>{record.date_time ? moment(record.date_time).format('MM-DD-YYYY HH:mm') : ''}</span>
      )
    }, {
      title: 'Customer',
      dataIndex: 'customer.name',
      key: 'customer_name',
      sorter: (a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        return 0;
      },
      sortOrder: sortedInfo.columnKey === 'customer_name' && sortedInfo.order,
      render: (text, record) => (
        <span>{record.customer ? record.customer.name : 'Free individual'}</span>
      )
    }, {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (text, record) => {
        let total = 0;
        record.receipt_details.map(rec => {
          total += (rec.unit_price * rec.quantity);
        })

        return (< span > {total}</span >);

      }
    }, {
      title: 'Customer Payment',
      dataIndex: 'customer_payment',
      key: 'customer_payment',
      sorter: (a, b) => a.customer_payment - b.customer_payment,
      sortOrder: sortedInfo.columnKey === 'customer_payment' && sortedInfo.order,

      render: (text, record) => (
        <span>{record.customer_payment}</span>
      ),
    }];

    return (
      <div className='receipt-list' >
        <Row type='flex' justify='end'>
          <Col lg={12} >
            <Row type='flex' justify='start' gutter={16} >
              <Col lg={8} >
                <Input className='receipt-search' placeholder='Search by receipt code'
                  onChange={this.handleReceiptSearch.bind(this)}
                  suffix={(<Icon type='search' />)}
                />
              </Col>
            </Row>
          </Col>
          <Col lg={12} >
          </Col>
        </Row>
        <Table {...tableConfig} columns={columns} dataSource={dataSource}
          onExpand={this.onTableRowExpand.bind(this)}
          onChange={this.handleChange.bind(this)} />
      </div>
    );
  }

  onTableRowExpand(expanded, record) {
    var keys = [];
    if (expanded) {
      keys.push(record.id);
    }

    this.props.onReceiptTableRowChange(keys);
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

  handleReceiptSearch(event) {
    this.props.handleSearchReceipt(event.target.value);
  }
}

const mapStateToProps = (state) => ({
  errors: state.receiptReducer.errors,
  receipts: state.receiptReducer.receipts,
  expandedRowKeys: state.receiptReducer.expandedRowKeys,
  dataSource: state.receiptReducer.dataSource,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getReceipts,
  handleSearchReceipt,
  onReceiptTableRowChange
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReceiptList);

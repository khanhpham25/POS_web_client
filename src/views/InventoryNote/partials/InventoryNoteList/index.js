import React, { Component } from 'react';
import {
  Table, Icon, Button, Row, Col, Layout, Breadcrumb, Input, Menu, Dropdown,
} from 'antd';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  getInventoryNotes, onInventTableRowChange, handleSearchInventNote
} from '../../actions';
import { setSelectedTempInventNote } from 'views/InventoryCheck/actions';

import NoteDetail from '../NoteDetail';
import swal from 'sweetalert';
import moment from 'moment';

const { Content } = Layout;

class InventoryNoteList extends Component {
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
    this.props.getInventoryNotes();
  }

  onSelectChange = (selectedRowKeys) => {
    this.props.handleRowSelected(selectedRowKeys);
  }

  render() {
    const {
      inventoryNotes, expandedRowKeys, dataSource, setSelectedTempInventNote
    } = this.props;
    const { isProductModalVisible, isImportModalVisible } = this.state;
    let { sortedInfo, filteredInfo } = this.state;

    const expandedRowRender = record => <NoteDetail key={record.id} setSelectedTempInventNote={setSelectedTempInventNote}
      note={record} />;
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
      title: 'Inventory Date',
      dataIndex: 'inventory_date',
      key: 'inventory_date',
      sorter: (a, b) => a.inventory_date - b.inventory_date,
      sortOrder: sortedInfo.columnKey === 'inventory_date' && sortedInfo.order,
      render: (text, record) => (
        <span>{record.inventory_date ? moment(record.inventory_date).format('MM-DD-YYYY HH:mm') : ''}</span>
      )
    }, {
      title: 'Balance Date',
      dataIndex: 'balance_date',
      key: 'balance_date',
      sorter: (a, b) => a.balance_date - b.balance_date,
      sortOrder: sortedInfo.columnKey === 'balance_date' && sortedInfo.order,
      render: (text, record) => (
        <span>{record.balance_date ? moment(record.balance_date).format('MM-DD-YYYY HH:mm') : ''}</span>
      )
    }, {
      title: 'Note',
      dataIndex: 'note',
      key: 'note'
    }, {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => a.status - b.status,
      render: (text, record) => (
        <span>{record.status == '1' ? 'Inventory Balanced' : 'Temporary Note'}</span>
      ),
    }];

    return (
      <div className='inventory-note-list' >
        <Row type='flex' justify='end'>
          <Col lg={12} >
            <Row type='flex' justify='start' gutter={16} >
              <Col lg={8} >
                <Input className='invent-note-search' placeholder='Search by note code'
                  onChange={this.handleInventNoteSearch.bind(this)}
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

    this.props.onInventTableRowChange(keys);
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

  handleInventNoteSearch(event) {
    this.props.handleSearchInventNote(event.target.value);
  }
}

const mapStateToProps = (state) => ({
  errors: state.inventoryNoteReducer.errors,
  inventoryNotes: state.inventoryNoteReducer.inventoryNotes,
  expandedRowKeys: state.inventoryNoteReducer.expandedRowKeys,
  dataSource: state.inventoryNoteReducer.dataSource,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getInventoryNotes,
  onInventTableRowChange,
  handleSearchInventNote,
  setSelectedTempInventNote
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryNoteList);

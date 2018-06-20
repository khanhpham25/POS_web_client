import React, { Component } from 'react';
import {
  Table, Icon, Button, Row, Col, Layout, Breadcrumb, Input, Menu, Dropdown,
} from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import swal from 'sweetalert';

import {
  getProviders, onTableRowChange, handleSearchProvider, handleRowSelected,
  deleteProviders
} from '../../actions';
import ProviderDetail from '../ProviderDetail';
import ProviderModal from '../ProviderModal';

const { Content } = Layout;

class ProviderList extends Component {
  constructor() {
    super();

    this.state = {
      filteredInfo: null,
      sortedInfo: null,
      isProviderModalVisible: false
    };
  }

  componentDidMount() {
    this.props.getProviders();
  }

  onSelectChange = (selectedRowKeys) => {
    this.props.handleRowSelected(selectedRowKeys);
  }

  handleMenuClick = (e) => {
    const { deleteProviders, selectedRowKeys } = this.props;

    swal({
      title: `Delete providers`,
      text: `Do you want to delete these providers?`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(willConfirm => {
      if (willConfirm) deleteProviders(selectedRowKeys);
    });
  }

  render() {
    const { providers, expandedRowKeys, dataSource, selectedRowKeys } = this.props;
    let { sortedInfo, filteredInfo, isProviderModalVisible } = this.state;

    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    const hasSelected = selectedRowKeys.length > 0;
    const expandedRowRender = record => <ProviderDetail key={record.id}
      provider={record} />;
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
      title: 'Provider Code',
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
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    }, {
      title: 'Tax code',
      dataIndex: 'tax_code',
      key: 'tax_code'
    }];

    let multiSelectAction;
    if (hasSelected) {
      multiSelectAction = (
        <Dropdown overlay={menu}>
          <Button>
            Actions <Icon type='down' />
          </Button>
        </Dropdown>
      );
    }

    return (
      <div>
        <Row type='flex' justify='end'>
          <Col lg={12} >
            <Row type='flex' justify='start' gutter={16} >
              <Col lg={8} >
                <Input className='provider-search' placeholder='Search by name, provider code'
                  onChange={this.handleProviderSearch.bind(this)}
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
                <Button type='primary' onClick={this.showProviderModal.bind(this)} >
                  <Icon type='plus' /> New provider
                </Button>
              </Col>
              <Col>
                <Button type='default' ><Icon type='login' /> Import</Button>
              </Col>
              <Col>
                <Button type='default' ><Icon type='logout' /> Export</Button>
              </Col>
            </Row>
          </Col>
        </Row>

        <Table {...tableConfig} columns={columns} dataSource={dataSource}
          onExpand={this.onTableRowExpand.bind(this)}
          onChange={this.handleChange.bind(this)}
        />

        <ProviderModal title='Create provider' action='create'
          provider={{ name: '', code: '', phone: '', email: '', address: '', tax_code: '', note: '' }}
          visible={isProviderModalVisible}
          onClose={this.hideProviderModal.bind(this)} />
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

  showProviderModal(event) {
    this.setState({
      isProviderModalVisible: true,
    });
  }

  hideProviderModal(event) {
    this.setState({
      isProviderModalVisible: false,
    });
  }

  handleProviderSearch(event) {
    this.props.handleSearchProvider(event.target.value);
  }
}

const mapStateToProps = state => {
  return {
    errors: state.providerReducer.errors,
    providers: state.providerReducer.providers,
    expandedRowKeys: state.providerReducer.expandedRowKeys,
    dataSource: state.providerReducer.dataSource,
    selectedRowKeys: state.providerReducer.selectedRowKeys
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getProviders, onTableRowChange, handleSearchProvider, handleRowSelected,
  deleteProviders
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProviderList);

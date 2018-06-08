import React, { Component } from 'react';
import { Table, Icon, Button, Row, Col } from 'antd';
import { Layout, Breadcrumb } from 'antd';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getProviders, onTableRowChange } from '../../actions';
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

  render() {
    const { providers, expandedRowKeys } = this.props;
    let { sortedInfo, filteredInfo, isProviderModalVisible } = this.state;

    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    const expandedRowRender = record => <ProviderDetail key={record.id}
      provider={record} />;
    const title = () => 'Provider List';
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
      title: 'Provider Code',
      dataIndex: 'code',
      key: 'code',
      render: (text, record) => (
        record.code && record.code !== 'null' ? record.code : <span>{`TBDC${10000 + record.id}`}</span>
      )
    }, {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
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

    return (
      <div>
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

        <Table {...tableConfig} columns={columns} dataSource={providers}
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
}

const mapStateToProps = state => {
  return {
    errors: state.providerReducer.errors,
    providers: state.providerReducer.providers,
    expandedRowKeys: state.providerReducer.expandedRowKeys
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getProviders, onTableRowChange
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProviderList);

import React, { Component } from 'react';
import {
  Table, Icon, Button, Row, Col, Layout, Breadcrumb, Input, Menu, Dropdown,
} from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import swal from 'sweetalert';

import {
  getUsers, onTableRowChange, handleSearchUser, handleRowSelected,
  deleteUsers
} from '../../actions';
import UserDetail from '../UserDetail';
import UserModal from '../UserModal';

const { Content } = Layout;

class UserList extends Component {
  constructor() {
    super();

    this.state = {
      filteredInfo: null,
      sortedInfo: null,
      isUserModalVisible: false
    };
  }

  componentDidMount() {
    this.props.getUsers();
  }

  onSelectChange = (selectedRowKeys) => {
    this.props.handleRowSelected(selectedRowKeys);
  }

  handleMenuClick = (e) => {
    const { deleteUsers, selectedRowKeys } = this.props;

    swal({
      title: `Delete users`,
      text: `Do you want to delete these users?`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(willConfirm => {
      if (willConfirm) deleteUsers(selectedRowKeys);
    });
  }

  render() {
    const { users, expandedRowKeys, dataSource, selectedRowKeys, roles } = this.props;
    let { sortedInfo, filteredInfo, isUserModalVisible } = this.state;

    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    let roleFilters = [];

    roles.map(role => {
      roleFilters.push({ text: role.name, value: role.name });
    });

    const hasSelected = selectedRowKeys.length > 0;
    const expandedRowRender = record => <UserDetail key={record.id}
      user={record} roles={roles} />;
    const title = () => (<span style={{ marginLeft: 8 }}>
      {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
    </span>);
    const showHeader = true;
    const footer = () => 'Here is footer';
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
      footer,
      rowSelection,
      scroll: undefined
    };

    const columns = [{
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
      title: 'Role',
      dataIndex: 'role.name',
      key: 'role',
      filters: roleFilters,
      filteredValue: filteredInfo.role || null,
      onFilter: (value, record) => record.role.name.includes(value)
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    }, {
      title: 'Status',
      dataIndex: 'status',
      key: 'status'
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
                <Input className='user-search' placeholder='Search by name, user code'
                  onChange={this.handleUserSearch.bind(this)}
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
                <Button type='primary' onClick={this.showUserModal.bind(this)} >
                  <Icon type='plus' /> New user
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>

        <Table {...tableConfig} columns={columns} dataSource={dataSource}
          onExpand={this.onTableRowExpand.bind(this)}
          onChange={this.handleChange.bind(this)}
        />

        <UserModal title='Create user' action='create'
          user={{ name: '', email: '', phone: '', address: '', status: '', role: { id: '' } }}
          roles={roles}
          visible={isUserModalVisible}
          onClose={this.hideUserModal.bind(this)} />
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

  showUserModal(event) {
    this.setState({
      isUserModalVisible: true,
    });
  }

  hideUserModal(event) {
    this.setState({
      isUserModalVisible: false,
    });
  }

  handleUserSearch(event) {
    this.props.handleSearchUser(event.target.value);
  }
}

const mapStateToProps = state => {
  return {
    errors: state.userReducer.errors,
    users: state.userReducer.users,
    roles: state.userReducer.roles,
    expandedRowKeys: state.userReducer.expandedRowKeys,
    dataSource: state.userReducer.dataSource,
    selectedRowKeys: state.userReducer.selectedRowKeys
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getUsers, onTableRowChange, handleSearchUser, handleRowSelected,
  deleteUsers
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);

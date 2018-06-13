import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { Form, Divider, Button, Icon } from 'antd';

import { deleteUser } from '../../actions';
import UserModal from '../UserModal';

import userImg from 'assets/img/24.png';

const FormItem = Form.Item;

class InfoTab extends Component {
  constructor() {
    super();

    this.state = {
      isUserModalVisible: false
    };
  }

  render() {
    const { user } = this.props;
    const { isUserModalVisible } = this.state;

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 }
    };

    return (
      <div>
        <h2>{user.name}</h2>
        <Row type='flex' gutter={16}>
          <Col lg={8} md={8}>
            <img src={userImg} />
          </Col>
          <Col lg={8} md={8}>
            <Form layout='vertical'>
              <FormItem label='Name:' {...formItemLayout}>
                <strong>{`${user.name}`}</strong>
              </FormItem>

              <FormItem label='Phone:' {...formItemLayout}>
                {user.phone}
              </FormItem>

              <FormItem label='Email:' {...formItemLayout}>
                {user.email}
              </FormItem>

              <FormItem label='Address:' {...formItemLayout}>
                {user.adress}
              </FormItem>

              <FormItem label='Status:' {...formItemLayout}>
                {user.status}
              </FormItem>

              <FormItem label='Role:' {...formItemLayout}>
                {user.role_id}
              </FormItem>
            </Form>
          </Col>
        </Row>

        <Row type='flex' justify='end' gutter={16}>
          <Col lg={2} md={2}>
            <Button type='primary' onClick={this.showUserModal.bind(this)}>
              <Icon type='edit' />
              Update Info
            </Button>
          </Col>
          <Col lg={2} md={2}>
            <Button type='danger' onClick={this.handleDeleteUser.bind(this, user.id)}>
              <Icon type='delete' />
              Delete
            </Button>
          </Col>
        </Row>

        <UserModal title='Update user info'
          user={user}
          visible={isUserModalVisible}
          onClose={this.hideUserModal.bind(this)} />
      </div>
    );
  }

  handleDeleteUser(user_id, event) {
    if (window.confirm('Are you sure ?')) {
      this.props.deleteUser(user_id);
    }
  }

  showUserModal(event) {
    this.setState({
      isUserModalVisible: true
    });
  }

  hideUserModal(event) {
    this.setState({
      isUserModalVisible: false
    });
  }
}

export default connect(null, { deleteUser })(InfoTab);

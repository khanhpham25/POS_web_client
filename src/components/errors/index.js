import React, { Component } from 'react';
import { Row, Col } from 'antd';

export default class Errors extends Component {
  constructor() {
    super();
    this.state = {
      isShow: true
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ isShow: true });
    } else {
      this.setState({ isShow: false });
    }
  }

  render() {
    return (
      <div>
        {this.state.isShow ? this.renderErrors() : null}
      </div>
    );
  }

  renderErrors() {
    if (!this.props.errors) {
      return null;
    }
    return (
      <div className='alert alert-danger'>
        <Row type='flex'>
          <Col lg={20} pull={9}>
            <h4><i className='icon fa fa-ban'></i> Error</h4>
          </Col>
          <Col lg={4} push={1}>
            <button type='button' className='alert-close'
              onClick={this.handleHideAlert.bind(this)}>×</button>
          </Col>
        </Row>
        <Row >
          <Col lg={24}>
            {
              this.props.errors.map((error, index) => {
                return (
                  <p key={index}>{error}</p>
                );
              })
            }
          </Col>
        </Row>
      </div>
    );
  }

  handleHideAlert() {
    this.setState({ isShow: false });
  }
}

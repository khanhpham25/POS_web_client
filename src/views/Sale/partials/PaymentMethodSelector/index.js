import React, { Component } from 'react';
import { Row, Col, Radio } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class PaymentMethodSelector extends Component {

  onChange = (event) => {
    const { onPaymentTypeChange, data } = this.props;

    let index = data.findIndex(type => type.id == event.target.value);

    onPaymentTypeChange(data[index]);
  }

  render() {
    const { data, currentPaymentType } = this.props;

    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
      marginBottom: '5px'
    };

    let radioButtons = null;

    radioButtons = data.map((payment, index) => {
      return <RadioButton style={radioStyle} value={payment.id} key={index} >{payment.name}</RadioButton>
    })

    return (
      <Row type='flex' gutter={8} justify='center' >
        <Col lg={12} >
          <RadioGroup onChange={this.onChange} value={currentPaymentType.id || data[0].id} >
            {radioButtons}
          </RadioGroup>
        </Col>
      </Row>
    );
  }
}

export default PaymentMethodSelector;

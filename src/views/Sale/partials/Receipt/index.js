import React, { Component } from 'react';
import { Row, Col } from 'antd';
import ProductList from '../ProductList';
import ReceiptForm from '../ReceiptForm';

class Receipt extends Component {
  render() {
    const {
      data, customers, onQuantityChange, payment_methods, onPaymentTypeChange,
      onReceiptInputChange, onSelectCustomer, createReceipt, onCustomerInputChange,
      onRemoveItemFromList
    } = this.props;

    return (
      <div>
        <Row type='flex' gutter={32} className='receipt-container' >
          <Col md={17} xl={17} className='product-list' >
            <ProductList data={data.boughtProducts}
              onQuantityChange={onQuantityChange} onRemoveItemFromList={onRemoveItemFromList} />
          </Col>
          <Col md={7} xl={7} className='receipt-form' >
            <ReceiptForm data={data} customers={customers} payment_methods={payment_methods}
              onPaymentTypeChange={onPaymentTypeChange} onReceiptInputChange={onReceiptInputChange}
              onSelectCustomer={onSelectCustomer} createReceipt={createReceipt}
              onCustomerInputChange={onCustomerInputChange} />
          </Col>
        </Row>
      </div >
    );
  }
}

export default Receipt;

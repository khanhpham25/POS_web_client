import * as constants from '../constants';
import axios from 'axios';
import moment from 'moment';

export const onSelectProduct = (product_id, allProducts) => {
  return dispatch => {
    dispatch({
      type: constants.ON_SELECT_PRODUCT_AUTO_COMPLETE,
      product_id,
      allProducts
    })
  }
}

export const onSelectCustomer = (customer_id, allCustomers) => {
  return dispatch => {
    dispatch({
      type: constants.ON_SELECT_CUSTOMER_AUTO_COMPLETE,
      customer_id,
      allCustomers
    })
  }
}

export const onQuantityChange = (value, product_id) => {
  return dispatch => {
    dispatch({
      type: constants.ON_QUANTITY_CHANGE,
      product_id,
      value
    })
  }
}

export const onPaymentTypeChange = (payment_type) => {
  return dispatch => {
    dispatch({
      type: constants.ON_PAYMENT_TYPE_CHANGE,
      payment_type
    })
  }
}

export const onReceiptInputChange = (name, value) => {
  return dispatch => {
    dispatch({
      type: constants.ON_RECEIPT_INPUT_CHANGE,
      name,
      value
    })
  }
}

export const onAddNewTransaction = () => {
  return dispatch => {
    dispatch({
      type: constants.ON_ADD_NEW_TRANSACTION
    })
  }
}

export const onRemoveTransaction = (targetKey) => {
  return dispatch => {
    dispatch({
      type: constants.ON_REMOVE_TRANSACTION,
      targetKey
    })
  }
}

export const onChangeTab = (activeKey) => {
  return dispatch => {
    dispatch({
      type: constants.ON_CHANGE_TAB,
      activeKey
    })
  }
}

export const onCustomerInputChange = (value) => {
  return dispatch => {
    dispatch({
      type: constants.ON_CUSTOMER_INPUT_CHANGE,
      value
    })
  }
}

export const createReceipt = (data) => {
  let url = process.env.REACT_APP_HOST + 'receipts';
  const currentUser = JSON.parse(localStorage.user);
  let formData = new FormData();

  formData.append('receipt[creator_id]', currentUser.id);
  if (data.receipt.isTimeChange) {
    formData.append('receipt[date_time]', data.receipt.date_time);
  } else {
    formData.append('receipt[date_time]', moment().toString());
  }

  if (data.receipt.customer) formData.append('receipt[customer_id]', data.receipt.customer.id);

  formData.append('receipt[customer_payment]', data.receipt.customer_payment);
  formData.append('receipt[payment_method_id]', data.receipt.payment_type.id);

  data.boughtProducts.forEach((product, index) => {
    formData.append('receipt[receipt_details_attributes][' + index + '][quantity]', product.quantity);
    formData.append('receipt[receipt_details_attributes][' + index + '][product_id]', product.id);
    formData.append('receipt[receipt_details_attributes][' + index + '][unit_price]', product.sale_price);
  });

  return dispatch => {
    axios({
      url, method: 'POST',
      data: formData,
      headers: {
        'AUTH-TOKEN': localStorage.token
      }
    }).then(response => {
      dispatch({
        type: constants.ON_CREATE_RECEIPT_SUCCESS,
        response
      });
    }).catch(error => {
      // dispatch({
      //   type: constants.LOGIN_FAIL,
      //   errors: handleErrorsResponse(error.response.data.errors)
      // })
      console.log(error);
    });
  }
}

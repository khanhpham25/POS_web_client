import * as constants from '../constants';
import axios from 'axios';
import moment from 'moment';
import $ from 'jquery';

import { showLoading, hideLoading } from 'layouts/Dashboard/actions';

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

export const onRemoveItemFromList = (product_id) => {
  return dispatch => {
    dispatch({
      type: constants.ON_REMOVE_ITEM_FROM_LIST,
      product_id
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
  formData.append('receipt[note]', data.receipt.note);
  if (data.receipt.isTimeChange) {
    formData.append('receipt[date_time]', data.receipt.date_time);
  } else {
    formData.append('receipt[date_time]', moment().toString());
  }

  let errors = [];
  if (data.receipt.customer.id) formData.append('receipt[customer_id]', data.receipt.customer.id);
  if (data.receipt.payment_type.id) formData.append('receipt[payment_method_id]', data.receipt.payment_type.id);

  formData.append('receipt[customer_payment]', data.receipt.customer_payment);

  data.boughtProducts.forEach((product, index) => {
    formData.append('receipt[receipt_details_attributes][' + index + '][quantity]', product.quantity);
    formData.append('receipt[receipt_details_attributes][' + index + '][product_id]', product.id);
    formData.append('receipt[receipt_details_attributes][' + index + '][unit_price]', product.sale_price);
  });

  if (errors.length == 0) {
    return dispatch => {
      dispatch(showLoading());
      axios({
        url, method: 'POST',
        data: formData,
        headers: {
          'AUTH-TOKEN': localStorage.token
        }
      }).then(response => {
        printReceipt(response.data.data.receipt);
        dispatch({
          type: constants.ON_CREATE_RECEIPT_SUCCESS,
          response
        });
        dispatch(hideLoading());
      }).catch(error => {
        // dispatch({
        //   type: constants.LOGIN_FAIL,
        //   errors: handleErrorsResponse(error.response.data.errors)
        // })
        console.log(error);
        dispatch(hideLoading());
      });
    }
  } else return;
}

const printReceipt = (receipt) => {
  var totalPrice = 0;
  var frame1 = $('<iframe />');
  frame1[0].name = "frame1";
  frame1.css({ "position": "absolute", "top": "-1000000px" });
  $("body").append(frame1);
  var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
  frameDoc.document.open();
  frameDoc.document.write('<html><head><title>Print Receipt</title>');
  frameDoc.document.write('<style>' +
    '.w-100 {width: 100%;}' + '.tc {text-align: center;}' + '.tu {text-transform: uppercase;}' +
    '.fs14 {font-size: 14pt;}' + '.fs12 {font-size: 12pt;} table {border: none;}' +
    'th { border-bottom: 1px solid #ddd } td, th { text-align: left; padding: 8px; } ' +
    '.title { margin-bottom: 80px; } .result {width: 100%; float: right; margin-bottom: 40px} .table-result { float: right;}' +
    '</style>')
  frameDoc.document.write('</head><body>');
  frameDoc.document.write(`<div class='w-100'>Date: ${moment(receipt.date_time).format('MM-DD-YYYY HH:mm')}</div>
    <div class='w-100 tc tu'><b>Invoice</b></div>
    <div class='w-100 tc tu fs12'><b>${receipt.code}</b></div>
    <div><b>Customer:</b> ${receipt.customer ? receipt.customer.name : 'Free Individual'} </div>
    <div><b>Seller:</b> ${receipt.creator.name} </div>
    <hr />
    <div class='cart' >
    <table class='w-100' >
  <tr><th>Name</th><th>Price</th><th>Quantity</th><th>Total</th></tr>`);
  receipt.receipt_details.map(r => {
    frameDoc.document.write(`<tr><td>${r.product.name}</td><td>${r.product.sale_price}</td><td>${r.quantity}</td><td>${r.quantity * r.product.sale_price}</td></tr>`);
    totalPrice += (r.quantity * r.product.sale_price);
  })
  frameDoc.document.write(`</table>
    </div>
    <hr />
    <div class='result' ><table class='table-result'>
      <tr><td>Total:</td><td><b>${totalPrice}</b></td></tr>
      <tr><td>Paid:</td><td>${receipt.customer_payment}</td></tr>
      <tr><td>Change:</td><td>${receipt.customer_payment - totalPrice}</td></tr>
    </table></div>
  <div class='w-100 tc' ><h3>Thank you!</h3></div>`);
  frameDoc.document.write('</body></html>');
  frameDoc.document.close();
  setTimeout(function () {
    window.frames["frame1"].focus();
    window.frames["frame1"].print();
    frame1.remove();
  }, 500);
}

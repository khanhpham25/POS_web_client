import * as constants from '../constants';
import axios from 'axios';
import { push } from 'react-router-redux';
import moment from 'moment';

export const onSelectProduct = (product_id, allProducts) => {
  return dispatch => {
    dispatch({
      type: constants.ON_SELECT_PRODUCT_TO_CHECK,
      product_id,
      allProducts
    })
  }
}

export const onQuantityChange = (value, product_id) => {
  return dispatch => {
    dispatch({
      type: constants.ON_CHECK_PRODUCT_QUANTITY_CHANGE,
      product_id,
      value
    })
  }
}

export const onRemoveItemFromList = (product_id) => {
  return dispatch => {
    dispatch({
      type: constants.ON_REMOVE_CHECK_ITEM_FROM_LIST,
      product_id
    })
  }
}

export const onNoteInputChange = (name, value) => {
  return dispatch => {
    dispatch({
      type: constants.ON_INVENT_NOTE_INPUT_CHANGE,
      name,
      value
    })
  }
}

export const saveTemporarily = (data) => {
  let url = process.env.REACT_APP_HOST + 'inventory_notes';
  const currentUser = JSON.parse(localStorage.user);
  let errors = [];
  let formData = new FormData();

  formData.append('inventory_note[creator_id]', currentUser.id);
  if (data.inventoryForm.isTimeChange) {
    formData.append('inventory_note[inventory_date]', data.inventoryForm.date_time);
  } else {
    formData.append('inventory_note[inventory_date]', moment().toString());
  }
  formData.append('inventory_note[note]', data.inventoryForm.note);
  formData.append('inventory_note[status]', 0);

  data.checkingProducts.forEach((product, index) => {
    let deviation = product.real_amount - product.stock_count;
    if (product.quantity < 0 || ((typeof product.quantity === "number") && Math.floor(product.quantity) === product.quantity)) {
      errors.push("Cant pay");
      return;
    }
    formData.append('inventory_note[inventory_note_details_attributes][' + index + '][real_quantity]', product.real_amount);
    formData.append('inventory_note[inventory_note_details_attributes][' + index + '][product_id]', product.id);
    formData.append('inventory_note[inventory_note_details_attributes][' + index + '][in_stock]', product.stock_count);
    formData.append('inventory_note[inventory_note_details_attributes][' + index + '][amount_deviation]', deviation);
    formData.append('inventory_note[inventory_note_details_attributes][' + index + '][price_deviation]', deviation * product.initial_cost);
  });

  if (errors.length == 0) {
    return dispatch => {
      axios({
        url, method: 'POST',
        data: formData,
        headers: {
          'AUTH-TOKEN': localStorage.token
        }
      }).then(response => {
        dispatch({
          type: constants.ON_CREATE_TEMP_INVENT_CHECK_SUCCESS,
          response
        });

        dispatch(push('/inventory-notes'));
      }).catch(error => {
        // dispatch({
        //   type: constants.LOGIN_FAIL,
        //   errors: handleErrorsResponse(error.response.data.errors)
        // })
        console.log(error);
      });
    }
  } else return;
}

export const completeInventoryCheck = (data) => {
  let url = process.env.REACT_APP_HOST + 'inventory_notes';
  const currentUser = JSON.parse(localStorage.user);
  let errors = [];
  let formData = new FormData();

  formData.append('inventory_note[creator_id]', currentUser.id);
  if (data.inventoryForm.isTimeChange) {
    formData.append('inventory_note[inventory_date]', data.inventoryForm.date_time);
  } else {
    formData.append('inventory_note[inventory_date]', moment().toString());
  }
  formData.append('inventory_note[balance_date]', moment().toString());
  formData.append('inventory_note[note]', data.inventoryForm.note);
  formData.append('inventory_note[status]', 1);

  data.checkingProducts.forEach((product, index) => {
    let deviation = product.real_amount - product.stock_count;
    if (product.quantity < 0 || ((typeof product.quantity === "number") && Math.floor(product.quantity) === product.quantity)) {
      errors.push("Cant pay");
      return;
    }
    formData.append('inventory_note[inventory_note_details_attributes][' + index + '][real_quantity]', product.real_amount);
    formData.append('inventory_note[inventory_note_details_attributes][' + index + '][product_id]', product.id);
    formData.append('inventory_note[inventory_note_details_attributes][' + index + '][in_stock]', product.stock_count);
    formData.append('inventory_note[inventory_note_details_attributes][' + index + '][amount_deviation]', deviation);
    formData.append('inventory_note[inventory_note_details_attributes][' + index + '][price_deviation]', deviation * product.initial_cost);
  });

  if (errors.length == 0) {
    return dispatch => {
      axios({
        url, method: 'POST',
        data: formData,
        headers: {
          'AUTH-TOKEN': localStorage.token
        }
      }).then(response => {
        dispatch({
          type: constants.ON_CREATE_INVENT_CHECK_SUCCESS,
          response
        });

        dispatch(push('/inventory-notes'));
      }).catch(error => {
        // dispatch({
        //   type: constants.LOGIN_FAIL,
        //   errors: handleErrorsResponse(error.response.data.errors)
        // })
        console.log(error);
      });
    }
  } else return;
}

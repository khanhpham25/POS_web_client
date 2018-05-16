import * as constants from '../constants';
import axios from 'axios';
import { push } from 'react-router-redux';

import { handleErrorsResponse } from 'assets/helper/handleErrorsResponse';

export const getProducts = () => {
  let url = process.env.REACT_APP_HOST + 'products';

  return dispatch => {
    axios({
      url, method: 'GET',
      headers: {
        'AUTH-TOKEN': localStorage.token
      }
    }).then(response => {
      dispatch({
        type: constants.LOAD_ALL_PRODUCT_SUCCESS,
        data: response.data.data
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

export const updateProduct = (product) => {
  let url = process.env.REACT_APP_HOST + 'products/' + product.id;
  let formData = new FormData();

  for (let key of Object.keys(product)) {
    if (key == 'category') {
      formData.append(`product[category_id]`, product[key].id);
    } else {
      formData.append(`product[${key}]`, product[key])
    }
  }

  return dispatch => {
    axios({
      url, method: 'PUT', data: formData,
      headers: {
        'AUTH-TOKEN': localStorage.token
      }
    }).then(response => {
      dispatch({
        type: constants.UPDATE_PRODUCT_SUCCESS,
        data: response.data.data
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

export const createProduct = (product) => {
  let url = process.env.REACT_APP_HOST + 'products';
  let formData = new FormData();

  for (let key of Object.keys(product)) {
    if (key == 'category') {
      formData.append(`product[category_id]`, product[key].id);
    } else if (key !== 'code') {
      formData.append(`product[${key}]`, product[key]);
    }
  }

  return dispatch => {
    axios({
      url, method: 'POST', data: formData,
      headers: {
        'AUTH-TOKEN': localStorage.token
      }
    }).then(response => {
      dispatch({
        type: constants.CREATE_PRODUCT_SUCCESS,
        data: response.data.data
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

export const onTableRowChange = (expandedRowKeys) => {
  return dispatch => {
    dispatch({
      type: constants.TABLE_ROW_EXPAND,
      data: expandedRowKeys
    })
  }
}

export const updateCategories = (category) => {
  return dispatch => {
    dispatch({
      type: constants.UPDATE_CATEGORIES,
      category
    })
  }
}

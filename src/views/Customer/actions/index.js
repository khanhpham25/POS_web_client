import * as constants from '../constants';
import axios from 'axios';

import { showLoading, hideLoading } from 'layouts/Dashboard/actions';

export const getCustomers = () => {
  let url = process.env.REACT_APP_HOST + 'customers';

  return dispatch => {
    dispatch(showLoading());
    axios({
      url, method: 'GET',
      headers: {
        'AUTH-TOKEN': localStorage.token
      }
    }).then(response => {
      dispatch({
        type: constants.LOAD_ALL_CUSTOMER_SUCCESS,
        data: response.data.data
      });
      dispatch(hideLoading());
    }).catch(error => {
      // dispatch({
      //   type: constants.LOGIN_FAIL,
      //   errors: handleErrorsResponse(error.response.data.errors)
      // })
      dispatch(hideLoading());
      console.log(error);
    });
  };
};

export const updateCustomer = (customer) => {
  let url = process.env.REACT_APP_HOST + 'customers/' + customer.id;
  let formData = new FormData();

  for (let key of Object.keys(customer)) {
    if (key !== 'customer_type') {
      formData.append(`customer[${key}]`, customer[key]);
    } else {
      formData.append(`customer[${key}_id]`, customer[key].id);
    }
  }

  return dispatch => {
    dispatch(showLoading());
    axios({
      url, method: 'PUT', data: formData,
      headers: {
        'AUTH-TOKEN': localStorage.token
      }
    }).then(response => {
      dispatch({
        type: constants.UPDATE_CUSTOMER_SUCCESS,
        data: response.data.data
      });
      dispatch(hideLoading());
    }).catch(error => {
      // dispatch({
      //   type: constants.LOGIN_FAIL,
      //   errors: handleErrorsResponse(error.response.data.errors)
      // })
      dispatch(hideLoading());
      console.log(error);
    });
  };
};

export const createCustomer = customer => {
  let url = process.env.REACT_APP_HOST + 'customers';
  let formData = new FormData();

  for (let key of Object.keys(customer)) {
    if (key == 'customer_type') {
      formData.append(`customer[customer_type_id]`, customer[key].id);
    } else if (key !== 'code') {
      formData.append(`customer[${key}]`, customer[key]);
    }
  }

  return dispatch => {
    dispatch(showLoading());
    axios({
      url, method: 'POST', data: formData,
      headers: {
        'AUTH-TOKEN': localStorage.token
      }
    }).then(response => {
      dispatch({
        type: constants.CREATE_CUSTOMER_SUCCESS,
        data: response.data.data
      });
      dispatch(hideLoading());
    }).catch(error => {
      // dispatch({
      //   type: constants.LOGIN_FAIL,
      //   errors: handleErrorsResponse(error.response.data.errors)
      // })
      dispatch(hideLoading());
      console.log(error);
    });
  };
}

export const deleteCustomer = customer_id => {
  const url = `${process.env.REACT_APP_HOST}customers/${customer_id}`;

  return dispatch => {
    dispatch(showLoading());
    axios({
      url,
      method: 'DELETE',
      headers: {
        'AUTH_TOKEN': localStorage.token
      }
    }).then(response => {
      dispatch({
        type: constants.DELETE_CUSTOMER_SUCCESS,
        customer_id
      });
      dispatch(hideLoading());
    }).catch(error => {
      dispatch(hideLoading());
      console.log(error);
    });
  };
};

export const onTableRowChange = (expandedRowKeys) => {
  return dispatch => {
    dispatch({
      type: constants.TABLE_ROW_EXPAND,
      data: expandedRowKeys
    });
  };
}

import * as constants from '../constants';
import axios from 'axios';
import { push } from 'react-router-redux';

import { handleErrorsResponse } from 'assets/helper/handleErrorsResponse';

export const getCustomers = () => {
  let url = process.env.REACT_APP_HOST + 'customers';

  return dispatch => {
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
    }).catch(error => {
      // dispatch({
      //   type: constants.LOGIN_FAIL,
      //   errors: handleErrorsResponse(error.response.data.errors)
      // })
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
    }).catch(error => {
      // dispatch({
      //   type: constants.LOGIN_FAIL,
      //   errors: handleErrorsResponse(error.response.data.errors)
      // })
      console.log(error);
    });
  };
};

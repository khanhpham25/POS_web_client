import * as constants from '../constants';
import axios from 'axios';
import { push } from 'react-router-redux';

import { handleErrorsResponse } from 'assets/helper/handleErrorsResponse';

export const getProviders = () => {
  const url = `${process.env.REACT_APP_HOST}providers`;

  return dispatch => {
    axios({
      url, method: 'GET',
      headers: {
        'AUTH-TOKEN': localStorage.token
      }
    }).then(response => {
      dispatch({
        type: constants.LOAD_ALL_PROVIDER_SUCCESS,
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

export const updateProvider = provider => {
  const url = `${process.env.REACT_APP_HOST}providers/${provider.id}`;
  let formData = new FormData();

  for (let key of Object.keys(provider)) {
    formData.append(`provider[${key}]`, provider[key]);
  }

  return dispatch => {
    axios({
      url, method: 'PUT', data: formData,
      headers: {
        'AUTH-TOKEN': localStorage.token
      }
    }).then(response => {
      dispatch({
        type: constants.UPDATE_PROVIDER_SUCCESS,
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

export const createProvider = provider => {
  const url = `${process.env.REACT_APP_HOST}providers`;
  let formData = new FormData();

  for (let key of Object.keys(provider)) {
    formData.append(`provider[${key}]`, provider[key]);
  }

  return dispatch => {
    axios({
      url, method: 'POST', data: formData,
      headers: {
        'AUTH-TOKEN': localStorage.token
      }
    }).then(response => {
      dispatch({
        type: constants.CREATE_PROVIDER_SUCCESS,
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
}

export const deleteProvider = provider_id => {
  const url = `${process.env.REACT_APP_HOST}providers/${provider_id}`;

  return dispatch => {
    axios({
      url,
      method: 'DELETE',
      headers: {
        'AUTH_TOKEN': localStorage.token
      }
    }).then(response => {
      dispatch({
        type: constants.DELETE_PROVIDER_SUCCESS,
        provider_id
      });
    }).catch(error => {
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

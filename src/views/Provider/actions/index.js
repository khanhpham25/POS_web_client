import * as constants from '../constants';
import axios from 'axios';
import { showLoading, hideLoading } from 'layouts/Dashboard/actions';

export const getProviders = () => {
  const url = `${process.env.REACT_APP_HOST}providers`;

  return dispatch => {
    dispatch(showLoading());
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

export const updateProvider = provider => {
  const url = `${process.env.REACT_APP_HOST}providers/${provider.id}`;
  let formData = new FormData();

  for (let key of Object.keys(provider)) {
    formData.append(`provider[${key}]`, provider[key]);
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
        type: constants.UPDATE_PROVIDER_SUCCESS,
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

export const createProvider = provider => {
  const url = `${process.env.REACT_APP_HOST}providers`;
  let formData = new FormData();

  for (let key of Object.keys(provider)) {
    formData.append(`provider[${key}]`, provider[key]);
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
        type: constants.CREATE_PROVIDER_SUCCESS,
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

export const deleteProvider = provider_id => {
  const url = `${process.env.REACT_APP_HOST}providers/${provider_id}`;

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
        type: constants.DELETE_PROVIDER_SUCCESS,
        provider_id
      });
      dispatch(hideLoading());
    }).catch(error => {
      console.log(error);
      dispatch(hideLoading());
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

export const handleSearchProvider = searchValue => {
  return dispatch => {
    dispatch({
      type: constants.HANDLE_PROVIDER_SEARCH,
      searchValue
    });
  };
}

export const handleRowSelected = selectedRowKeys => {
  return dispatch => {
    dispatch({
      type: constants.HANDLE_ROW_SELECTED,
      selectedRowKeys
    });
  };
}

export const deleteProviders = selectedIds => {
  let url = process.env.REACT_APP_HOST + 'providers/delete_providers';
  let formData = new FormData();
  formData.append(`provider[provider_ids]`, selectedIds);

  return dispatch => {
    dispatch(showLoading());
    axios({
      url, method: 'DELETE', data: formData,
      headers: {
        'AUTH-TOKEN': localStorage.token
      }
    }).then(response => {
      dispatch({
        type: constants.DELETE_MANY_PROVIDERS_SUCCESS,
        selectedIds
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
}

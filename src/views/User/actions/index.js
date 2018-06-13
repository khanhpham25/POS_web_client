import * as constants from '../constants';
import axios from 'axios';
import { showLoading, hideLoading } from 'layouts/Dashboard/actions';

export const getUsers = () => {
  const url = `${process.env.REACT_APP_HOST}users`;

  return dispatch => {
    dispatch(showLoading());
    axios({
      url, method: 'GET',
      headers: {
        'AUTH-TOKEN': localStorage.token
      }
    }).then(response => {
      dispatch({
        type: constants.LOAD_ALL_USER_SUCCESS,
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

export const updateUser = user => {
  const url = `${process.env.REACT_APP_HOST}users/${user.id}`;
  let formData = new FormData();

  for (let key of Object.keys(user)) {
    formData.append(`user[${key}]`, user[key]);
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
        type: constants.UPDATE_USER_SUCCESS,
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

export const createUser = user => {
  const url = `${process.env.REACT_APP_HOST}users`;
  let formData = new FormData();

  for (let key of Object.keys(user)) {
    formData.append(`user[${key}]`, user[key]);
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
        type: constants.CREATE_USER_SUCCESS,
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

export const deleteUser = user_id => {
  const url = `${process.env.REACT_APP_HOST}users/${user_id}`;

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
        type: constants.DELETE_USER_SUCCESS,
        user_id
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

export const handleSearchUser = searchValue => {
  return dispatch => {
    dispatch({
      type: constants.HANDLE_USER_SEARCH,
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

export const deleteUsers = selectedIds => {
  let url = process.env.REACT_APP_HOST + 'users/delete_users';
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
        type: constants.DELETE_MANY_USERS_SUCCESS,
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

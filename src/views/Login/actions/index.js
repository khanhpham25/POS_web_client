import * as constants from '../constants';
import axios from 'axios';
import { push } from 'react-router-redux';

import { handleErrorsResponse } from 'assets/helper/handleErrorsResponse';

export const submitLogin = (email, password) => {
  let url = process.env.REACT_APP_HOST + 'login';
  let formData = new FormData();
  formData.append('authentication[email]', email);
  formData.append('authentication[password]', password);
  return dispatch => {
    axios({
      url, method: 'POST',
      data: formData
    }).then(response => {
      dispatch({
        type: constants.LOGIN_SUCCESS,
        response
      });
      saveUser(response.data);

      dispatch(push('/'));
    }).catch(error => {
      dispatch({
        type: constants.LOGIN_FAIL,
        errors: handleErrorsResponse(error.response.data.errors)
      })
    });
  }
}

const saveUser = response => {
  const user = JSON.stringify(response.data.user);
  localStorage.setItem('user', user);
  localStorage.setItem('token', response.data.token);
};

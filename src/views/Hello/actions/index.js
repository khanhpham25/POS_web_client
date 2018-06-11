import * as constants from '../constants';
import axios from 'axios';

import { showLoading, hideLoading } from 'layouts/Dashboard/actions';

export const onCustomerInputChange = (value) => {
  return dispatch => {
    dispatch({
      // type: constants.ON_CUSTOMER_INPUT_CHANGE,
      value
    })
  }
}

export const getStatisticData = () => {
  let url = process.env.REACT_APP_HOST + 'statistic_reports';
  const currentUser = JSON.parse(localStorage.user);

  return dispatch => {
    dispatch(showLoading());
    axios({
      url: url + '?type=general_reports', method: 'GET',
      headers: {
        'AUTH-TOKEN': localStorage.token
      }
    }).then(response => {
      dispatch({
        type: constants.ON_LOAD_GENERAL_REPORT_SUCCESS,
        response
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
  }
}

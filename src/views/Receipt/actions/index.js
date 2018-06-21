import * as constants from '../constants';
import axios from 'axios';
import { push } from 'react-router-redux';

import { handleErrorsResponse } from 'assets/helper/handleErrorsResponse';
import { showLoading, hideLoading } from 'layouts/Dashboard/actions';

export const getReceipts = () => {
  let url = process.env.REACT_APP_HOST + 'receipts';

  return dispatch => {
    dispatch(showLoading());
    axios({
      url, method: 'GET',
      headers: {
        'AUTH-TOKEN': localStorage.token
      }
    }).then(response => {
      dispatch({
        type: constants.LOAD_ALL_RECEIPTS_SUCCESS,
        data: response.data.data
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

export const onReceiptTableRowChange = (expandedRowKeys) => {
  return dispatch => {
    dispatch({
      type: constants.RECEIPT_TABLE_ROW_EXPAND,
      data: expandedRowKeys
    })
  }
}

export const handleSearchReceipt = (searchValue) => {
  return dispatch => {
    dispatch({
      type: constants.HANDLE_RECEIPT_SEARCH,
      searchValue
    })
  }
}

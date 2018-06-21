import * as constants from '../constants';
import { notification } from 'antd';

const initialState = {
  errors: null,
  receipts: [],
  expandedRowKeys: [],
  dataSource: [],
}

const receiptReducer = (state = initialState, action) => {
  let receipts;
  let expandedRowKeys;
  let dataSource;

  switch (action.type) {
    case constants.LOAD_ALL_RECEIPTS_SUCCESS:

      return {
        errors: null,
        receipts: action.data.receipts,
        expandedRowKeys: state.expandedRowKeys,
        dataSource: action.data.receipts,
      }

    case constants.HANDLE_RECEIPT_SEARCH:
      let initialSource = [...state.receipts];
      let searchValue = action.searchValue.toLowerCase();
      let filterdSource = initialSource.filter(receipt => {
        return receipt.code.toLowerCase().includes(searchValue);
      })

      return {
        errors: null,
        receipts: state.receipts,
        expandedRowKeys: state.expandedRowKeys,
        dataSource: filterdSource,
      }

    case constants.RECEIPT_TABLE_ROW_EXPAND:
      expandedRowKeys = action.data;

      return {
        errors: null,
        receipts: state.receipts,
        expandedRowKeys,
        dataSource: state.dataSource,
      }

    default:
      return state
  }
}

export default receiptReducer;

import * as constants from '../constants';
import { notification } from 'antd';

const initialState = {
  errors: null,
  customers: [],
  customerTypes: [],
  expandedRowKeys: [],
  dataSource: [],
  selectedRowKeys: []
};

const customerReducer = (state = initialState, action) => {
  let customers, dataSource, expandedRowKeys;
  switch (action.type) {
    case constants.LOAD_ALL_CUSTOMER_SUCCESS:
      return {
        errors: null,
        customers: action.data.customers,
        customerTypes: action.data.customerTypes,
        expandedRowKeys: state.expandedRowKeys,
        dataSource: action.data.customers,
        selectedRowKeys: state.selectedRowKeys
      };

    case constants.UPDATE_CUSTOMER_SUCCESS:
      customers = Object.assign([], state.customers);

      let index = customers.findIndex(customer => {
        return customer.id == action.data.customer.id
      });

      customers[index] = action.data.customer;
      dataSource = customers;

      return {
        errors: null,
        customers,
        customerTypes: action.data.customerTypes,
        expandedRowKeys: state.expandedRowKeys,
        dataSource,
        selectedRowKeys: state.selectedRowKeys
      };

    case constants.CREATE_CUSTOMER_SUCCESS:
      expandedRowKeys = [];
      customers = Object.assign([], state.customers);

      customers.unshift(action.data.customer);
      expandedRowKeys.push(action.data.customer.id);
      dataSource = customers;

      return {
        errors: null,
        customers,
        customerTypes: state.customerTypes,
        expandedRowKeys,
        dataSource,
        selectedRowKeys: state.selectedRowKeys
      };

    case constants.TABLE_ROW_EXPAND:
      expandedRowKeys = action.data;

      return {
        errors: null,
        customers: state.customers,
        customerTypes: state.customerTypes,
        expandedRowKeys,
        dataSource: state.dataSource,
        selectedRowKeys: state.selectedRowKeys
      };

    case constants.HANDLE_CUSTOMER_SEARCH:
      let initialSource = [...state.customers];
      let searchValue = action.searchValue.toLowerCase();
      let filterdSource = initialSource.filter(p => {
        let isCodeMatch = p.code ? p.code.toLowerCase().includes(searchValue) : false;
        return p.name.toLowerCase().includes(searchValue) || isCodeMatch
      });

      return {
        errors: null,
        customers: state.customers,
        customerTypes: state.customerTypes,
        expandedRowKeys: state.expandedRowKeys,
        dataSource: filterdSource,
        selectedRowKeys: state.selectedRowKeys
      };

    case constants.HANDLE_ROW_SELECTED:
      return {
        errors: null,
        customers: state.customers,
        customerTypes: state.customerTypes,
        expandedRowKeys: state.expandedRowKeys,
        dataSource: state.dataSource,
        selectedRowKeys: action.selectedRowKeys
      };

    case constants.DELETE_CUSTOMER_SUCCESS:
      expandedRowKeys = [];
      customers = Object.assign([], state.customers.filter(customer => { return customer.id !== action.customer_id }));
      dataSource = customers;

      return {
        errors: null,
        customers,
        customerTypes: state.customerTypes,
        expandedRowKeys,
        dataSource,
        selectedRowKeys: state.selectedRowKeys
      };

    case constants.DELETE_MANY_CUSTOMERS_SUCCESS:
      let customers = Object.assign([], state.customers);
      let dataSource = Object.assign([], state.dataSource);

      customers = customers.filter(p => !action.selectedIds.includes(p.id));
      dataSource = dataSource.filter(d => !action.selectedIds.includes(d.id));

      const args = {
        message: 'DELETE',
        description: 'Chosen customers has been DELETEd sucessfully!',
        duration: 5,
        placement: 'bottomRight',
        style: {
          background: '#69BF6B',
          color: '#fff',
          marginBottom: '100px'
        }
      };
      notification.open(args);

      return {
        errors: null,
        customers,
        customerTypes: state.customerTypes,
        expandedRowKeys: [],
        dataSource,
        selectedRowKeys: []
      }

    default:
      return state;
  }
}

export default customerReducer;

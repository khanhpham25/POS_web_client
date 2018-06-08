import * as constants from '../constants';

const initialState = {
  errors: null,
  customers: [],
  customerTypes: [],
  expandedRowKeys: []
};

const customerReducer = (state = initialState, action) => {
  let customers, expandedRowKeys;
  switch (action.type) {
    case constants.LOAD_ALL_CUSTOMER_SUCCESS:
      return {
        errors: null,
        customers: action.data.customers,
        customerTypes: action.data.customerTypes,
        expandedRowKeys: state.expandedRowKeys
      };

    case constants.UPDATE_CUSTOMER_SUCCESS:
      let customers = Object.assign([], state.customers);

      let index = customers.findIndex(customer => {
        return customer.id == action.data.customer.id
      });

      customers[index] = action.data.customer;

      return {
        errors: null,
        customers,
        customerTypes: action.data.customerTypes,
        expandedRowKeys: state.expandedRowKeys
      };

    case constants.CREATE_CUSTOMER_SUCCESS:
      expandedRowKeys = [];
      customers = Object.assign([], state.customers);

      customers.unshift(action.data.customer);
      expandedRowKeys.push(action.data.customer.id);

      return {
        errors: null,
        customers,
        customerTypes: state.customerTypes,
        expandedRowKeys
      };

    case constants.TABLE_ROW_EXPAND:
      expandedRowKeys = action.data;

      return {
        errors: null,
        customers: state.customers,
        customerTypes: state.customerTypes,
        expandedRowKeys
      };

    case constants.DELETE_CUSTOMER_SUCCESS:
      expandedRowKeys = [];
      customers = Object.assign([], state.customers.filter(customer => { return customer.id !== action.customer_id }));

      return {
        errors: null,
        customers,
        customerTypes: state.customerTypes,
        expandedRowKeys
      };

    default:
      return state;
  }
}

export default customerReducer;

import * as constants from '../constants';

const initialState = {
  errors: null,
  customers: [],
  customerTypes: []
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.LOAD_ALL_CUSTOMER_SUCCESS:
      return {
        errors: null,
        customers: action.data.customers,
        customerTypes: action.data.customerTypes
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
        customerTypes: action.data.customerTypes
      }

    default:
      return state;
  }
}

export default customerReducer;

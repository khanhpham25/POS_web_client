import * as constants from '../constants';
import { notification } from 'antd';
import moment from 'moment';

const initialState = {
  errors: null,
  data: {
    checkingProducts: [],
    inventoryForm: {
      date_time: moment().toString(),
      note: '', isTimeChange: false
    }
  }
}

const inventoryCheckReducer = (state = initialState, action) => {
  let checkingProducts;
  let data;
  let checkIndex;

  switch (action.type) {

    case constants.ON_SELECT_PRODUCT_TO_CHECK:
      data = Object.assign({}, state.data);
      checkingProducts = data.checkingProducts;
      let index = action.allProducts.findIndex(product => product.id == action.product_id);

      if (index >= 0) {
        let checkIndex = checkingProducts.findIndex(product => product.id == action.allProducts[index].id);
        if (checkIndex < 0) {
          let selectedProduct = Object.assign({}, action.allProducts[index]);
          Object.assign(selectedProduct, { real_amount: 1 });
          checkingProducts.push(selectedProduct);
          Object.assign(checkingProducts[checkingProducts.length - 1], { index: checkingProducts.length - 1 });
        } else {
          Object.assign(checkingProducts[checkIndex], { real_amount: checkingProducts[checkIndex].real_amount + 1 });
        }
      }

      Object.assign(data, { checkingProducts });

      return {
        errors: null,
        data
      }

    case constants.ON_CHECK_PRODUCT_QUANTITY_CHANGE:
      data = Object.assign({}, state.data);
      checkingProducts = data.checkingProducts;
      checkIndex = checkingProducts.findIndex(product => product.id == action.product_id);

      if (checkIndex >= 0) {
        Object.assign(checkingProducts[checkIndex], { real_amount: action.value });
      }

      return {
        errors: null,
        data
      }

    case constants.ON_REMOVE_CHECK_ITEM_FROM_LIST:
      data = Object.assign({}, state.data);
      checkingProducts = data.checkingProducts;
      checkIndex = checkingProducts.findIndex(product => product.id == action.product_id);

      if (checkIndex >= 0) {
        checkingProducts.splice(checkIndex, 1);
      }

      checkingProducts.map((pro, index) => {
        Object.assign(pro, { index });
      })

      return {
        errors: null,
        data
      }

    case constants.ON_INVENT_NOTE_INPUT_CHANGE:
      data = Object.assign({}, state.data);

      if (action.name == 'date_time') Object.assign(data.inventoryForm, { isTimeChange: true });
      Object.assign(data.inventoryForm, { [action.name]: action.value });

      return {
        errors: null,
        data
      }

    case constants.ON_CREATE_TEMP_INVENT_CHECK_SUCCESS:
      const initialData = {
        errors: null,
        data: {
          checkingProducts: [],
          inventoryForm: {
            date_time: moment().toString(),
            note: '', isTimeChange: false
          }
        }
      }

      return initialData;

    case constants.ON_CREATE_INVENT_CHECK_SUCCESS:
      const initData = {
        errors: null,
        data: {
          checkingProducts: [],
          inventoryForm: {
            date_time: moment().toString(),
            note: '', isTimeChange: false
          }
        }
      }

      return initData;

    default:
      return state
  }
}

export default inventoryCheckReducer;

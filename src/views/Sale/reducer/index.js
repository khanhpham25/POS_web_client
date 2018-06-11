import * as constants from '../constants';
import { notification } from 'antd';
import moment from 'moment';

const initialPanes = [{
  key: 'tab1', index: 1, data: {
    boughtProducts: [],
    receipt: {
      date_time: moment().toString(),
      customer_payment: 0,
      customer: { id: '' },
      payment_type: { id: null, name: 'Cash' },
      note: '',
      isTimeChange: false
    }
  }
}];

const initialState = {
  errors: null,
  panes: initialPanes,
  activeKey: initialPanes[0].key,
}

const saleReducer = (state = initialState, action) => {
  let panes;

  switch (action.type) {

    case constants.ON_SELECT_PRODUCT_AUTO_COMPLETE:
      panes = [...state.panes];

      panes.forEach(pane => {
        if (pane.key == state.activeKey) {
          let boughtProducts = pane.data.boughtProducts;
          let index = action.allProducts.findIndex(product => product.id == action.product_id);

          if (index >= 0) {
            let boughtIndex = boughtProducts.findIndex(product => product.id == action.allProducts[index].id);
            if (boughtIndex < 0) {
              let selectedProduct = Object.assign({}, action.allProducts[index]);
              Object.assign(selectedProduct, { quantity: 1 });
              boughtProducts.push(selectedProduct);
              Object.assign(boughtProducts[boughtProducts.length - 1], { index: boughtProducts.length - 1 });
            } else {
              Object.assign(boughtProducts[boughtIndex], { quantity: boughtProducts[boughtIndex].quantity + 1 });
            }
          }
          return;
        }
      });

      return {
        errors: null,
        panes,
        activeKey: state.activeKey
      }

    case constants.ON_SELECT_CUSTOMER_AUTO_COMPLETE:
      panes = [...state.panes];

      panes.forEach(pane => {
        if (pane.key == state.activeKey) {
          let receipt = pane.data.receipt;
          let index = action.allCustomers.findIndex(customer => customer.id == action.customer_id);

          if (index >= 0) {
            Object.assign(receipt, { customer: action.allCustomers[index] });
          }
          return;
        }
      });

      return {
        errors: null,
        panes,
        activeKey: state.activeKey
      }

    case constants.ON_QUANTITY_CHANGE:
      panes = [...state.panes];

      panes.forEach(pane => {
        if (pane.key == state.activeKey) {
          let boughtProducts = pane.data.boughtProducts;
          let boughtIndex = boughtProducts.findIndex(product => product.id == action.product_id);

          if (boughtIndex >= 0) {
            Object.assign(boughtProducts[boughtIndex], { quantity: action.value });
          }

          return;
        }
      });

      return {
        errors: null,
        panes,
        activeKey: state.activeKey
      }

    case constants.ON_REMOVE_ITEM_FROM_LIST:
      panes = [...state.panes];

      panes.forEach(pane => {
        if (pane.key == state.activeKey) {
          let boughtProducts = pane.data.boughtProducts;
          let boughtIndex = boughtProducts.findIndex(product => product.id == action.product_id);

          if (boughtIndex >= 0) {
            boughtProducts.splice(boughtIndex, 1);
          }

          boughtProducts.map((pro, index) => {
            Object.assign(pro, { index });
          })

          return;
        }
      });

      return {
        errors: null,
        panes,
        activeKey: state.activeKey
      }

    case constants.ON_PAYMENT_TYPE_CHANGE:
      panes = [...state.panes];

      panes.forEach(pane => {
        if (pane.key == state.activeKey) {
          Object.assign(pane.data.receipt, { payment_type: action.payment_type });

          return;
        }
      })

      return {
        errors: null,
        panes,
        activeKey: state.activeKey
      }

    case constants.ON_RECEIPT_INPUT_CHANGE:
      panes = [...state.panes];

      panes.forEach(pane => {
        if (pane.key == state.activeKey) {
          if (action.name == 'date_time') Object.assign(pane.data.receipt, { isTimeChange: true });
          Object.assign(pane.data.receipt, { [action.name]: action.value });

          return;
        }
      })

      return {
        errors: null,
        panes,
        activeKey: state.activeKey
      }

    case constants.ON_CUSTOMER_INPUT_CHANGE:
      panes = [...state.panes];

      if (action.value == '') {
        panes.forEach(pane => {
          if (pane.key == state.activeKey) {
            let customer = { id: '' };
            Object.assign(pane.data.receipt, { customer });

            return;
          }
        })
      }

      return {
        errors: null,
        panes,
        activeKey: state.activeKey
      }

    case constants.ON_ADD_NEW_TRANSACTION:
      panes = [...state.panes];

      let indexArray = panes.map(pane => { return pane.index });
      let currentMaxIndex = Math.max(...indexArray);

      const nextPane = {
        key: `tab${currentMaxIndex + 1}`, index: currentMaxIndex + 1, data: {
          boughtProducts: [],
          receipt: {
            date_time: moment().toString(),
            customer_payment: 0,
            customer: { id: '' },
            payment_type: { id: 1, name: 'Cash' },
            note: ''
          }
        }
      };

      panes.push(nextPane);

      return {
        errors: null,
        panes,
        activeKey: nextPane.key
      }

    case constants.ON_REMOVE_TRANSACTION:
      panes = [...state.panes];

      let deletedIndex = panes.findIndex(pane => pane.key == action.targetKey)

      panes.splice(deletedIndex, 1);

      const startPane = {
        key: 'tab1', index: 1, data: {
          boughtProducts: [],
          receipt: {
            date_time: moment().toString(),
            customer_payment: 0,
            customer: { id: '' },
            payment_type: { id: 1, name: 'Cash' },
            note: ''
          }
        }
      };

      if (panes.length == 0) panes.push(startPane);

      let activeKey = panes[panes.length - 1].key;

      return {
        errors: null,
        panes,
        activeKey
      }

    case constants.ON_CHANGE_TAB:
      return {
        errors: null,
        panes: state.panes,
        activeKey: action.activeKey
      }

    case constants.ON_CREATE_RECEIPT_SUCCESS:
      panes = [...state.panes];

      let finishedIndex = panes.findIndex(pane => pane.key == state.activeKey)

      panes.splice(finishedIndex, 1);

      const initPane = {
        key: 'tab1', index: 1, data: {
          boughtProducts: [],
          receipt: {
            date_time: moment().toString(),
            customer_payment: 0,
            customer: { id: '' },
            payment_type: { id: 1, name: 'Cash' },
            note: ''
          }
        }
      };

      if (panes.length == 0) panes.push(initPane);

      let afterFinishedActiveKey = panes[panes.length - 1].key;

      const args = {
        message: 'Transaction success',
        description: 'Receipt Information has been saved!',
        duration: 5,
        placement: 'bottomRight',
        style: {
          background: '#69BF6B',
          color: '#fff',
          marginBottom: '125px'
        }
      };
      notification.open(args);

      return {
        errors: null,
        panes,
        activeKey: afterFinishedActiveKey
      }

    default:
      return state
  }
}

export default saleReducer;

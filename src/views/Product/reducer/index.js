import * as constants from '../constants';
import { notification } from 'antd';

const initialState = {
  errors: null,
  products: [],
  categories: [],
  expandedRowKeys: [],
  dataSource: [],
  selectedRowKeys: [],
  updateStockCount: 0
}

const productReducer = (state = initialState, action) => {
  let products;
  let expandedRowKeys;
  let dataSource;

  switch (action.type) {
    case constants.LOAD_ALL_PRODUCT_SUCCESS:
      return Object.assign({}, state, {
        errors: null,
        products: action.data.products,
        categories: action.data.categories,
        dataSource: action.data.products
      });

    case constants.UPDATE_PRODUCT_SUCCESS:
      products = Object.assign([], state.products);

      let index = products.findIndex(product => {
        return product.id == action.data.product.id
      });

      products[index] = action.data.product;

      return Object.assign({}, state, {
        errors: null,
        products
      });

    case constants.UPDATE_CATEGORIES:
      let categories = Object.assign([], state.categories);

      categories.push(action.category);

      return Object.assign({}, state, {
        errors: null,
        categories
      });

    case constants.CREATE_PRODUCT_SUCCESS:
      expandedRowKeys = [];
      products = Object.assign([], state.products);

      products.unshift(action.data.product);
      expandedRowKeys.push(action.data.product.id);

      return Object.assign({}, state, {
        errors: null,
        products,
        expandedRowKeys
      });

    case constants.TABLE_ROW_EXPAND:
      expandedRowKeys = action.data;

      return Object.assign({}, state, {
        errors: null,
        expandedRowKeys
      });

    case constants.HANDLE_PRODUCT_SEARCH:
      let initialSource = [...state.products];
      let searchValue = action.searchValue.toLowerCase();
      let filterdSource = initialSource.filter(p => {
        let isCodeMatch = p.code ? p.code.toLowerCase().includes(searchValue) : false;
        return p.name.toLowerCase().includes(searchValue) || isCodeMatch
      })

      return Object.assign({}, state, {
        errors: null,
        dataSource: filterdSource
      })

    case constants.HANDLE_ROW_SELECTED:
      return Object.assign({}, state, {
        errors: null,
        selectedRowKeys: action.selectedRowKeys,
      });

    case constants.ALLOW_SELLING_PRODUCTS_SUCCESS:
      products = Object.assign([], state.products);
      dataSource = Object.assign([], state.dataSource);

      products.forEach(p => {
        if (action.selectedIds.includes(p.id)) {
          Object.assign(p, { is_selling: true });
        }
      });

      dataSource.forEach(d => {
        if (action.selectedIds.includes(d.id)) {
          Object.assign(d, { is_selling: true });
        }
      });

      const allowOpt = {
        message: 'Update',
        description: 'Data has been updated sucessfully!',
        duration: 5,
        placement: 'bottomRight',
        style: {
          background: '#69BF6B',
          color: '#fff',
          marginBottom: '100px'
        }
      };
      notification.open(allowOpt);

      return Object.assign({}, state, {
        errors: null,
        products,
        expandedRowKeys: [],
        dataSource,
        selectedRowKeys: []
      });


    case constants.STOP_SELLING_PRODUCTS_SUCCESS:
      products = Object.assign([], state.products);
      dataSource = Object.assign([], state.dataSource);

      products.forEach(p => {
        if (action.selectedIds.includes(p.id)) {
          Object.assign(p, { is_selling: false });
        }
      });

      dataSource.forEach(d => {
        if (action.selectedIds.includes(d.id)) {
          Object.assign(d, { is_selling: false });
        }
      });

      const stopOpt = {
        message: 'Update',
        description: 'Data has been updated sucessfully!',
        duration: 5,
        placement: 'bottomRight',
        style: {
          background: '#69BF6B',
          color: '#fff',
          marginBottom: '100px'
        }
      };
      notification.open(stopOpt);

      return Object.assign({}, state, {
        errors: null,
        products,
        expandedRowKeys: [],
        dataSource,
        selectedRowKeys: []
      });

    case constants.DELETE_MANY_PRODUCTS_SUCCESS:
      products = Object.assign([], state.products);
      let dataSource = Object.assign([], state.dataSource);

      products = products.filter(p => !action.selectedIds.includes(p.id));
      dataSource = dataSource.filter(d => !action.selectedIds.includes(d.id));

      const args = {
        message: 'Delete',
        description: 'Chosen products has been deleted sucessfully!',
        duration: 5,
        placement: 'bottomRight',
        style: {
          background: '#69BF6B',
          color: '#fff',
          marginBottom: '100px'
        }
      };
      notification.open(args);

      return Object.assign({}, state, {
        errors: null,
        products,
        expandedRowKeys: [],
        dataSource,
        selectedRowKeys: []
      });

    case constants.UPDATE_PRODUCT_STATUS_SUCCESS:
      products = Object.assign([], state.products);
      dataSource = Object.assign([], state.dataSource);

      products.forEach(p => {
        if (action.product_id == p.id) {
          Object.assign(p, { is_selling: action.status == 1 ? true : false });
        }
      });

      dataSource.forEach(d => {
        if (action.product_id == d.id) {
          Object.assign(d, { is_selling: action.status == 1 ? true : false });
        }
      });

      const updateOpt = {
        message: 'Update',
        description: 'Data has been updated sucessfully!',
        duration: 5,
        placement: 'bottomRight',
        style: {
          background: '#69BF6B',
          color: '#fff',
          marginBottom: '100px'
        }
      };
      notification.open(updateOpt);

      return Object.assign({}, state, {
        errors: null,
        products,
        dataSource
      });

    case constants.DELETE_MANY_PRODUCTS_SUCCESS:
      products = Object.assign([], state.products);
      dataSource = Object.assign([], state.dataSource);

      products = products.filter(p => action.product_id != p.id);
      dataSource = dataSource.filter(d => action.product_id = d.id);

      const deleteOpt = {
        message: 'Delete',
        description: 'Chosen products has been deleted sucessfully!',
        duration: 5,
        placement: 'bottomRight',
        style: {
          background: '#69BF6B',
          color: '#fff',
          marginBottom: '100px'
        }
      };
      notification.open(deleteOpt);

      return Object.assign({}, state, {
        errors: null,
        products,
        expandedRowKeys: [],
        dataSource,
        selectedRowKeys: []
      });

    case constants.ON_IMPORT_OPTION_CHANGE:
      return Object.assign({}, state, { updateStockCount: action.option });

    default:
      return state
  }
}

export default productReducer;

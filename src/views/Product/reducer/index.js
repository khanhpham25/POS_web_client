import * as constants from '../constants';

const initialState = {
  errors: null,
  products: [],
  categories: [],
  expandedRowKeys: [],

}

const productReducer = (state = initialState, action) => {
  let products;
  let expandedRowKeys;
  switch (action.type) {
    case constants.LOAD_ALL_PRODUCT_SUCCESS:
      return {
        errors: null,
        products: action.data.products,
        categories: action.data.categories,
        expandedRowKeys: state.expandedRowKeys
      }

    case constants.UPDATE_PRODUCT_SUCCESS:
      products = Object.assign([], state.products);

      let index = products.findIndex(product => {
        return product.id == action.data.product.id
      });

      products[index] = action.data.product;

      return {
        errors: null,
        products,
        categories: state.categories,
        expandedRowKeys: state.expandedRowKeys
      }

    case constants.UPDATE_CATEGORIES:
      let categories = Object.assign([], state.categories);

      categories.push(action.category);

      return {
        errors: null,
        products: state.products,
        categories,
        expandedRowKeys: state.expandedRowKeys
      }

    case constants.CREATE_PRODUCT_SUCCESS:
      expandedRowKeys = [];
      products = Object.assign([], state.products);

      products.unshift(action.data.product);
      expandedRowKeys.push(action.data.product.id);

      return {
        errors: null,
        products,
        categories: state.categories,
        expandedRowKeys
      }

    case constants.TABLE_ROW_EXPAND:
      expandedRowKeys = action.data;

      return {
        errors: null,
        products: state.products,
        categories: state.categories,
        expandedRowKeys
      }

    default:
      return state
  }
}

export default productReducer;

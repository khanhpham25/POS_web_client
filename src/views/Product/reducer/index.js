import * as constants from '../constants';

const initialState = {
  errors: null,
  products: [],
  categories: []
}

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.LOAD_ALL_PRODUCT_SUCCESS:
      return {
        errors: null,
        products: action.data.products,
        categories: action.data.categories
      }

    case constants.UPDATE_PRODUCT_SUCCESS:
      let products = Object.assign([], state.products);

      let index = products.findIndex(product => {
        return product.id == action.data.product.id
      });

      products[index] = action.data.product;

      return {
        errors: null,
        products,
        categories: state.categories
      }

    default:
      return state
  }
}

export default productReducer;

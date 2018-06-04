import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import loginReducer from 'views/Login/reducer';
import productReducer from 'views/Product/reducer';
import saleReducer from 'views/Sale/reducer';

export default combineReducers({
  routing: routerReducer,
  loginReducer,
  productReducer,
  saleReducer
});

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import loginReducer from 'views/Login/reducer';
import productReducer from 'views/Product/reducer';
import customerReducer from 'views/Customer/reducer';
import saleReducer from 'views/Sale/reducer';
import generalReportReducer from 'views/Hello/reducer';

export default combineReducers({
  routing: routerReducer,
  loginReducer,
  productReducer,
  customerReducer,
  saleReducer,
  generalReportReducer
});

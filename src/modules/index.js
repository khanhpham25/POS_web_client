import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import loginReducer from 'views/Login/reducer';
import productReducer from 'views/Product/reducer';
import customerReducer from 'views/Customer/reducer';
import saleReducer from 'views/Sale/reducer';
import generalReportReducer from 'views/Hello/reducer';
import inventoryCheckReducer from 'views/InventoryCheck/reducer';
import inventoryNoteReducer from 'views/InventoryNote/reducer';
import providerReducer from 'views/Provider/reducer';
import dashboardReducer from 'layouts/Dashboard/reducer';
import userReducer from 'views/User/reducer';
import receiptReducer from 'views/Receipt/reducer';

export default combineReducers({
  routing: routerReducer,
  loginReducer,
  productReducer,
  customerReducer,
  saleReducer,
  generalReportReducer,
  inventoryCheckReducer,
  inventoryNoteReducer,
  providerReducer,
  userReducer,
  dashboardReducer,
  receiptReducer
});

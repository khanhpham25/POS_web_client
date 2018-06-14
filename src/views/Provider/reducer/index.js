import * as constants from '../constants';
import { notification } from 'antd';

const initialState = {
  errors: null,
  providers: [],
  expandedRowKeys: [],
  dataSource: [],
  selectedRowKeys: []
};

const providerReducer = (state = initialState, action) => {
  let providers, dataSource, expandedRowKeys;
  switch (action.type) {
    case constants.LOAD_ALL_PROVIDER_SUCCESS:
      return {
        errors: null,
        providers: action.data.providers,
        expandedRowKeys: state.expandedRowKeys,
        dataSource: action.data.providers,
        selectedRowKeys: state.selectedRowKeys
      };

    case constants.UPDATE_PROVIDER_SUCCESS:
      providers = Object.assign([], state.providers);

      let index = providers.findIndex(provider => {
        return provider.id == action.data.provider.id
      });

      providers[index] = action.data.provider;
      dataSource = providers;

      return {
        errors: null,
        providers,
        expandedRowKeys: state.expandedRowKeys,
        dataSource,
        selectedRowKeys: state.selectedRowKeys
      };

    case constants.CREATE_PROVIDER_SUCCESS:
      expandedRowKeys = [];
      providers = Object.assign([], state.providers);

      providers.unshift(action.data.provider);
      expandedRowKeys.push(action.data.provider.id);
      dataSource = providers;

      return {
        errors: null,
        providers,
        expandedRowKeys,
        dataSource,
        selectedRowKeys: state.selectedRowKeys
      };

    case constants.TABLE_ROW_EXPAND:
      expandedRowKeys = action.data;

      return {
        errors: null,
        providers: state.providers,
        expandedRowKeys,
        dataSource: state.dataSource,
        selectedRowKeys: state.selectedRowKeys
      };

    case constants.DELETE_PROVIDER_SUCCESS:
      expandedRowKeys = [];
      providers = Object.assign([], state.providers.filter(provider => { return provider.id !== action.provider_id }));
      dataSource = providers;

      return {
        errors: null,
        providers,
        expandedRowKeys,
        dataSource,
        selectedRowKeys: state.selectedRowKeys
      };

    case constants.HANDLE_PROVIDER_SEARCH:
      let initialSource = [...state.providers];
      let searchValue = action.searchValue.toLowerCase();
      let filterdSource = initialSource.filter(p => {
        let isCodeMatch = p.code ? p.code.toLowerCase().includes(searchValue) : false;
        return p.name.toLowerCase().includes(searchValue) || isCodeMatch
      });

      return {
        errors: null,
        providers: state.providers,
        expandedRowKeys: state.expandedRowKeys,
        dataSource: filterdSource,
        selectedRowKeys: state.selectedRowKeys
      };

    case constants.HANDLE_ROW_SELECTED:
      return {
        errors: null,
        providers: state.providers,
        expandedRowKeys: state.expandedRowKeys,
        dataSource: state.dataSource,
        selectedRowKeys: action.selectedRowKeys
      };

    case constants.DELETE_MANY_PROVIDERS_SUCCESS:
      let providers = Object.assign([], state.providers);
      let dataSource = Object.assign([], state.dataSource);

      providers = providers.filter(p => !action.selectedIds.includes(p.id));
      dataSource = dataSource.filter(d => !action.selectedIds.includes(d.id));

      const args = {
        message: 'DELETE',
        description: 'Chosen providers has been DELETEd sucessfully!',
        duration: 5,
        placement: 'bottomRight',
        style: {
          background: '#69BF6B',
          color: '#fff',
          marginBottom: '100px'
        }
      };
      notification.open(args);

      return {
        errors: null,
        providers,
        expandedRowKeys: [],
        dataSource,
        selectedRowKeys: []
      }

    default:
      return state;
  }
}

export default providerReducer;

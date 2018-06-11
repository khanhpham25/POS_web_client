import * as constants from '../constants';

const initialState = {
  errors: null,
  providers: [],
  expandedRowKeys: []
};

const providerReducer = (state = initialState, action) => {
  let providers, expandedRowKeys;
  switch (action.type) {
    case constants.LOAD_ALL_PROVIDER_SUCCESS:
      return {
        errors: null,
        providers: action.data.providers,
        expandedRowKeys: state.expandedRowKeys
      };

    case constants.UPDATE_PROVIDER_SUCCESS:
      let providers = Object.assign([], state.providers);

      let index = providers.findIndex(provider => {
        return provider.id == action.data.provider.id
      });

      providers[index] = action.data.provider;

      return {
        errors: null,
        providers,
        expandedRowKeys: state.expandedRowKeys
      };

    case constants.CREATE_PROVIDER_SUCCESS:
      expandedRowKeys = [];
      providers = Object.assign([], state.providers);

      providers.unshift(action.data.provider);
      expandedRowKeys.push(action.data.provider.id);

      return {
        errors: null,
        providers,
        expandedRowKeys
      };

    case constants.TABLE_ROW_EXPAND:
      expandedRowKeys = action.data;

      return {
        errors: null,
        providers: state.providers,
        expandedRowKeys
      };

    case constants.DELETE_PROVIDER_SUCCESS:
      expandedRowKeys = [];
      providers = Object.assign([], state.providers.filter(provider => { return provider.id !== action.provider_id }));

      return {
        errors: null,
        providers,
        expandedRowKeys
      };

    default:
      return state;
  }
}

export default providerReducer;

import * as constants from '../constants';
import { notification } from 'antd';

const initialState = {
  errors: null,
  users: [],
  expandedRowKeys: [],
  dataSource: [],
  selectedRowKeys: []
};

const userReducer = (state = initialState, action) => {
  let users, expandedRowKeys;
  switch (action.type) {
    case constants.LOAD_ALL_USER_SUCCESS:
      return {
        errors: null,
        users: action.data.users,
        expandedRowKeys: state.expandedRowKeys,
        dataSource: action.data.users,
        selectedRowKeys: state.selectedRowKeys
      };

    case constants.UPDATE_USER_SUCCESS:
      let users = Object.assign([], state.users);

      let index = users.findIndex(user => {
        return user.id == action.data.user.id
      });

      users[index] = action.data.user;

      return {
        errors: null,
        users,
        expandedRowKeys: state.expandedRowKeys,
        dataSource: state.dataSource,
        selectedRowKeys: state.selectedRowKeys
      };

    case constants.CREATE_USER_SUCCESS:
      expandedRowKeys = [];
      users = Object.assign([], state.users);

      users.unshift(action.data.user);
      expandedRowKeys.push(action.data.user.id);

      return {
        errors: null,
        users,
        expandedRowKeys,
        dataSource: state.dataSource,
        selectedRowKeys: state.selectedRowKeys
      };

    case constants.TABLE_ROW_EXPAND:
      expandedRowKeys = action.data;

      return {
        errors: null,
        users: state.users,
        expandedRowKeys,
        dataSource: state.dataSource,
        selectedRowKeys: state.selectedRowKeys
      };

    case constants.DELETE_USER_SUCCESS:
      expandedRowKeys = [];
      users = Object.assign([], state.users.filter(user => { return user.id !== action.user_id }));

      return {
        errors: null,
        users,
        expandedRowKeys,
        dataSource: state.dataSource,
        selectedRowKeys: state.selectedRowKeys
      };

    case constants.HANDLE_USER_SEARCH:
      let initialSource = [...state.users];
      let searchValue = action.searchValue.toLowerCase();
      let filterdSource = initialSource.filter(p => {
        let isCodeMatch = p.code ? p.code.toLowerCase().includes(searchValue) : false;
        return p.name.toLowerCase().includes(searchValue) || isCodeMatch
      });

      return {
        errors: null,
        users: state.users,
        expandedRowKeys: state.expandedRowKeys,
        dataSource: filterdSource,
        selectedRowKeys: state.selectedRowKeys
      };

    case constants.HANDLE_ROW_SELECTED:
      return {
        errors: null,
        users: state.users,
        expandedRowKeys: state.expandedRowKeys,
        dataSource: state.dataSource,
        selectedRowKeys: action.selectedRowKeys
      };

    case constants.DELETE_MANY_USERS_SUCCESS:
      users = Object.assign([], state.users);
      let dataSource = Object.assign([], state.dataSource);

      users = users.filter(p => !action.selectedIds.includes(p.id));
      dataSource = dataSource.filter(d => !action.selectedIds.includes(d.id));

      const args = {
        message: 'Delete',
        description: 'Chosen users has been deleted sucessfully!',
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
        users,
        expandedRowKeys: [],
        dataSource,
        selectedRowKeys: []
      }

    default:
      return state;
  }
}

export default userReducer;

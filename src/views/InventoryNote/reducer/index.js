import * as constants from '../constants';
import { notification } from 'antd';

const initialState = {
  errors: null,
  inventoryNotes: [],
  expandedRowKeys: [],
  dataSource: [],
}

const inventoryNoteReducer = (state = initialState, action) => {
  let inventoryNotes;
  let expandedRowKeys;
  let dataSource;

  switch (action.type) {
    case constants.LOAD_ALL_INVENT_NOTES_SUCCESS:

      return {
        errors: null,
        inventoryNotes: action.data.inventory_notes,
        expandedRowKeys: state.expandedRowKeys,
        dataSource: action.data.inventory_notes,
      }

    case constants.HANDLE_INVENT_NOTE_SEARCH:
      let initialSource = [...state.inventoryNotes];
      let searchValue = action.searchValue.toLowerCase();
      let filterdSource = initialSource.filter(note => {
        return note.code.toLowerCase().includes(searchValue);
      })

      return {
        errors: null,
        inventoryNotes: state.inventoryNotes,
        expandedRowKeys: state.expandedRowKeys,
        dataSource: filterdSource,
      }

    case constants.INVENT_TABLE_ROW_EXPAND:
      expandedRowKeys = action.data;

      return {
        errors: null,
        inventoryNotes: state.inventoryNotes,
        expandedRowKeys,
        dataSource: state.dataSource,
      }


    default:
      return state
  }
}

export default inventoryNoteReducer;

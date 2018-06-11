import { SHOW_LOADING, HIDE_LOADING } from '../constants';

const initialState = {
  isShow: false
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADING:
      return { isShow: true };

    case HIDE_LOADING:
      return { isShow: false };

    default:
      return state;
  }
};

export default dashboardReducer;

import * as constants from '../constants';

const initialState = {
  errors: null,
  redirectToReferrer: false
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.LOGIN_SUCCESS:
      return {
        errors: null,
        redirectToReferrer: true
      }

    case constants.LOGIN_FAIL:
      return {
        errors: action.errors,
        redirectToReferrer: false
      }

    default:
      return state
  }
}



export default loginReducer;

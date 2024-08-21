import {EMAIL_EXISTS,USER_NOT_FOUND,INCORRECT_CREDENTIALS,INTERNAL_SERVER_ERROR,EMPLOYEE_NOT_FOUND, FETCH_EMPLOYEE_SUCCESS, DELETE_EMPLOYEE_SUCCESS, UPDATE_EMPLOYEE_SUCCESS, ERROR_STATUS, SUBMIT_REGISTRATION_FORM_SUCCESS, SIGN_UP_SUCCESS, LOGIN_SUCCESS} from '../ServerSideErrorHandlers/ErrorTypes';

const initialState = {
    EMAIL_EXISTS :false,
    USER_NOT_FOUND:false,
    INCORRECT_CREDENTIALS:false,
    INTERNAL_SERVER_ERROR:false,
    EMPLOYEE_NOT_FOUND:false,
    ERROR_STATUS:false,
}

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
      case EMAIL_EXISTS:
        return { ...state, EMAIL_EXISTS: true };
      case USER_NOT_FOUND:
        return { ...state, USER_NOT_FOUND: true };
      case INCORRECT_CREDENTIALS:
        return { ...state, INCORRECT_CREDENTIALS: true };
      case INTERNAL_SERVER_ERROR:
        return { ...state, INTERNAL_SERVER_ERROR: true };
      case EMPLOYEE_NOT_FOUND:
        return { ...state, EMPLOYEE_NOT_FOUND: true };
      case FETCH_EMPLOYEE_SUCCESS:
        return { ...state, FETCH_EMPLOYEE_SUCCESS: true };
      case DELETE_EMPLOYEE_SUCCESS:
        return { ...state, DELETE_EMPLOYEE_SUCCESS: true };
      case SUBMIT_REGISTRATION_FORM_SUCCESS:
        return { ...state, SUBMIT_REGISTRATION_FORM_SUCCESS: true };
      case UPDATE_EMPLOYEE_SUCCESS:
        return { ...state, UPDATE_EMPLOYEE_SUCCESS: true };
      case SIGN_UP_SUCCESS:
        return { ...state, SIGN_UP_SUCCESS: true };
      case LOGIN_SUCCESS:
        return { ...state, LOGIN_SUCCESS: true };
      case ERROR_STATUS:
        return { ...state, ERROR_STATUS: true };
      default:
        return state;
    }
  };
export default errorReducer;
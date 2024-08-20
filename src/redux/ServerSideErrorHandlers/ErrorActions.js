import {EMAIL_EXISTS,USER_NOT_FOUND,INCORRECT_CREDENTIALS,INTERNAL_SERVER_ERROR,EMPLOYEE_NOT_FOUND, FETCH_EMPLOYEE_SUCCESS, DELETE_EMPLOYEE_SUCCESS, SUBMIT_REGISTRATION_FORM_SUCCESS, UPDATE_EMPLOYEE_SUCCESS, SIGN_UP_SUCCESS, LOGIN_SUCCESS,ERROR_STATUS} from '../ServerSideErrorHandlers/ErrorTypes';

export const setEmailExists = () => ({
    type:EMAIL_EXISTS,
});

export const setUserNotFound = () => ({
    type:USER_NOT_FOUND,
});

export const setIncorrectCredentials = () => ({
    type:INCORRECT_CREDENTIALS,
});

export const setInternalServerError = () => ({
    type:INTERNAL_SERVER_ERROR,
});

export const setEmployeeNotFound = () => ({
    type:EMPLOYEE_NOT_FOUND,
});

export const setFetchEmployeeSuccess = () => ({
    type:FETCH_EMPLOYEE_SUCCESS,
});

export const setDeleteEmployeeSuccess = () => ({
    type:DELETE_EMPLOYEE_SUCCESS,
});

export const setSubmitRegistrationFormSuccess = () => ({
    type:SUBMIT_REGISTRATION_FORM_SUCCESS,
});

export const setUpdateEmployeeSuccess = () => ({
    type:UPDATE_EMPLOYEE_SUCCESS,
});

export const setSignupSuccess = () => ({
    type:SIGN_UP_SUCCESS,
});

export const setLoginSuccess = () => ({
    type:LOGIN_SUCCESS,
});

export const setErrorStatus = () => ({
    type:ERROR_STATUS,
});





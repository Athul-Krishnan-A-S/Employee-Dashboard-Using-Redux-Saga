import {
    REGISTER_EMAIL,
    REGISTER_PASSWORD,
    REGISTER_CONFIRM_PASSWORD,
    EMAIL_ERROR,
    PASSWORD_ERROR,
    USER_EXISTS,
} from './signUpDataTypes';

export const registerEmail = (email) => ({
    type: REGISTER_EMAIL,
    payload: email,
});

export const registerPassword = (password) => ({
    type: REGISTER_PASSWORD,
    payload: password,
});

export const registerConfirmPassword = (confirmPassword) => ({
    type: REGISTER_CONFIRM_PASSWORD,
    payload: confirmPassword,
});

export const setEmailError = (hasError) => ({
    type: EMAIL_ERROR,
    payload: hasError,
});

export const setPasswordError = (hasError) => ({
    type: PASSWORD_ERROR,
    payload: hasError,
});

export const setUserExists = (hasError) => ({
    type: USER_EXISTS,
    payload: hasError,
});

export const submitSignInForm = (formData) => ({
    type: 'SUBMIT_SIGN_FORM',
    payload: { formData },
});

export const submitLoginForm = (formData, navigate) => ({
    type: 'SUBMIT_LOGIN_FORM',
    payload: { formData, navigate },
});

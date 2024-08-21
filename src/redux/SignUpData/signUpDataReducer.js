import {
    REGISTER_EMAIL,
    REGISTER_PASSWORD,
    REGISTER_CONFIRM_PASSWORD,
    EMAIL_ERROR,
    PASSWORD_ERROR,
    USER_EXISTS,
} from './signUpDataTypes';

const initialState = {
    email: '',
    password: '',
    confirmPassword: '',
    EMAIL_ERROR: false,
    PASSWORD_ERROR: false,
    USER_EXISTS: false,
};

const SignupReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_EMAIL:
            return { ...state, email: action.payload };
        case REGISTER_PASSWORD:
            return { ...state, password: action.payload };
        case REGISTER_CONFIRM_PASSWORD:
            return { ...state, confirmPassword: action.payload };
        case EMAIL_ERROR:
            return { ...state, EMAIL_ERROR: action.payload };
        case PASSWORD_ERROR:
            return { ...state, PASSWORD_ERROR: action.payload };
        case USER_EXISTS:
            return { ...state, USER_EXISTS: action.payload };
        default:
            return state;
    }
};

export default SignupReducer;

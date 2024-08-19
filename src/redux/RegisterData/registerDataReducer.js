import {
    SET_FIRST_NAME,
    SET_LAST_NAME,
    SET_EMAIL,
    SET_DESIGNATION,
    SET_DOB,
    SET_DOJ,
    SET_EXPERIENCE,
    SET_PHONE,
    FIRST_NAME_ERROR,
    LAST_NAME_ERROR,
    EMAIL_ERROR,
    DESIGNATION_ERROR,
    DOB_ERROR,
    DOJ_ERROR,
    EXPERIENCE_ERROR,
    PHONE_ERROR,
} from './registerDataTypes';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    designation: '',
    dob: '',
    doj: '',
    experience: '',
    phone: '',
    FIRST_NAME_ERROR: false,
    LAST_NAME_ERROR: false,
    EMAIL_ERROR: false,
    DESIGNATION_ERROR: false,
    DOB_ERROR: false,
    DOJ_ERROR: false,
    EXPERIENCE_ERROR: false,
    PHONE_ERROR: false,
};

const registerDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FIRST_NAME:
            return { ...state, firstName: action.payload };
        case SET_LAST_NAME:
            return { ...state, lastName: action.payload };
        case SET_EMAIL:
            return { ...state, email: action.payload };
        case SET_DESIGNATION:
            return { ...state, designation: action.payload };
        case SET_DOB:
            return { ...state, dob: action.payload };
        case SET_DOJ:
            return { ...state, doj: action.payload };
        case SET_EXPERIENCE:
            return { ...state, experience: action.payload };
        case SET_PHONE:
            return { ...state, phone: action.payload };
        case FIRST_NAME_ERROR:
            return { ...state, FIRST_NAME_ERROR: action.payload };
        case LAST_NAME_ERROR:
            return { ...state, LAST_NAME_ERROR: action.payload };
        case EMAIL_ERROR:
            return { ...state, EMAIL_ERROR: action.payload };
        case DESIGNATION_ERROR:
            return { ...state, DESIGNATION_ERROR: action.payload };
        case DOB_ERROR:
            return { ...state, DOB_ERROR: action.payload };
        case DOJ_ERROR:
            return { ...state, DOJ_ERROR: action.payload };
        case EXPERIENCE_ERROR:
            return { ...state, EXPERIENCE_ERROR: action.payload };
        case PHONE_ERROR:
            return { ...state, PHONE_ERROR: action.payload };
        default:
            return state;
    }
};

export default registerDataReducer;

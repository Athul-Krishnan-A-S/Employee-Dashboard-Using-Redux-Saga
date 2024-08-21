import {
    FIRST_NAME_ERROR,
    LAST_NAME_ERROR,
    EMAIL_ERROR,
    DESIGNATION_ERROR,
    DOB_ERROR,
    DOJ_ERROR,
    EXPERIENCE_ERROR,
    PHONE_ERROR,
    DOB_NOT_VALID,
    DOJ_NOT_VALID,
    SET_FORM_DATA,
    SEARCH_EMPLOYEE,
    SET_SEARCHED_DATA,
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
    SEARCH_EMPLOYEE:false,
    searchedData:{},
};

const registerDataReducer = (state = initialState, action) => {
    switch (action.type) {
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
        case DOB_NOT_VALID:
            return { ...state, DOB_NOT_VALID: action.payload };
        case DOJ_NOT_VALID:
            return { ...state, DOJ_NOT_VALID: action.payload };
        case SET_FORM_DATA:
            return { ...state, ...action.payload };
        case SEARCH_EMPLOYEE:
            return { ...state, ...action.payload };
        case SET_SEARCHED_DATA:
            return { ...state, searchedData: action.payload };
        default:
            return state;
    }
};

export default registerDataReducer;

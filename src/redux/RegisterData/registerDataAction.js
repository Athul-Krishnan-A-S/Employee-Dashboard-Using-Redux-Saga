import {
    SET_FORM_DATA,
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
} from './registerDataTypes';

export const setFormData = (formData) => ({
    type:SET_FORM_DATA,
    payload:formData,
})

export const setFirstNameError = (hasError) => ({
    type: FIRST_NAME_ERROR,
    payload: hasError,
});

export const setLastNameError = (hasError) => ({
    type: LAST_NAME_ERROR,
    payload: hasError,
});

export const setEmailError = (hasError) => ({
    type: EMAIL_ERROR,
    payload: hasError,
});

export const setDesignationError = (hasError) => ({
    type: DESIGNATION_ERROR,
    payload: hasError,
});

export const setDobError = (hasError) => ({
    type: DOB_ERROR,
    payload: hasError,
});
export const setDobNotValid = (hasError) => ({
    type: DOB_NOT_VALID,
    payload: hasError,
});
export const setDojNotValid = (hasError) => ({
    type: DOJ_NOT_VALID,
    payload: hasError,
});

export const setDojError = (hasError) => ({
    type: DOJ_ERROR,
    payload: hasError,
});

export const setExperienceError = (hasError) => ({
    type: EXPERIENCE_ERROR,
    payload: hasError,
});

export const setPhoneError = (hasError) => ({
    type: PHONE_ERROR,
    payload: hasError,
});

export const submitForm = (formData) => ({
    type: 'SUBMIT_REGISTER_FORM',
    formData,
});

export const updateEmployee = (formData) => ({
    type: 'UPDATE_EMPLOYEE',
    formData,
});
export const searchEmployee = (id) => ({
    type: 'SEARCH_EMPLOYEE',
    payload:{id},
});

export const setSearchedData = (data) => ({
    type: 'SET_SEARCHED_DATA',
    payload: data,
});

import { setDesignationError, setDobError, setDobNotValid, setDojError, setDojNotValid, setEmailError, setExperienceError, setFirstNameError, setLastNameError, setPhoneError } from "../redux/RegisterData/registerDataAction";


export const validateForm = (formData, dispatch) => {
    let hasError = false;

    if (!formData.firstName.trim() || /\./.test(formData.firstName)) {
        dispatch(setFirstNameError(true));
        hasError = true;
    } else {
        dispatch(setFirstNameError(false));
    }
    if (!formData.lastName.trim() || /\./.test(formData.lastName)) {
        dispatch(setLastNameError(true));
        hasError = true;
    } else {
        dispatch(setLastNameError(false));
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
        dispatch(setEmailError(true));
        hasError = true;
    } else {
        dispatch(setEmailError(false));
    }
    if (!formData.designation) {
        dispatch(setDesignationError(true));
        hasError = true;
    } else {
        dispatch(setDesignationError(false));
    }
    if (!formData.dob || isNaN(new Date(formData.dob).getTime())) {
        dispatch(setDobError(true));
        hasError = true;
    } else {
        dispatch(setDobError(false));
    }
    if (!isDobValid(new Date(formData.dob))) {
        dispatch(setDobNotValid(true));
        hasError = true;
    } else {
        dispatch(setDobNotValid(false));
    }
    if (!formData.doj || isNaN(new Date(formData.doj).getTime())) {
        dispatch(setDojError(true));
        hasError = true;
    } else {
        dispatch(setDojError(false));
    }
    if (!isDojValid(new Date(formData.doj))) {
        dispatch(setDojNotValid(true));
        hasError = true;
    } else {
        dispatch(setDojNotValid(false));
    }
    if (isNaN(formData.experience) || formData.experience < 0) {
        dispatch(setExperienceError(true));
        hasError = true;
    } else {
        dispatch(setExperienceError(false));
    }
    const phonePattern = /^[0-9]+$/;
    if (!phonePattern.test(formData.phone)) {
        dispatch(setPhoneError(true));
        hasError = true;
    } else {
        dispatch(setPhoneError(false));
    }

    return !hasError;
};

const isDobValid = (dob) => {
    if (!dob || isNaN(dob.getTime())) return false;
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
        return age - 1 >= 18;
    }
    return age >= 18;
};

const isDojValid = (doj) => {
    if (!doj || isNaN(doj.getTime())) return false;
    const today = new Date();
    return doj <= today;
};


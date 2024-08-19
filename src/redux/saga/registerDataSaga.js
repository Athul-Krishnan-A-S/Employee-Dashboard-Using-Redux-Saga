import { takeEvery, call, put ,all } from 'redux-saga/effects';
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
} from '../RegisterData/registerDataTypes';
import { toggleEdit, toggleModalState } from '../ModalState/ModalStateAction';
import {fetchemployeeData} from '../EmployeeDetails/EmployeeDetailsActions';
import { 
    setFirstNameError, 
    setLastNameError, 
    setEmailError, 
    setDesignationError, 
    setDobError, 
    setDojError, 
    setExperienceError, 
    setPhoneError 
} from '../RegisterData/registerDataAction';

function* submitRegisterForm(action) {
    try {
        const { formData } = action;
        const response = yield call(fetch, 'http://localhost:8000/api/employee/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = yield response.json();
        yield put(toggleModalState());
        yield put(fetchemployeeData());

    } catch (error) {
        console.error('Error:', error.message);
    }
}

function* updateEmployee(action) {
    try {
        const { formData } = action;
        const response = yield call(fetch, 'http://localhost:8000/api/employee/edit', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = yield response.json();
        yield put(toggleEdit());
        yield put(fetchemployeeData());

    } catch (error) {
        console.error('Error:', error.message);
    }
}

function* watchSubmitForm() {
    yield takeEvery('SUBMIT_REGISTER_FORM', submitRegisterForm);
}

function* watchUpdateEmployee() {
    yield takeEvery('UPDATE_EMPLOYEE', updateEmployee);
}

export default function* registerDataSaga() {
    yield all([
        watchSubmitForm(),
        watchUpdateEmployee(),
    ]);
}

import { takeEvery, call, put ,all } from 'redux-saga/effects';
import { toggleEdit, toggleModalState } from '../ModalState/ModalStateAction';
import {fetchemployeeData} from '../EmployeeDetails/EmployeeDetailsActions';
import { REGISTER_EMPLOYEE_API,SEARCH_EMPLOYEE_API,UPDATE_EMPLOYEE_API } from '../../utils/api/Api';
import {isTokenValid} from '../../utils/isTokenValid';
import {toggleTokenValid} from '../LoginState/loginStateAction';
import { setEmailExists, setEmployeeNotFound, setErrorStatus, setSubmitRegistrationFormSuccess, setUpdateEmployeeSuccess } from '../ServerSideErrorHandlers/ErrorActions';
import { setSearchedData } from '../RegisterData/registerDataAction';

function* successHandlerSubmitRegisterForm(status){
    yield put(setSubmitRegistrationFormSuccess());
}

function* successHandlerUpdateEmployee(status){
    yield put(setUpdateEmployeeSuccess());
}

function* errorHandlerSubmitRegisterForm(status){
    switch(status){
        case 422:
            yield put(setEmailExists());
            break;
        default:
            yield put(setErrorStatus());
            throw new Error('error')
    }
}

function* errorHandlerUpdateEmployee(status){
    switch(status){
        case 404:
            yield put(setEmployeeNotFound());
            break;
        case 422:
            yield put(setEmailExists());
            break;
        default:
            yield put(setErrorStatus());
            throw new Error('error')
    }
}

function* submitRegisterForm(action) {
    if(isTokenValid()){
        try {
            const { formData } = action;
            const response = yield call(fetch, REGISTER_EMPLOYEE_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                yield call(errorHandlerSubmitRegisterForm,response.status)
                throw new Error(`HTTP error! status: ${response.status}`);
            }else{
                yield put(toggleModalState());
                yield put(fetchemployeeData());
                yield call(successHandlerSubmitRegisterForm,response.status);
            }
    
        } catch (error) {
            
            console.error('Error:', error.message);
        }
    }else{
        yield put(toggleTokenValid());
    }
}

function* updateEmployee(action) {
    if(isTokenValid()){
        try {
            const { formData } = action;
            const response = yield call(fetch, UPDATE_EMPLOYEE_API, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                yield call(errorHandlerUpdateEmployee,response.status);
                throw new Error(`HTTP error! status: ${response.status}`);
            }else{
                yield put(toggleEdit());
                yield put(fetchemployeeData());
                yield call(successHandlerUpdateEmployee,response.status)
            }
    
        } catch (error) {
            errorHandlerUpdateEmployee();
            console.error('Error:', error.message);
        }
    }else{
        yield put(toggleTokenValid());
    }
}

function* searchEmployee(action) {
    if(isTokenValid()){
        try {
            const { id } = action.payload;
            const response = yield call(fetch, `${SEARCH_EMPLOYEE_API}${id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                },
            });
    
            if (!response.ok) {
                yield call(errorHandlerUpdateEmployee,response.status);
                throw new Error(`HTTP error! status: ${response.status}`);
            }else{
                const data = yield response.json();
                yield put(setSearchedData(data));
                yield call(successHandlerSubmitRegisterForm,response.status)
            }
    
        } catch (error) {
            errorHandlerUpdateEmployee();
            console.error('Error:', error.message);
        }
    }else{
        yield put(toggleTokenValid());
    }
}

function* watchSubmitForm() {
    yield takeEvery('SUBMIT_REGISTER_FORM', submitRegisterForm);
}

function* watchUpdateEmployee() {
    yield takeEvery('UPDATE_EMPLOYEE', updateEmployee);
}
function* watchSearchEmployee() {
    yield takeEvery('SEARCH_EMPLOYEE', searchEmployee);
}

export default function* registerDataSaga() {
    yield all([
        watchSubmitForm(),
        watchUpdateEmployee(),
        watchSearchEmployee(),
    ]);
}

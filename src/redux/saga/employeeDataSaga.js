import { takeEvery, put ,call} from 'redux-saga/effects';
import { FETCH_EMPLOYEE_DATA, DELETE_EMPLOYEE } from '../EmployeeDetails/EmployeeDetailsTypes';
import { setEmployeeData } from '../EmployeeDetails/EmployeeDetailsActions';
import { fetchemployeeData } from '../EmployeeDetails/EmployeeDetailsActions';
import { FETCH_EMPLOYEE_API,DELETE_EMPLOYEE_API } from '../../utils/api/Api';
import {isTokenValid} from '../../utils/isTokenValid';
import {toggleTokenValid} from '../LoginState/loginStateAction';
import { setFetchEmployeeSuccess,setDeleteEmployeeSuccess,setInternalServerError, setEmployeeNotFound, setErrorStatus } from '../ServerSideErrorHandlers/ErrorActions';


function* successHandlerFetchEmployees(status){
    yield put(setFetchEmployeeSuccess());
}

function* successHandlerDeleteEmployees(status){
    yield put(setDeleteEmployeeSuccess());
}


function* errorHandlerFetchEmployees(status){
    switch(status){
        case 500:
            yield put(setInternalServerError());
            break;
        default:
            yield put(setErrorStatus());
            throw new Error('error')
    }
}

function* errorHandlerDeleteEmployees(status){
    switch(status){
        case 404:
            yield put(setEmployeeNotFound());
            break;
        case 500:
            yield put(setInternalServerError());
            break;
        default:
            yield put(setErrorStatus());
            throw new Error('error')
    }
}




function* fetchEmployees() {
    if(isTokenValid()){
        try {
            const response = yield fetch(FETCH_EMPLOYEE_API, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`,
                },
            });
    
            if (!response.ok) {
                yield call(errorHandlerFetchEmployees,response.status);
                throw new Error(`HTTP error! status: ${response.status}`);
            }else{   
                const data = yield response.json();
                const employees = data.data.list || [];
                yield put(setEmployeeData(employees));
                yield call(successHandlerFetchEmployees,response.status)
            }
        } catch (error) {
            console.error('Error:', error.message);
            yield call(errorHandlerFetchEmployees)
        }
    }else{
        yield put(toggleTokenValid());
    }
}

function* deleteEmployee(action) {
    if(isTokenValid()){
        try {
            const { payload: employeeID } = action;
            const response = yield fetch(DELETE_EMPLOYEE_API, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ employeeId: employeeID }),
            });
    
            if (!response.ok) {
                yield call(errorHandlerDeleteEmployees,response.status);
                throw new Error(`HTTP error! status: ${response.status}`);
            }else{
                yield put(fetchemployeeData());
                yield call(successHandlerDeleteEmployees,response.status)
            }

        } catch (error) {
            yield call(errorHandlerDeleteEmployees);
            console.error('Error:', error.message);
        }
    }else{
        yield put(toggleTokenValid());
    }
}

function* employeeDataSaga() {
    yield takeEvery(FETCH_EMPLOYEE_DATA, fetchEmployees);
    yield takeEvery(DELETE_EMPLOYEE, deleteEmployee);
}

export default employeeDataSaga;

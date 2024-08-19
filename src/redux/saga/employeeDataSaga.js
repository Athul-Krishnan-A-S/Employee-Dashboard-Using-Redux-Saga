import { takeEvery, put } from 'redux-saga/effects';
import { FETCH_EMPLOYEE_DATA, DELETE_EMPLOYEE } from '../EmployeeDetails/EmployeeDetailsTypes';
import { setEmployeeData } from '../EmployeeDetails/EmployeeDetailsActions';
import { fetchemployeeData } from '../EmployeeDetails/EmployeeDetailsActions';
import { FETCH_EMPLOYEE_API,DELETE_EMPLOYEE_API } from '../../utils/api/Api';

function* fetchEmployees() {
    try {
        const response = yield fetch(FETCH_EMPLOYEE_API, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = yield response.json();
        const employees = data.data.list || [];
        yield put(setEmployeeData(employees)); 

    } catch (error) {
        console.error('Error:', error.message);
    }
}

function* deleteEmployee(action) {
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
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        yield put(fetchemployeeData());

    } catch (error) {
        console.error('Error:', error.message);
    }
}

function* employeeDataSaga() {
    yield takeEvery(FETCH_EMPLOYEE_DATA, fetchEmployees);
    yield takeEvery(DELETE_EMPLOYEE, deleteEmployee);
}

export default employeeDataSaga;

import { takeEvery, put } from 'redux-saga/effects';
import { FETCH_EMPLOYEE_DATA, DELETE_EMPLOYEE } from '../EmployeeDetails/EmployeeDetailsTypes';
import { setEmployeeData } from '../EmployeeDetails/EmployeeDetailsActions';
import { fetchemployeeData } from '../EmployeeDetails/EmployeeDetailsActions';

function* fetchEmployees() {
    try {
        const response = yield fetch('http://localhost:8000/api/employee/list', {
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
        const response = yield fetch('http://localhost:8000/api/employee/delete', {
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

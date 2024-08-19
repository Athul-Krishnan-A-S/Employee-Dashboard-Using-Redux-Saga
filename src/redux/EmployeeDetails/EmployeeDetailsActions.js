import { FETCH_EMPLOYEE_DATA, DELETE_EMPLOYEE,SET_EMPLOYEE_DATA } from './EmployeeDetailsTypes';

export const fetchemployeeData = () => ({
    type: FETCH_EMPLOYEE_DATA,
});

export const deleteEmployee = (employeeID) => ({
    type: DELETE_EMPLOYEE,
    payload: employeeID,
});

export const setEmployeeData = (employees) => ({
    type: SET_EMPLOYEE_DATA,
    payload: employees,
});
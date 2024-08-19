import { SET_EMPLOYEE_DATA, DELETE_EMPLOYEE } from './EmployeeDetailsTypes';

const initialState = [];

const employeeDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EMPLOYEE_DATA:
            return Array.isArray(action.payload) ? [...action.payload] : state;
        case DELETE_EMPLOYEE:
            return state.filter(employee => employee.id !== action.payload);
        default:
            return state;
    }
};

export default employeeDetailsReducer;

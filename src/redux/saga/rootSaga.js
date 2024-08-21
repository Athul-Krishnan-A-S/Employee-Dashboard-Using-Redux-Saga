import { all } from 'redux-saga/effects';
import employeeDataSaga from './employeeDataSaga';
import registerDataSaga from './registerDataSaga';
import signUpDataSaga from './signUpDataSaga';

function* rootSaga() {
    yield all([
        employeeDataSaga(),
        registerDataSaga(),
        signUpDataSaga(),
    ]);
}

export default rootSaga;

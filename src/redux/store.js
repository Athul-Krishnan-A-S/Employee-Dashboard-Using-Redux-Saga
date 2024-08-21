import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import isLoginReducer from './LoginState/loginStateReducer';
import registerDataReducer from './RegisterData/registerDataReducer';
import SignupReducer from './SignUpData/signUpDataReducer';
import employeeDetailsReducer from './EmployeeDetails/EmployeeDetailsReducer';
import isModalOpenReducer from './ModalState/ModalStateReducer';
import rootSaga from '../redux/saga/rootSaga'; 
import errorReducer from './ServerSideErrorHandlers/ErrorReducer';

const rootReducer = combineReducers({
    isLogin: isLoginReducer,
    registerData: registerDataReducer,
    signUpData: SignupReducer,
    employeeDetails: employeeDetailsReducer,
    isModalOpen: isModalOpenReducer,
    errorReducer:errorReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;

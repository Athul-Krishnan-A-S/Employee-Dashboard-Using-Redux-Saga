import { takeEvery, call, put ,all } from 'redux-saga/effects';
import { toggleLoginState } from '../../redux/LoginState/loginStateAction';
import { setUserExists } from '../SignUpData/signUpDataActions';
import { LOGIN_API,SIGNUP_API } from '../../utils/api/Api';
import { setEmailExists, setErrorStatus, setIncorrectCredentials, setLoginSuccess, setSignupSuccess, setUserNotFound } from '../ServerSideErrorHandlers/ErrorActions';

function* successHandlerSignup(status){
    yield put(setSignupSuccess());
}

function* successHandlerLogin(status,data){
    yield put(setLoginSuccess());
}


function* errorHandlerSignup(status){
    switch(status){
        case 422:
            yield put(setEmailExists());
            yield put(setUserExists('USER ALREADY EXISTS'));
            break;
        default:
            yield put(setErrorStatus());
            throw new Error('error')
    }
}

function* errorHandlerLogin(status){
    switch(status){
        case 404:
            yield put(setUserNotFound());
            break;
        case 422:
            yield put(setIncorrectCredentials());
            break;
        default:
            yield put(setErrorStatus());
            throw new Error('error')
    }
}



function* submitForm(action) {
    try {
        const { email, password } = action.payload.formData;
        const response = yield call(fetch, SIGNUP_API, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            yield call(errorHandlerSignup, response.status);
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            const data = yield response.json();
            yield call(successHandlerSignup);
            yield put(toggleLoginState());
        }
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}

function* submitLoginForm(action) {
    try {
        const { formData, navigate } = action.payload;

        const response = yield call(fetch, LOGIN_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            yield call(errorHandlerLogin, response.status);
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            const data = yield response.json();
            localStorage.setItem('token', data.data.token);
            const loginDateTime = new Date();
            localStorage.setItem('loginTime', loginDateTime.getTime());
            yield call(successHandlerLogin, data);
            navigate('/dashboard');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}


function* watchSubmitForm() {
    yield takeEvery('SUBMIT_SIGN_FORM', submitForm);
}

function* watchSubmitLoginForm() {
    yield takeEvery('SUBMIT_LOGIN_FORM', submitLoginForm);
}

export default function* signUpDataSaga() {
    yield all([
        watchSubmitForm(),
        watchSubmitLoginForm(),
    ]);
}

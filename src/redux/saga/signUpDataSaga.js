import { takeEvery, call, put ,all } from 'redux-saga/effects';
import { toggleLoginState } from '../../redux/LoginState/loginStateAction';
import {  
    setUserExists 
} from '../SignUpData/signUpDataActions';

function* submitForm(action) {
    try {
        const { email, password } = action.payload.formData;
        const response = yield call(fetch, 'http://localhost:8000/api/users/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            if (response.status === 422) {
                yield put(setUserExists('USER ALREADY EXISTS'));
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = yield response.json();
        yield put(toggleLoginState());

    } catch (error) {
        console.error('Error:', error.message);
    }
}

function* submitLoginForm(action) {
    try {
        const { formData, navigate } = action.payload;

        const response = yield call(fetch, 'http://localhost:8000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = yield response.json();
        localStorage.setItem('token', data.data.token);
        navigate('/dashboard');

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

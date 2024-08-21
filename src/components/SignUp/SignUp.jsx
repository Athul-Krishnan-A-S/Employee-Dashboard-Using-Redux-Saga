import Button from '../Button/Button';
import './signup.css';
import {
    registerEmail,
    registerPassword,
    registerConfirmPassword,
    setEmailError,
    setPasswordError,
    submitSignInForm,
} from '../../redux/SignUpData/signUpDataActions';
import { useDispatch, useSelector } from 'react-redux';

function SignUp() {
    const dispatch = useDispatch();
    const { email, password, confirmPassword, EMAIL_ERROR, PASSWORD_ERROR, USER_EXISTS } = useSelector((state) => state.signUpData);

    const handleEmailChange = (e) => {
        dispatch(registerEmail(e.target.value));
    };

    const handlePasswordChange = (e) => {
        dispatch(registerPassword(e.target.value));
    };

    const handleConfirmPasswordChange = (e) => {
        dispatch(registerConfirmPassword(e.target.value));
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();

        dispatch(setEmailError(''));
        dispatch(setPasswordError(''));

        let hasErrors = false;

        if (!email) {
            dispatch(setEmailError('Email is required'));
            hasErrors = true;
        }

        if (!password) {
            dispatch(setPasswordError('Password is required'));
            hasErrors = true;
        }

        if (password !== confirmPassword) {
            dispatch(setPasswordError('Passwords do not match'));
            hasErrors = true;
        }

        if (hasErrors) {
            return;
        } else {
            const formData = { email, password };
            dispatch(submitSignInForm(formData));
        }
    };

    return (
        <div className='signup-container'>
            <form className='register-container' onSubmit={handleSubmitForm}>
                <div className="register-text-container">
                    <p>REGISTER</p>
                </div>
                {USER_EXISTS && <p className="error-msg" >USER ALREADY EXISTS</p>}
                <div>
                    <label htmlFor="email">Your Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    {EMAIL_ERROR && <p className="error-msg">{EMAIL_ERROR}</p>}
                </div>
                <div className="password-container">
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        {PASSWORD_ERROR && <p className="error-msg">{PASSWORD_ERROR}</p>}
                    </div>
                    <div>
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm-password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                        {PASSWORD_ERROR && <p className="error-msg">{PASSWORD_ERROR}</p>}
                    </div>
                </div>
                <Button value='Register' className='blue-btn' type='submit' />
            </form>
        </div>
    );
}

export default SignUp;

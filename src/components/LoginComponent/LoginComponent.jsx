import { useState } from "react";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { submitLoginForm } from "../../redux/SignUpData/signUpDataActions";

function LoginComponent() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailNull, setIsEmailNull] = useState(false);
    const [isPasswordNull, setIsPasswordNull] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLoginFormChange = (event) => {
        const { name, value } = event.target;

        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleLogin = (event) => {
        event.preventDefault();

        let valid = true;
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setIsEmailNull(true);
            valid = false;
        } else {
            setIsEmailNull(false);
        }
        if (!password) {
            setIsPasswordNull(true);
            valid = false;
        } else {
            setIsPasswordNull(false);
        }
        if (valid) {
            const formData = { email, password };
            dispatch(submitLoginForm(formData,navigate))
        }
    };

    return (
        <div className='login-col-2-contents-container'>
            <form className='login-form' onSubmit={handleLogin}>
                <div className='login-text-container'>
                    <p>LOGIN</p>
                </div>
                <div>
                    <label htmlFor="email">Your Email</label>
                    <div className='login-input-container'>
                        <input
                            type='email'
                            name='email'
                            placeholder='Email'
                            value={email}
                            onChange={handleLoginFormChange}
                        />
                        <span className='x-mark'>X</span>
                    </div>
                    {isEmailNull && <p className="error-msg">Invalid Email</p>}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <div className='login-input-container'>
                        <input
                            type='password'
                            name='password'
                            placeholder='Password'
                            value={password}
                            onChange={handleLoginFormChange}
                        />
                        <span className='x-mark'>X</span>
                    </div>
                    {isPasswordNull && <p className="error-msg">Invalid Password</p>}
                </div>
                <div className='login-btn-container'>
                    <Button value="Login" className="blue-btn" />
                </div>
            </form>
        </div>
    );
}

export default LoginComponent;

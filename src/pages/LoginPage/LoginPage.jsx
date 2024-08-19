import Button from '../../components/Button/Button';
import LoginComponent from '../../components/LoginComponent/LoginComponent';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLoginState } from '../../redux/LoginState/loginStateAction';
import './loginPage.css';
import SignUp from '../../components/SignUp/SignUp';

function LoginPage() {
    const { isLogin } = useSelector((state) => state.isLogin);
    const dispatch = useDispatch();

    return (
        <div className="login-page-container">
            <div className="login-container">
                <div className="login-col-1">
                    <div className='login-form-contents-container'>
                        <p>INFORMATION</p>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi placeat porro maiores eos itaque nesciunt iste officiis voluptatibus consequuntur fugit quibusdam ipsam quas nemo, necessitatibus quasi blanditiis minima voluptates error!</p>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi placeat porro maiores eos itaque nesciunt iste officiis voluptatibus consequuntur fugit quibusdam ipsam quas nemo, necessitatibus quasi blanditiis minima voluptates error!</p>
                        <Button value={!isLogin ? "Have an Account" : "Don't Have an Account"} className="white-btn" onClick={() => dispatch(toggleLoginState())} />
                    </div>
                </div>
                <div className="login-col-2">
                    {isLogin ? <LoginComponent /> : <SignUp />}
                </div>
            </div>
        </div>
    );
}

export default LoginPage;

import React, { FC, useState } from 'react';
import Button from '../UI/Button/Button';
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';
import './Login.scss';

const Login: FC = () => {
    const [displayOption, setDisplayOption] = useState('signin');

    const switchDisplayOption = () => {
        if (displayOption === 'signin') {
            setDisplayOption('signup');
        } else {
            setDisplayOption('signin');
        }
    }

    return (
        <div className="login-wrapper">
            <div className="login-switch-btn-wrapper">
                <Button
                    className={ displayOption === 'signup' ? "login-switch-btn-active" : "login-switch-btn" }
                    onClick={ displayOption !== 'signup' ? switchDisplayOption : undefined }>Sign Up</Button>
                <Button
                    className={ displayOption === 'signin' ? "login-switch-btn-active" : "login-switch-btn" }
                    onClick={ displayOption !== 'signin' ? switchDisplayOption : undefined }>Sign In</Button>
            </div>
            { displayOption === 'signin' ? <SignIn/> : <SignUp/> }
        </div>
    );
}

export default Login;

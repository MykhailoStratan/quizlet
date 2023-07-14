import React, { FC, useState } from 'react';
import Button from '../UI/Button/Button';
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';
import { usersService } from '../../services/users/users.service';
import './Login.scss';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '../../store/actions/loginActions';

const DISPLAY_OPTIONS = {
    SIGN_IN: 'signin',
    SIGN_UP: 'signup',
};

const Login: FC = () => {
    const dispatch = useDispatch();
    const [displayOption, setDisplayOption] = useState(DISPLAY_OPTIONS.SIGN_IN);

    const onUserData = (userResponseData: any) => {
        dispatch(setLoggedIn());
        usersService.setActiveUserByEmail(userResponseData.email);
    }

    return (
        <div className="login-wrapper">
            { !usersService.getActiveUser() ? <div className="login-switch-btn-wrapper">
                <Button
                    className={ displayOption === DISPLAY_OPTIONS.SIGN_UP ? "login-switch-btn-active" : "login-switch-btn" }
                    onClick={ () => setDisplayOption(DISPLAY_OPTIONS.SIGN_UP) }>Sign Up</Button>
                <Button
                    className={ displayOption === DISPLAY_OPTIONS.SIGN_IN ? "login-switch-btn-active" : "login-switch-btn" }
                    onClick={ () => setDisplayOption(DISPLAY_OPTIONS.SIGN_IN) }>Sign In</Button>
            </div> : null }
            { displayOption === DISPLAY_OPTIONS.SIGN_IN ? <SignIn onUserData={ onUserData }/> : null }
            { displayOption === DISPLAY_OPTIONS.SIGN_UP ? <SignUp/> : null }
        </div>
    );
}

export default Login;

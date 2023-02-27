import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../UI/Button/Button';
import { authService } from '../../../services/auth/auth.service';
import './SignIn.scss';

interface FormElements extends HTMLFormControlsCollection {
    username: HTMLInputElement;
    password: HTMLInputElement;
}

interface SignInFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

const SignIn: FC<{onUserData: (value: any) => void}> = ({onUserData}) => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (event: React.FormEvent<SignInFormElement>) => {
        event.preventDefault();
        let { username, password } = event.currentTarget;

        try {
            const response = await authService.signIn(username.value, password.value);
            onUserData(response.user);
            navigate('/home');
        } catch (error) {
            setError(`${error}`)
        }

        username.value = '';
        password.value = '';
    };

    return (
        <>
            <form className='signin-form' onSubmit={ handleSignIn }>
                { error ? <div className="signin-form-error">{ error }</div> : null }
                <label htmlFor="username">Username:</label>
                <input id="username" type="text" />
                <label htmlFor="password">Password:</label>
                <input id="password" type="password" />
                <Button>Sign In</Button>
            </form>
        </>
    );
}

export default SignIn;

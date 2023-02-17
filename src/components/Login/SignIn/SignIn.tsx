import React, { FC, useState } from 'react';
import Button from '../../UI/Button/Button';
import { authService } from '../../../services/auth/auth.service';
import { iUser } from '../../../types/user.type';
import { iDictionary } from '../../../types/dictionary.type';
import { dictionaryService } from '../../../services/dictionary/dictionary.service';
import { v4 as uuid } from 'uuid';
import { usersService } from '../../../services/users/users.service';
import './SignIn.scss';

interface FormElements extends HTMLFormControlsCollection {
    username: HTMLInputElement;
    password: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

const SignIn: FC = () => {
    const [error, setError] = useState('');

    const handleSignIn = async (event: React.FormEvent<SignInFormElement>) => {
        event.preventDefault();
        let { username, password } = event.currentTarget;

        try {
            await authService.signIn(username.value, password.value);
        } catch (error) {
            setError(`${error}`)
        }

        username.value = '';
        password.value = '';
    }

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

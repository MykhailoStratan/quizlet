import React, { FC, useState } from 'react';
import Button from '../UI/Button/Button';
import { authService } from '../../services/auth/auth.service';
import { iUser } from '../../types/user.type';
import { iDictionary } from '../../types/dictionary.type';
import { dictionaryService } from '../../services/dictionary/dictionary.service';
import { v4 as uuid } from 'uuid';

interface FormElements extends HTMLFormControlsCollection {
    username: HTMLInputElement;
    password: HTMLInputElement;
}
interface AddCardFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

interface AddCardProps {
    activeUser: iUser;
    dictionary: iDictionary;
}

const Login: FC = () => {
    const [error, setError] = useState('');

    const handleSubmit = async (event: React.FormEvent<AddCardFormElement>) => {
        event.preventDefault();
        let { username, password } = event.currentTarget;

        try {
            await authService.createUser(username.value, password.value);
        } catch (error) {
            console.log(error)
            setError(`${error}`)
        }
    }

    return (
        <>
            <form onSubmit={ handleSubmit }>
                <label htmlFor="username">Enter username:</label>
                <input id="username" type="text" />
                <label htmlFor="password">Enter password:</label>
                <input id="password" type="password" />
                <Button>Login</Button>
                <Button>SignUp</Button>
            </form>
        </>
    );
}

export default Login;

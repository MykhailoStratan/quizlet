import React, { FC, useState } from 'react';
import Button from '../../UI/Button/Button';
import { authService } from '../../../services/auth/auth.service';
import { iUser } from '../../../types/user.type';
import { iDictionary } from '../../../types/dictionary.type';
import { dictionaryService } from '../../../services/dictionary/dictionary.service';
import { v4 as uuid } from 'uuid';
import { usersService } from '../../../services/users/users.service';
import './SignUp.scss';

interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    password: HTMLInputElement;
    name: HTMLInputElement;
}
interface SignUpFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

const SignUp: FC = () => {
    const [error, setError] = useState('');

    const handleSubmit = async (event: React.FormEvent<SignUpFormElement>) => {
        event.preventDefault();
        setError('');

        let { email, password, name } = event.currentTarget;

        try {
            await authService.createUser(email.value, password.value);
        } catch (error) {
            console.log(error)
            setError(`${error}`)
        }

        await usersService.addUser({
            name: name.value,
            email: email.value,
            id: uuid(),
            firebaseId: uuid(),
            dictionaries: []
        })

        email.value = '';
        password.value = '';
        name.value = '';
    }

    return (
        <>

            <form className="signup-form" onSubmit={ handleSubmit }>
                { error ? <div className="signup-form-error">{ error }</div> : null }
                <label htmlFor="email">Email:</label>
                <input id="email" type="text" />
                <label htmlFor="password">Password:</label>
                <input id="password" type="password" />
                <label htmlFor="name">Name:</label>
                <input id="name" type="text" />
                <Button>Sign Up</Button>
            </form>
        </>
    );
}

export default SignUp;

import React, { FC, useState } from 'react';
import { v4 as uuid } from 'uuid';
import Button from '../../UI/Button/Button';
import { authService } from '../../../services/auth/auth.service';
import { usersService } from '../../../services/users/users.service';
import './SignUp.scss';

export interface UserFormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    password: HTMLInputElement;
    name: HTMLInputElement;
    phone: HTMLInputElement;
    surname: HTMLInputElement;
    language: HTMLInputElement;
}

interface SignUpFormElement extends HTMLFormElement {
    readonly elements: UserFormElements;
}

const SignUp: FC = () => {
    const [error, setError] = useState('');

    const handleSubmit = async (event: React.FormEvent<SignUpFormElement>) => {
        event.preventDefault();
        setError('');

        let { email, password, name, phone, surname, language } = event.currentTarget;

        try {
            await authService.createUser(email.value, password.value);
        } catch (error) {
            setError(`${error}`)
        }

        await usersService.addUser({
            // @ts-ignore
            name: name.value,
            email: email.value,
            id: uuid(),
            firebaseId: uuid(),
            dictionaries: [],
            phone: phone.value,
            surname: surname.value,
            language: language.value
        })

        email.value = '';
        password.value = '';
        // @ts-ignore
        name.value = '';
        phone.value = '';
        surname.value = '';
        language.value = '';

    };

    return (
        <>
            <form className="signup-form" onSubmit={ handleSubmit }>
                { error ? <div className="signup-form-error">{ error }</div> : null }
                <label htmlFor="email">Email:<span className="signup-form-required-field">*</span></label>
                <input id="email" type="text" />
                <label htmlFor="password">Password:<span className="signup-form-required-field">*</span></label>
                <input id="password" type="password" />
                <label htmlFor="name">Name:</label>
                <input id="name" type="text" />
                <label htmlFor="surname">Surame:</label>
                <input id="surname" type="text" />
                <label htmlFor="phone">Phone number:</label>
                <input id="phone" type="text" />
                <label htmlFor="language">Language:<span className="signup-form-required-field">*</span></label>
                <input id="language" type="text" />
                <Button>Sign Up</Button>
            </form>
        </>
    );
}

export default SignUp;

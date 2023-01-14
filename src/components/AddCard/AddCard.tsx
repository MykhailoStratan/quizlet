import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import Button from '../UI/Button/Button';
import './AddCard.scss';
import { handleAddCardFormSubmit } from '../../firebase/handlers/handleAddCardFormSubmit';

interface FormElements extends HTMLFormControlsCollection {
    word: HTMLInputElement;
    translation: HTMLInputElement;
}
interface AddCardFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

const AddCard = () => {
    const [error, setError] = useState('');

    const handleSubmit = async (event: React.FormEvent<AddCardFormElement>) => {
        event.preventDefault();
        const { word, translation } = event.currentTarget;
        const response = await handleAddCardFormSubmit('quizlet_pairs', {
            word: word.value.trim(),
            translation: translation.value.trim(),
            id: uuid()
        });
        if (response) {
            setError(response);
        }
    }

    return(
        <form onSubmit={ handleSubmit }>
            {error && <div id="error" className="error">{error}</div>}
            <label htmlFor="word">Enter English word:</label>
            <input id="word" type="text" />
            <label htmlFor="translation">Enter translation:</label>
            <input id="translation" type="text" />
            <Button>Add</Button>
        </form>
    );
}

export default AddCard;

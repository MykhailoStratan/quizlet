import React, { FC, useState } from 'react';
import { v4 as uuid } from 'uuid';
import Button from '../UI/Button/Button';
import type { iDictionary } from '../../types/dictionary.type';
import { dictionaryService } from '../../services/dictionary/dictionary.service';
import './AddCard.scss';

interface FormElements extends HTMLFormControlsCollection {
    word: HTMLInputElement;
    translation: HTMLInputElement;
}
interface AddCardFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

interface AddCardProps {
    dictionary: iDictionary;
}

const AddCard: FC<AddCardProps> = ({ dictionary }) => {
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent<AddCardFormElement>) => {
        event.preventDefault();
        setError('');

        let { word, translation } = event.currentTarget;

        try {
            await dictionaryService.addWordToDictionary(dictionary, {
                word: word.value.trim(),
                translation: translation.value.trim(),
                id: uuid()
            });

            setSuccessMessage(`Word "${word.value.trim( )}" has been added to dictionary ${dictionary.name}!`);

            word.value = '';
            translation.value = '';

        } catch (error) {
            setError(`${error}`)
        }
    }

    return(
        <form className="add-card-form" onSubmit={ handleSubmit }>
            {successMessage && <div id="success">{ successMessage }</div>}
            {error && <div id="error" className="error">{ error }</div>}
            <label htmlFor="word">Enter English word:</label>
            <input id="word" type="text" />
            <label htmlFor="translation">Enter translation:</label>
            <input id="translation" type="text" />
            <Button>Add</Button>
        </form>
    );
}

export default AddCard;

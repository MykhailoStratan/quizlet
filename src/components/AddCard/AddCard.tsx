import React, { FC } from 'react';
import { v4 as uuid } from 'uuid';
import { iCard } from '../../types/card.type';
import Button from '../UI/Button/Button';
import './AddCard.scss';

interface FormElements extends HTMLFormControlsCollection {
    word: HTMLInputElement;
    translation: HTMLInputElement;
}
interface AddCardFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

type AddCardProps = {
    onFormSubmit: (object: iCard) => void;
}

const AddCard: FC<AddCardProps> = ({onFormSubmit}) => {
    const handleSubmit = (event: React.FormEvent<AddCardFormElement>) => {
        event.preventDefault();
        const {word, translation} = event.currentTarget;
        onFormSubmit({
            word: word.value,
            translation: translation.value,
            id: uuid()
        });
    }

    return(
        <form onSubmit={ handleSubmit }>
            <label htmlFor="word">Enter English word:</label>
            <input id="word" type="text" />
            <label htmlFor="translation">Enter translation:</label>
            <input id="translation" type="text" />
            <Button>Add</Button>
        </form>
    );
}

export default AddCard;

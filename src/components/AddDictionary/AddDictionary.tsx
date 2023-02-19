import React, { FC, useEffect } from 'react';
import Button from '../UI/Button/Button';
import { v4 as uuid } from 'uuid';
import './AddDictionary.scss';
import { dictionaryService } from '../../services/dictionary/dictionary.service';

interface FormElements extends HTMLFormControlsCollection {
    name: HTMLInputElement;
}
interface AddDictionaryFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}


const AddDictionary: FC = () => {
    const handleSubmit = async (event: React.FormEvent<AddDictionaryFormElement>) => {
        event.preventDefault();
        let { name } = event.currentTarget;

        try {
            await dictionaryService.postDictionary( {
                // @ts-ignore works as expected
                name: name.value.trim(),
                id: uuid(),
                words:[]
            });
            // @ts-ignore works as expected
            name.value = '';
        } catch (error) {
            console.log(error)
            // setError(`${error}`)
        }
    }

    return (
        <>
            <form onSubmit={ handleSubmit }>
                <div id="error" className="error">{}</div>
                <label htmlFor="name">Enter Dictionary Name:</label>
                <input id="name" type="text" />
                <Button>Add</Button>
            </form>
        </>

    );
}

export default AddDictionary;

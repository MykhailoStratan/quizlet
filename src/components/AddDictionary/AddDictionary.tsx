import React, { FC, useEffect } from 'react';
import Button from '../UI/Button/Button';
import { addCardToDictionary } from '../../firebase/handlers/addCardToDictionary';
import { v4 as uuid } from 'uuid';
import { fetchSubCollection, postToSubCollection } from '../../firebase/actions';
import './AddDictionary.scss';
import { postToDictionary } from '../../firebase/handlers/postToDictionary';

interface FormElements extends HTMLFormControlsCollection {
    word: HTMLInputElement;
    translation: HTMLInputElement;
}
interface AddCardFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

type AddDictionaryProps = {
    activeUser: {name: string, id: string};
}

const AddDictionary: FC = ({  }) => {
    // const handleSubmit = async (event: React.FormEvent<AddCardFormElement>) => {
    //     event.preventDefault();
    //     let { dictionary } = event.currentTarget;
    //
    //     try {
    //         const response = await addDictionary('users', activeUser.id, dictionary.id, {
    //             word: word.value.trim(),
    //             translation: translation.value.trim(),
    //             id: uuid()
    //         });
    //
    //         word.value = '';
    //         translation.value = '';
    //
    //         response && setError(response);
    //     } catch (error) {
    //         console.log(error)
    //         setError(`${error}`)
    //     }
    // }
    const createDictionary = async () => {
        await postToDictionary('users', 'active_user_id_x1c2v3', 'dictionaries', {name: 'Dictionary-2',
            id: 'dictionary_id_1', words: []});
    }

    const getDictionaries = async () => {
        const result = await fetchSubCollection('users', 'active_user_id_x1c2v3', 'dictionaries');
        console.log('getDictionaries', result);
    }

    // useEffect(() => {
    //     (async () => {
    //             await postToSubCollection('users', activeUser.id, 'dictionaries', {name: 'Dictionary-1',
    //             id: 'dictionary_id_1',});
    //
    //     })();
    //
    // },[])

    return (
        <>
            <form onClick={createDictionary}>
                <div id="error" className="error">{}</div>
                <label htmlFor="word">Enter English word:</label>
                <input id="word" type="text" />
                <label htmlFor="translation">Enter translation:</label>
                <input id="translation" type="text" />
                <Button>Add</Button>
            </form>

            <button onClick={getDictionaries}>Get Dictionaries</button>
            <button onClick={getDictionaries}>Create Dictionary</button>
        </>

    );
}

export default AddDictionary;

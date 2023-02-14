import React, { FC, useEffect } from 'react';
import Button from '../UI/Button/Button';
import { v4 as uuid } from 'uuid';
import './AddDictionary.scss';
import { dictionaryService } from '../../services/dictionary/dictionary.service';
import { iUser } from '../../types/user.type';

interface FormElements extends HTMLFormControlsCollection {
    name: HTMLInputElement;
}
interface AddDictionaryFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

type AddDictionaryProps = {
    currentUser: iUser;
}

const AddDictionary: FC<AddDictionaryProps> = ({ currentUser }) => {
    const handleSubmit = async (event: React.FormEvent<AddDictionaryFormElement>) => {
        event.preventDefault();
        let { name } = event.currentTarget;

        try {
            await dictionaryService.postDictionary( {
                // @ts-ignore works as expected
                // todo: find out why did this warning appear
                name: name.value.trim(),
                id: uuid(),
                words:[]
            });

            // const response = await addDictionary('users', activeUser.id, dictionary.id, {
            //     word: word.value.trim(),
            //     translation: translation.value.trim(),
            //     id: uuid()
            // });

            name.value = '';
            // translation.value = '';

            // response && setError(response);
        } catch (error) {
            console.log(error)
            // setError(`${error}`)
        }
    }
    // const createDictionary = async () => {
    //     await dictionaryService.postDictionary({name: 'Dictionary-12', id: uuid(), words:[]})
    //     // await postToDictionary('users', 'active_user_id_x1c2v3', 'dictionaries', {name: 'Dictionary-2',
    //     //     id: 'dictionary_id_1', words: []});
    // }

    // const getDictionaries = async () => {
    //     await dictionaryService.getDictionaries()
    //     const result = await fetchSubCollection('users', 'active_user_id_x1c2v3', 'dictionaries');
    //     console.log('getDictionaries', result);
    // }

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
            <form onSubmit={ handleSubmit }>
                <div id="error" className="error">{}</div>
                <label htmlFor="name">Enter Dictionary Name:</label>
                <input id="name" type="text" />
                <Button>Add</Button>
            </form>

            {/*<button onClick={getDictionaries}>Get Dictionaries</button>*/}
            {/*<button onClick={getDictionaries}>Create Dictionary</button>*/}
        </>

    );
}

export default AddDictionary;

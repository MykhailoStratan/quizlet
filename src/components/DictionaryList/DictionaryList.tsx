import React, { FC, useEffect, useState } from 'react';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import AddDictionary from '../AddDictionary/AddDictionary';
import type { iDictionary } from '../../types/dictionary.type';
import { dictionaryService } from '../../services/dictionary/dictionary.service';
import './DictionaryList.scss';
import { collection, doc, onSnapshot } from '@firebase/firestore';
import { db } from '../../firebase/firebase';
import { usersService } from '../../services/users/users.service';

interface DictionaryListProps {
    onDictionarySelect: (dictionary: iDictionary) => void,
    activeDictionary: iDictionary,
}

const DictionaryList: FC<DictionaryListProps> = ({ onDictionarySelect, activeDictionary }) => {
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [dictionaries, setDictionaries] = useState<iDictionary[]>([]);
    const [dictionarySize, setDictionarySize] = useState<number>(0);

    const handleSelectChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        // if (event.currentTarget.value === 'Add new dictionary') {
        //     setShowAddModal(true);
        //     event.currentTarget.value = dictionaries[0].name;
        //     return;
        // } //todo: create option to add new dictionary

        const selectedDictionary = dictionaries.find(dictionary => dictionary.name === event.currentTarget.value);

        if (selectedDictionary) {
            onDictionarySelect(selectedDictionary);

            const activeDictionaryWords = await dictionaryService.getWordsFromDictionary(selectedDictionary);
            activeDictionaryWords ? setDictionarySize(activeDictionaryWords.length) : null;
        }
    };

    const onModalClick = async (event:  React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        setShowAddModal(false);
        setDictionaries(await dictionaryService.getDictionaries());
    };

    useEffect(() => {
        (async () => {
            setDictionaries(await dictionaryService.getDictionaries());
            setDictionarySize(activeDictionary.words.length);
        })();

        const collectionRef = collection(db, 'users');

        const unsubscribe = onSnapshot(collectionRef, {
            next: (snapshot) => {
            const updatedData: any = snapshot.docs.find((doc) => doc.data().id === usersService.getActiveUser()!.id);

            const dictionaries = updatedData.data().dictionaries;
            setDictionaries(dictionaries);

            const currentDictionary = dictionaries.find((dictionary: iDictionary) => dictionary.name === activeDictionary.name)
            setDictionarySize(currentDictionary.words.length);
        }});

        return () => {
            unsubscribe();
        };
    }, [])

    return (
      <div className="dictionary">
        <div className="dictionary-list">
          <select
              onChange={ handleSelectChange }
          > // todo: create custom dropdown component
              { dictionaries.map(dictionary => {
                if (dictionary.name === activeDictionary.name) {
                    return <option
                        key={ dictionary.id }
                        value={ dictionary.name }
                        selected
                    >{ dictionary.name }</option>
                }
                  return <option
                      key={ dictionary.id }
                      value={ dictionary.name }
                  >{ dictionary.name }</option>
              }) }
              {/*<option*/} //todo: create option to add new dictionary
              {/*    onSelect={ () => setShowAddModal(true) }*/}
              {/*    key={ 'default-option' }*/}
              {/*    value={ 'Add new dictionary' }*/}
              {/*>Add new dictionary</option>*/}
          </select>
          <Button className={"btn-add-dictionary"} onClick={ () => setShowAddModal(true) }>Add</Button>
          { showAddModal ? <Modal onClick={ onModalClick }><AddDictionary></AddDictionary></Modal> : null }
        </div>
        <div className="dictionary-words-counter">
            <p>Words: { dictionarySize } </p>
        </div>
      </div>
    );
}

export default DictionaryList;

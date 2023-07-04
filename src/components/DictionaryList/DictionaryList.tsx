import React, { FC, useEffect, useState } from 'react';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import AddDictionary from '../AddDictionary/AddDictionary';
import type { iDictionary } from '../../types/dictionary.type';
import { dictionaryService } from '../../services/dictionary/dictionary.service';
import './DictionaryList.scss';
import Dropdown from '../UI/Dropdown/Dropdown';

interface DictionaryListProps {
    onDictionarySelect: (dictionary: iDictionary) => void,
    activeDictionary: iDictionary,
}

const DictionaryList: FC<DictionaryListProps> = ({ onDictionarySelect, activeDictionary }) => {
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [dictionaries, setDictionaries] = useState<iDictionary[]>([]);
    const [selectedDictionary, setSelectedDictionary] = useState<iDictionary>(activeDictionary);
    const [dictionarySize, setDictionarySize] = useState<number | null>(null);

    const handleSelectChange = async (target: string) => {
        // if (event.currentTarget.value === 'Add new dictionary') {
        //     setShowAddModal(true);
        //     event.currentTarget.value = dictionaries[0].name;
        //     return;
        // } //todo: create option to add new dictionary
        console.log(target)
        const dictionaryToSelect = dictionaries.find(dictionary => dictionary.name === target);

        if (dictionaryToSelect) {
            onDictionarySelect(dictionaryToSelect);
            setSelectedDictionary(dictionaryToSelect);
            
            const selectedDictionaryWords = await dictionaryService.getWordsFromDictionary(dictionaryToSelect);
            console.log(selectedDictionaryWords)
            selectedDictionaryWords ? setDictionarySize(selectedDictionaryWords.length) : setDictionarySize(null);
            // todo: somewhere here a problem with dictionary size set after adding a new word to a dictionary
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
            setDictionarySize(selectedDictionary.words.length);
        })();

        console.log('SELECTED DICTIONARY', selectedDictionary)

        dictionaryService.getDictionaryWordsCount(selectedDictionary, setDictionarySize);
    }, [activeDictionary])

    return (
      <div className="dictionary">
        <div className="dictionary-list">
            { dictionaries.length 
            ? <Dropdown 
                list={dictionaries.map(dictionary => {
                    if (dictionary.name === activeDictionary.name) {
                        return {itemName: dictionary.name, selected: true}
                    } else {
                      return {itemName: dictionary.name, selected: false}
                    }
                    })}
                onChange={ handleSelectChange }></Dropdown> 
                : null }
          
          <Button className={"btn-add-dictionary"} onClick={ () => setShowAddModal(true) }>Add</Button>
          { showAddModal ? <Modal onClick={ onModalClick }><AddDictionary></AddDictionary></Modal> : null }
        </div>
        <div className="dictionary-words-counter">
            { dictionarySize ? <p>Words: { dictionarySize } </p> : <p>{ `No words here :(` } </p>}
        </div>
      </div>
    );
}

export default DictionaryList;

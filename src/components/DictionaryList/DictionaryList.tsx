import React, { FC, useEffect, useState } from 'react';
import './DictionaryList.scss';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import AddDictionary from '../AddDictionary/AddDictionary';
import { iUser } from '../../types/user.type';
import { dictionaryService } from '../../services/dictionary/dictionary.service';
import { iDictionary } from '../../types/dictionary.type';

interface DictionaryListProps {
    onDictionarySelect: (dictionary: iDictionary) => void,
    currentUser: iUser,
    dictionaries: iDictionary[],
}

const DictionaryList: FC<DictionaryListProps> = ({ onDictionarySelect, currentUser, dictionaries}) => {
    // const [dictionaries, setDictionaries] = useState<iDictionary[]>([]);
    const [showAddModal, setShowAddModal] = useState<boolean>(false);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const currentDictionary = dictionaries.find(dictionary => dictionary.name === event.currentTarget.value);
        console.log(dictionaries)
        console.log(event.currentTarget)
        if (currentDictionary) {
            onDictionarySelect(currentDictionary);
        }
    };

    const onModalClick = (event:  React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        console.log(event.currentTarget)
        setShowAddModal(false);
    };

    // async function updateDictionaries() {
    //     const dictionaries = await dictionaryService.getDictionaries(currentUser);
    //     setDictionaries(dictionaries);
    // }

    // useEffect(() => {
    //     // (async () => {
    //     //     await updateDictionaries();
    //     // })();
    //     setDictionaries(currentUser.dictionaries);
    // }, [currentUser.dictionaries.length])

    return (
      <div className="dictionary-list">
          <select
              onChange={ handleSelectChange }
          > // todo: create custom dropdown component
              { dictionaries.map(dictionary => {
                  return <option
                      key={ dictionary.id }
                      value={ dictionary.name }
                  >
                      { dictionary.name }
                  </option>
              }) }
          </select>
          <Button className={'btn-add-dictionary'} onClick={ () => setShowAddModal(true) }>+</Button>
          { showAddModal ? <Modal onClick={ onModalClick }><AddDictionary currentUser={ currentUser }></AddDictionary></Modal> : null }
      </div>
    );
}

export default DictionaryList;

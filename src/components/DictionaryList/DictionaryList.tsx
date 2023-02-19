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
}

const DictionaryList: FC<DictionaryListProps> = ({ onDictionarySelect }) => {
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [dictionaries, setDictionaries] = useState<iDictionary[]>([]);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const currentDictionary = dictionaries.find(dictionary => dictionary.name === event.currentTarget.value);

        if (currentDictionary) {
            onDictionarySelect(currentDictionary);
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
        })();
    }, [])

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
          { showAddModal ? <Modal onClick={ onModalClick }><AddDictionary></AddDictionary></Modal> : null }
      </div>
    );
}

export default DictionaryList;

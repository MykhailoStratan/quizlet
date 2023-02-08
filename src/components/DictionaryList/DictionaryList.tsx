import React, { FC, useState } from 'react';
import './DictionaryList.scss';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import AddDictionary from '../AddDictionary/AddDictionary';

interface DictionaryListProps {
    dictionaries: { id: string, name: string }[],
    onDictionarySelect: (dictionaryId: string) => void,
}

const DictionaryList: FC<DictionaryListProps> = ({dictionaries, onDictionarySelect}) => {
    const [showAddModal, setShowAddModal] = useState<boolean>(false);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onDictionarySelect(event.currentTarget.value);
    };

    const onAddDictionaryClick = () => {
        return true;
    };

    return (
      <div className="dictionary-list">
          <select
              onChange={ handleSelectChange }
          > // todo: create custom dropdown component
              {dictionaries.map(dictionary => {
                  return <option
                      key={ dictionary.id }
                      value={ dictionary.id }
                  >
                      { dictionary.name }
                  </option>
              })}
          </select>
          <Button className={'btn-add-dictionary'} onClick={ () => setShowAddModal(true)}>+</Button>
          { showAddModal ? <Modal onClick={() => setShowAddModal(false)}><AddDictionary></AddDictionary></Modal> : null }
      </div>
    );
}

export default DictionaryList;

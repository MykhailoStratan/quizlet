import React, { FC } from 'react';
import './DictionaryList.scss';

interface DictionaryListProps {
    dictionaries: { id: string, name: string }[],
    onDictionarySelect: (dictionaryId: string) => void,
}

const DictionaryList: FC<DictionaryListProps> = ({dictionaries, onDictionarySelect}) => {
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onDictionarySelect(event.currentTarget.value);
    }

    return (
      <div className="dictionary-list">
          <select
              // onSelect={() => onDictionarySelect(dictionary)}
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

      </div>
    );
}

export default DictionaryList;

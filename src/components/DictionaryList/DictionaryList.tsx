import { FC, useEffect, useState } from 'react';
import Button from '../UI/Button/Button';
import type { iDictionary } from '../../types/dictionary.type';
import { dictionaryService } from '../../services/dictionary/dictionary.service';
import './DictionaryList.scss';
import Dropdown from '../UI/Dropdown/Dropdown';
import { Link } from 'react-router-dom';
import Loading from '../UI/Loading/Loading';

interface DictionaryListProps {
    onDictionarySelect: (dictionary: iDictionary) => void,
    activeDictionary: iDictionary,
}

const DictionaryList: FC<DictionaryListProps> = ({ onDictionarySelect, activeDictionary }) => {
    const [activeButton, setActiveButton] = useState<string | null>(null);
    const [dictionaries, setDictionaries] = useState<iDictionary[]>([]);
    const [selectedDictionary, setSelectedDictionary] = useState<iDictionary>(activeDictionary);
    const [dictionarySize, setDictionarySize] = useState<number | null>(null);

    const handleSelectChange = async (target: string) => {
        const dictionaryToSelect = dictionaries.find(dictionary => dictionary.name === target);

        if (dictionaryToSelect) {
            onDictionarySelect(dictionaryToSelect);
            setSelectedDictionary(dictionaryToSelect);
            
            const selectedDictionaryWords = await dictionaryService.getWordsFromDictionary(dictionaryToSelect);
            selectedDictionaryWords ? setDictionarySize(selectedDictionaryWords.length) : setDictionarySize(null);
        }
    };

    useEffect(() => {
        (async () => {
            setDictionaries(await dictionaryService.getDictionaries());
            setDictionarySize(selectedDictionary.words.length);
        })();

        dictionaryService.getDictionaryWordsCount(selectedDictionary, setDictionarySize);
    }, [activeDictionary])

    return (
      <div className="dictionary">
        <div className="dictionary-list">
            { dictionaries.length 
            ? 
              <>
                <Dropdown 
                    list={dictionaries.map(dictionary => {
                        if (dictionary.name === activeDictionary.name) {
                            return {itemName: dictionary.name, selected: true}
                        } else {
                        return {itemName: dictionary.name, selected: false}
                        }
                        })}
                    onChange={ handleSelectChange }></Dropdown> 
                <div className="dictionary-list-buttons">
                    <Link to="/add-new-dictionary">
                        <Button 
                            className={  activeButton === 'dictionary' ? "btn-add active" : "btn-add" } 
                            onClick={ () => setActiveButton('dictionary') }>Add dictionary</Button>
                    </Link>
                    <Link to="/add-new-word">
                        <Button 
                            className={ activeButton === 'word' ? "btn-add active" : "btn-add" }
                            onClick={ () => setActiveButton('word') }>Add new word</Button>
                    </Link>
                </div>
              </>
                : <Loading/> }          
        </div>
        { dictionaries.length ? <div className="dictionary-words-counter">
            { dictionarySize ? <p>Words: { dictionarySize } </p> : <p>{ `No words here :(` } </p>}
        </div> : null }
      </div>
    );
}

export default DictionaryList;

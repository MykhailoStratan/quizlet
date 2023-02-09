import './App.css'
import Menu from './components/Menu/Menu';
import CardsCarousel from './components/CardsCarousel/CardsCarousel';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddCard from './components/AddCard/AddCard';
import React, { useEffect, useState } from 'react';
import DictionaryList from './components/DictionaryList/DictionaryList';
import WordInfo from './components/WordInfo/WordInfo';
import { iWordInfo } from './types/word-info.type';
import { iDictionary } from './types/dictionary.type';

import { firebaseActions } from './firebase/firebase.actions';
import { iUser } from './types/user.type';
import { dictionaryService } from './services/dictionary/dictionary.service';

function App() {
    const menu = [ 'Home', 'Learn', 'Add New Words' ];
    const [activeUser, setActiveUser] = useState<iUser>();
    const [dictionaries, setDictionaries] = useState<iDictionary[]>([]);
    const [activeDictionary, setActiveDictionary] = useState<iDictionary>();
    const [wordInfo, setWordInfo] = useState<iWordInfo>();
    const [showWordInfo, setShowWordInfo] = useState<boolean>(false);

    const onSelectActiveDictionary = (dictionaryId: string) => {
        const dictionary = dictionaries.find(dictionary => dictionary.id === dictionaryId) || dictionaries[0];
        setActiveDictionary(dictionary);
    };

    function onCurrentWordChange(wordData: iWordInfo) {
        if (wordData) {
            setWordInfo(wordData);
        }
    }

    function isWordInfoShown(wordInfoShowState: boolean) {
        setShowWordInfo(wordInfoShowState);
    }

    useEffect(() => {
        (async () => {
            const result = await firebaseActions.getCollection<iUser>('users' )
            const dictionaries = await dictionaryService.getDictionaries(result[0]);
            setActiveUser(result[0]);
            setDictionaries(dictionaries);
            setActiveDictionary(dictionaries[0]);
        })();

    },[])



    return (
        <div className="App">
            <Router>
                <Menu menuOptions={ menu }></Menu>
                <Routes>
                    <Route path="/" element={ <div style={{ fontSize: '100px' }}>Welcome to Quizlet!</div> } />
                    <Route path="/home" element={ <div style={{ fontSize: '100px' }}>Welcome to Quizlet!</div> } />
                    <Route path="/learn" element={
                        dictionaries.length && activeDictionary && activeUser
                            ? <>
                                <DictionaryList dictionaries={ dictionaries } onDictionarySelect={ onSelectActiveDictionary } />
                                <CardsCarousel activeUser={ activeUser } dictionary={ activeDictionary } onCurrentWordChange={ onCurrentWordChange } className={ showWordInfo ? 'word-info-shown' : '' }/>
                                { wordInfo ? <WordInfo wordInfo={ wordInfo } isShowWordInfo={showWordInfo} onShowWordInfoChange={ isWordInfoShown }></WordInfo> : null }
                            </>
                            : null
                    }/>
                    <Route path="/add-new-words" element={
                        dictionaries.length && activeDictionary && activeUser
                            ? <>
                                <DictionaryList dictionaries={ dictionaries } onDictionarySelect={ onSelectActiveDictionary } />
                                <AddCard activeUser={ activeUser } dictionary={ activeDictionary } />
                            </>
                            : null
                    }/>
                </Routes>
            </Router>
        </div>
    );
}

export default App

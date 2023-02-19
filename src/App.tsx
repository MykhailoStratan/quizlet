import './App.css'
import Menu from './components/Menu/Menu';
import CardsCarousel from './components/CardsCarousel/CardsCarousel';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddCard from './components/AddCard/AddCard';
import React, { FC, useEffect, useState } from 'react';
import DictionaryList from './components/DictionaryList/DictionaryList';
import WordInfo from './components/WordInfo/WordInfo';
import Login from './components/Login/Login';
import { iWordInfo } from './types/word-info.type';
import { iDictionary } from './types/dictionary.type';
import { usersService } from './services/users/users.service';
import LogOut from './components/Login/LogOut/LogOut';

const defaultMenu = [ 'Home', 'Learn', 'Add New Words' ];

const App: FC = () => {
    const [menu, setMenu] = useState(defaultMenu);
    const [isLogged, setIsLogged] = useState(!!localStorage.getItem('user'));

    const [activeDictionary, setActiveDictionary] = useState<iDictionary>();
    const [wordInfo, setWordInfo] = useState<iWordInfo | null>(null);
    const [showWordInfo, setShowWordInfo] = useState<boolean>(false);

    const onSelectActiveDictionary = (dictionary: iDictionary) => {
        setActiveDictionary(dictionary);

        if (!dictionary.words.length) {
            setWordInfo(null);
        }
    };

    const getMenuOptions = () => {
        const result = usersService.getActiveUser() ? defaultMenu : ['Home', 'Login'];
        return result;
    }

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
            const activeUserSubscription = await usersService.subscribeToUsers();

            setMenu(getMenuOptions());
        })();

        setActiveDictionary(usersService.getActiveUser()?.dictionaries[0]);

    },[isLogged])

    return (
        <div className="App">
            <Router>
                <Menu menuOptions={ menu }></Menu>
                <Routes>
                    <Route path="/" element={ <div style={{ fontSize: '100px' }}>Welcome to Quizlet!</div> } />
                    <Route path="/home" element={ <div style={{ fontSize: '100px' }}>Welcome to Quizlet!</div> } />
                    <Route path="/learn" element={
                        activeDictionary
                            ? <>
                                <DictionaryList onDictionarySelect={ onSelectActiveDictionary } />
                                <CardsCarousel
                                    dictionary={ activeDictionary }
                                    onCurrentWordChange={ onCurrentWordChange }
                                    className={ showWordInfo ? 'word-info-shown' : '' }
                                />
                                { wordInfo ? <WordInfo
                                    wordInfo={ wordInfo } // todo: subscription for words to receive updates?
                                    isShowWordInfo={showWordInfo}
                                    onShowWordInfoChange={ isWordInfoShown }
                                ></WordInfo> : null }
                            </>
                            : null
                    }/>
                    <Route path="/add-new-words" element={
                        activeDictionary
                            ? <>
                                <DictionaryList onDictionarySelect={ onSelectActiveDictionary } />
                                <AddCard dictionary={ activeDictionary } />
                            </>
                            : null
                    }/>
                    <Route path="/login" element={
                            !isLogged ? <Login setIsLogged={ setIsLogged }/> : null
                        } />
                </Routes>
                { isLogged ? <LogOut setIsLogged={ setIsLogged }/> : null }
            </Router>
        </div>
    );
}

export default App

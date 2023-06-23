import React, { FC, useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import CardsCarousel from './components/CardsCarousel/CardsCarousel';
import DictionaryList from './components/DictionaryList/DictionaryList';
import AddCard from './components/AddCard/AddCard';
import WordInfo from './components/WordInfo/WordInfo';
import Login from './components/Login/Login';
import LogOut from './components/Login/LogOut/LogOut';
import type { iWordInfo } from './types/word-info.type';
import type { iDictionary } from './types/dictionary.type';
import { usersService } from './services/users/users.service';
import './App.css'
import Home from './components/Home/Home';

const defaultMenu = [ 'Home', 'Learn', 'Add New Words' ];

const App: FC = () => {
    const [menu, setMenu] = useState(defaultMenu);
    const [isLogged, setIsLogged] = useState(!!localStorage.getItem('user'));

    const [activeDictionary, setActiveDictionary] = useState<iDictionary | null>();
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

    function onCurrentWordChange(wordData: iWordInfo | null) {
        if (wordData) {
            setWordInfo(wordData);
        } else {
            setWordInfo(null)
        }
    }

    function isWordInfoShown(wordInfoShowState: boolean) {
        setShowWordInfo(wordInfoShowState);
    }

    useEffect(() => {
        (async () => {
            await usersService.updateUsers();

            setMenu(getMenuOptions());
        })();

        const activeUser = usersService.getActiveUser();

        if (activeUser) {
            setActiveDictionary(activeUser.dictionaries[0]);
        } else {
            setActiveDictionary(null);
        }


    },[isLogged])

    return (
        <div className="App">
            <Router basename="/quizlet">
                <Menu menuOptions={ menu }></Menu>
                <Routes>
                    <Route path="/" element={ <Home isLogged={ isLogged }/>} />
                    <Route path="/home" element={ <Home isLogged={ isLogged }/> } />
                    <Route path="/learn" element={
                        activeDictionary
                            ? <>
                                <DictionaryList 
                                    onDictionarySelect={ onSelectActiveDictionary }
                                    activeDictionary={ activeDictionary } />
                                <CardsCarousel
                                    dictionary={ activeDictionary }
                                    onCurrentWordChange={ onCurrentWordChange }
                                    className={ showWordInfo ? 'word-info-shown' : '' }
                                />
                                { wordInfo ? <WordInfo
                                    wordInfo={ wordInfo } // todo: subscription for words to receive updates?
                                    isShowWordInfo={ showWordInfo }
                                    onShowWordInfoChange={ isWordInfoShown }
                                ></WordInfo> : null }
                            </>
                            : null
                    }/>
                    <Route path="/add-new-words" element={
                        activeDictionary
                            ? <>
                                <DictionaryList 
                                    onDictionarySelect={ onSelectActiveDictionary }
                                    activeDictionary={ activeDictionary } />
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

export default App;

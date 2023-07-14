import { FC, useEffect, useState } from 'react';
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
import UserInfo from './components/UserInfo/UserInfo';
import { iUser } from './types/user.type';
import AddDictionary from './components/AddDictionary/AddDictionary';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedIn } from './store/actions/loginActions';
import { RootState } from './store/store';

const defaultMenu = [ 'Home', 'Learn', 'User' ];

const App: FC = () => {
    const dispatch = useDispatch();
    

    const isLogged = useSelector((state: RootState) => state.login.isLogged);
    
    const [menu, setMenu] = useState(defaultMenu);
    // const [isLogged, setIsLogged] = useState(!!localStorage.getItem('user'));

    const [activeDictionary, setActiveDictionary] = useState<iDictionary | null>(null);
    const [activeUser, setActiveUser] = useState<iUser>();
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
        !!localStorage.getItem('user') ?? dispatch(setLoggedIn());
        (async () => {
            await usersService.updateUsers();

            setMenu(getMenuOptions());
        })();

        const activeUser = usersService.getActiveUser();

        if (activeUser) {
            setActiveUser(activeUser);
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
                                    wordInfo={ wordInfo }
                                    isShowWordInfo={ showWordInfo }
                                    onShowWordInfoChange={ isWordInfoShown }
                                ></WordInfo> : null }
                            </>
                            : null
                    }/>
                    <Route path="/add-new-word" element={
                        activeDictionary
                            ? <>
                                <DictionaryList 
                                    onDictionarySelect={ onSelectActiveDictionary }
                                    activeDictionary={ activeDictionary } />
                                <AddCard dictionary={ activeDictionary } />
                            </>
                            : null
                    }/>
                    <Route path="/add-new-dictionary" element={
                        activeDictionary
                            ? <>
                                <DictionaryList 
                                    onDictionarySelect={ onSelectActiveDictionary }
                                    activeDictionary={ activeDictionary } />
                                <AddDictionary />
                            </>
                            : null
                    }/>
                    { activeUser 
                        ? <Route path="/user" element={
                            <UserInfo activeUser={ activeUser }/>
                        }/> 
                        : null }
                    <Route path="/login" element={
                            !isLogged ? <Login/> : null
                        } />
                </Routes>
                { isLogged ? <LogOut/> : null }
            </Router>
        </div>
    );
}

export default App;

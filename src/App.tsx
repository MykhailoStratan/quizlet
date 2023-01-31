import './App.css'
import Menu from './components/Menu/Menu';
import CardsCarousel from './components/CardsCarousel/CardsCarousel';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddCard from './components/AddCard/AddCard';
import { useState } from 'react';
import DictionaryList from './components/DictionaryList/DictionaryList';

function App() {
    const menu = [ 'Home', 'Learn', 'Add New Words' ];
    const activeUser = {
        name: 'User-1',
        id: 'active_user_id_x1c2v3',
    };
    const dictionaries = [
        {
            name: 'Dictionary-1',
            id: 'dictionary_id_1',
        },
        {
            name: 'Dictionary-2',
            id: 'dictionary_id_2',
        },
        {
            name: 'Dictionary-3',
            id: 'dictionary_id_3',
        },
        {
            name: 'Dictionary-4',
            id: 'dictionary_id_4',
        },
    ];
    const [activeDictionary, setActiveDictionary] = useState(dictionaries[0]);

    const onSelectActiveDictionary = (dictionaryId: string) => {
        const dictionary = dictionaries.find(dictionary => dictionary.id === dictionaryId) || dictionaries[0];
        setActiveDictionary(dictionary);
        console.log(activeDictionary);
    }

    return (
        <div className="App">
            <Router>
                <Menu menuOptions={ menu }></Menu>
                <Routes>
                    <Route path="/" element={ <div style={{ fontSize: '100px' }}>Welcome to Quizlet!</div> }/>
                    <Route path="/home" element={ <div style={{ fontSize: '100px' }}>Welcome to Quizlet!</div> }/>
                    <Route path="/learn" element={
                        <>
                            <CardsCarousel activeUser={ activeUser } dictionary={ activeDictionary }/>
                            <DictionaryList dictionaries={ dictionaries } onDictionarySelect={ onSelectActiveDictionary }></DictionaryList>
                        </>
                    }/>
                    <Route path="/add-new-words" element={
                        <>
                            <AddCard activeUser={ activeUser } dictionary={ activeDictionary } />
                            <DictionaryList dictionaries={ dictionaries } onDictionarySelect={ onSelectActiveDictionary }></DictionaryList>
                        </>

                    }/>
                </Routes>
            </Router>
        </div>
    );
}

export default App

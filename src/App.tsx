import { useEffect, useState } from 'react'
import './App.css'
import Menu from './components/Menu/Menu';
import { iCard } from './types/card.type';
import CardsCarousel from './components/CardsCarousel/CardsCarousel';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddCard from './components/AddCard/AddCard';
import { fetchDataFromCollection } from './firebase/actions/fetchFromCollection';
import { getCardsFromQuerySnapshot } from './firebase/utils/utils';

function App() {
    const [cards, setCards] = useState<iCard[]>([]);
    const menu = [ 'Home', 'Learn', 'Add New Words' ];

    const fetchCards = async () => {
        const docs = await fetchDataFromCollection('quizlet_pairs');
        const newData: iCard[] = getCardsFromQuerySnapshot(docs)
        // const uniqueData = new Set(newData);
        setCards(newData);

    }

    useEffect(() => {
        fetchCards();
    },[])

    return (
        <div className="App">
            <Router>
                <Menu menuOptions={menu}></Menu>
                <Routes>
                    <Route path="/" element={<div style={{ fontSize: '100px' }}>Welcome to Quizlet!</div>}/>
                    <Route path="/home" element={<div style={{ fontSize: '100px' }}>Welcome to Quizlet!</div>}/>
                    <Route path="/learn" element={<CardsCarousel cards={cards}/>}/>
                    <Route path="/add-new-words" element={<AddCard/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App

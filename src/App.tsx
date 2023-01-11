import { useState } from 'react'
import './App.css'
import Menu from './components/Menu/Menu';
import { iCard } from './types/card.type';
import CardsCarousel from './components/CardsCarousel/CardsCarousel';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  const cards: iCard[] = [
      { id: 'xxx1', word: 'chicken', translation: 'курица' },
      { id: 'xxx2', word: 'table', translation: 'стол' },
      { id: 'xxx3', word: 'bread', translation: 'хлеб' },
      { id: 'xxx4', word: 'gas', translation: 'бензин' },
      { id: 'xxx5', word: 'earth', translation: 'земля' },
  ];
  const menu = ['Home', 'Learn', 'Add New Words'];


  return (
      <div className="App">
          <Router>
              <Menu menuOptions={menu}></Menu>
              <Routes>
                  <Route path="/home" element={<div style={{fontSize: "100px"}}>Welcome to Quizlet!</div>}/>
                  <Route path="/learn" element={<CardsCarousel cards={cards}/>} />
                  <Route path="/add-new-words" element={<CardsCarousel cards={cards}/>} />
              </Routes>
          </Router>
      </div>
  );
}

export default App

import React, { FC } from 'react';
import './Home.scss';
import Button from '../UI/Button/Button';
import { useNavigate } from 'react-router-dom';

const Home: FC<{isLogged: boolean}> = ({isLogged}) => {
    const navigate = useNavigate();

    const onCLick = () => {
        isLogged ? navigate('/learn') : navigate('/login');
    }

    return (
        <>
            <div className="home">
                Welcome to Quizlet!
            </div>
            <Button className="home-nav-btn" onClick={onCLick}>{ isLogged ? 'Go Learn!' : 'Go to Login' }</Button>
        </>



    );
};

export default Home;

import { FC } from 'react';
import './Home.scss';
import Button from '../UI/Button/Button';
import { useNavigate } from 'react-router-dom';
import SplitText from '../UI/SplitText/SplitText';
import Footer from '../UI/Footer/Footer';
import CardsMock from '../Card/CardsMock/CardsMock';
import TextHighlight from '../Demo/TextHighlight/TextHighlight';



const Home: FC<{ isLogged: boolean }> = ({ isLogged }) => {
    const navigate = useNavigate();

    const onCLick = () => {
        isLogged ? navigate('/learn') : navigate('/login');
    };

    return (
        <>
            <div className="home">
                <CardsMock/>
                <SplitText>Welcome to LingoFlips!</SplitText>
                <Button className="home-nav-btn" onClick={ onCLick }>{ isLogged ? 'Go Learn!' : 'Go to Login' }</Button>
            </div>
            <Footer/>
        </>
    );
};

export default Home;

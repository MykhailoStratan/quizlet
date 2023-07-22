import { FC, useEffect, useState } from 'react';
import type { iWord } from '../../../types/card.type';
import './CardsMock.scss';

const wordsMock: string[] = ['Butterfly', 'Mariposa', 'Schmetterling', '나비', 'Fjäril', 'バタフライ']

const CardsMock: FC = () =>  {
    const [flipped, setFlipped] = useState<boolean>(true);
    const [wordCounter, setWordCounter] = useState<number>(0);
    const [word, setWord] = useState<string | null>(wordsMock[0]);
    const [translation, setTranslation] = useState<string | null>(wordsMock[1]);

    useEffect(() => {
        const clickCardLoop = setInterval(() =>  {
            flipped ? setTranslationData() : setWordData();
            flipCard();
        }, 2000);
    
        return () => {
            clearInterval(clickCardLoop);
        };
    }, [flipped]);

    function setWordData() {
        if (wordCounter === wordsMock.length-1) {
            setWord(wordsMock[wordCounter])
            setWordCounter(0);
        } else {
            setWord(wordsMock[wordCounter]);
            setWordCounter(wordCounter+1);
        }
    }

    function setTranslationData() {
        if (wordCounter === wordsMock.length-1) {
            setTranslation(wordsMock[wordCounter])
            setWordCounter(0);
        } else {
            setTranslation(wordsMock[wordCounter]);
            setWordCounter(wordCounter+1);
        }
    }

    const flipCard = () => {
        setFlipped(!flipped);
    };

    const cardInnerClassName = (): string => {
        return flipped ? 'card-inner' : 'card-inner showBack';
    };

    const cardOuterClassName = (): string => {
        return `card-outer activeCard`;
    };

    return (
        <div
            className={ cardOuterClassName() }
        >
            <div
                className={ cardInnerClassName() }
                onClick={ flipCard }
            >
                <div className="card front">
                    <div className="card-body">
                        <div className="card-text">{ word }</div>
                    </div>
                </div>
                <div className="card back">
                    <div className="card-body">
                        <div className="card-text">{ translation }</div>
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default CardsMock;

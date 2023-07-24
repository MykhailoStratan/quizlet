import React, { FC, useEffect, useRef, useState } from 'react';
import Card from '../Card/Card';
import Button from '../UI/Button/Button';
import type { iDictionary } from '../../types/dictionary.type';
import type { iWord } from '../../types/card.type';
import { dictionaryService } from '../../services/dictionary/dictionary.service';
import { getAllByWord } from '../../words-api/words-api';
import './CardsCarousel.scss';

interface CardsCarouselProps {
    dictionary: iDictionary;
    onCurrentWordChange: (data: any) => void;
    className?: string;
}

const CardsCarousel: FC<CardsCarouselProps> = ({ dictionary, onCurrentWordChange, className }) => {
    const [cards, setCards] = useState<iWord[]>([]);
    const [cardIndex, setCardIndex] = useState<number>(0);
    const [currentCard, setCurrentCard] = useState<iWord>();

    const prevBtn = useRef<HTMLElement | null>(null);
    const nextBtn = useRef<HTMLElement | null>(null);

    const slideButtonClassName = (buttonSide: 'prev' | 'next') => {
        if (buttonSide === 'prev') {
            return cardIndex === 0 ? 'btn-blocked' : '';
        } else if (buttonSide === 'next') {
            return cardIndex === cards.length - 1 ? 'btn-blocked' : '';
        }
    };

    const slideLeft = () => {
        if (cardIndex <= 0) {
            setCurrentCard(cards[0]);
            return;
        }
        setCardIndex(cardIndex - 1);
        setCurrentCard(cards[cardIndex - 1]);
    };

    const slideRight = () => {
        if (cardIndex >= cards.length - 1) {
            setCurrentCard(cards[cards.length - 1]);
            return;
        }
        setCardIndex(cardIndex + 1);
        setCurrentCard(cards[cardIndex + 1]);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement> ) => {
        event.preventDefault();

        if (event.code === 'ArrowRight') {
            slideRight();
        }

        if (event.code === 'ArrowLeft') {
            slideLeft();
        }
    }

    const fetchWordInfo = async (word: string) => {
        try {
            const wordData = await getAllByWord(word);
            onCurrentWordChange(wordData);
        } catch(err) {
            onCurrentWordChange(null);
        }
    }

    useEffect(() => {
        (async () => {
            const words = await dictionaryService.getWordsFromDictionary(dictionary);
            if (words?.length) {
                setCards(words);
                setCurrentCard(words[0]);
                setCardIndex(0);
            } else {
                setCards([]);
            }
        })();
    }, [dictionary])

    useEffect(() => {
        (async () => {
            if (currentCard) {
                await fetchWordInfo(currentCard.word);
            }
        })();
    }, [currentCard]);

    return (
        <>
            { cards?.length? <div
                className={ `carousel${className ? '-'+className : ''}`}
                onKeyDown={ handleKeyDown }
                tabIndex={ 0 }
            >
                <div className="card-container">
                    <div className="card-counter">{ (cardIndex + 1) + " / " + cards.length }</div>
                    { cards.map((card, index) => {
                        let position = (index > cardIndex)
                            ? "nextCard"
                            : (index === cardIndex)
                                ? "activeCard"
                                : 'prevCard';
                        if (position === 'activeCard') {
                            return <div key={ card.id }>
                                        <Card { ...card } cardStyle={ position } key={ card.id }>
                                            <Button 
                                                className={ `btn btn-prev ` + slideButtonClassName('prev') } 
                                                onClick={ slideLeft } 
                                                ref={ prevBtn }>Previous</Button>
                                            <Button 
                                                className={ `btn btn-next ` + slideButtonClassName('next') } 
                                                onClick={ slideRight } 
                                                ref={ nextBtn }>Next</Button>
                                        </Card>
                                    </div>
                        } else {
                            return <Card {...card} cardStyle={ position } key={ card.id }></Card>
                        }
                    }) }
                </div>
            </div> : null }
        </>
    );
}

export default CardsCarousel;

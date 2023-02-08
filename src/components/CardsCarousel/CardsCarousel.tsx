import React, { FC, useEffect, useRef, useState } from 'react';
import Card from '../Card/Card';
import Button from '../UI/Button/Button';
import { getCardsFromSubCollection } from '../../firebase/handlers/getCardsFromSubCollection';
import { getAllByWord } from '../../words-api/words-api';
import type { iCard } from '../../types/card.type';
import './CardsCarousel.scss';
import { iDictionary } from '../../types/dictionary.type';

interface CardsCarouselProps {
    activeUser: { [x: string]: string; };
    dictionary: iDictionary;
    onCurrentWordChange: (data: any) => void;
    className?: string;
}

const CardsCarousel: FC<CardsCarouselProps> = ({activeUser, dictionary, onCurrentWordChange, className}) => {
    //todo: separate wordInfo data from this component, maybe create parent for both of them
    const [cards, setCards] = useState<iCard[]>([]);
    const [cardIndex, setCardIndex] = useState<number>(0);
    const [currentCard, setCurrentCard] = useState<iCard>();

    const prevBtn = useRef<HTMLElement>(null);
    const nextBtn = useRef<HTMLElement>(null);

    const [isWordInfoShown, setWordInfoShown] = useState(false);

    const slideLeft = () => {
        if (cardIndex <= 0) {
            setCurrentCard(cards[0]);
            return;
        }
        setCardIndex(cardIndex - 1);
        setCurrentCard(cards[cardIndex - 1]);
    };

    const slideRight = () => {
        if (cardIndex >= cards.length-1) {
            setCurrentCard(cards[cards.length-1]);
            return;
        }
        setCardIndex(cardIndex + 1);
        setCurrentCard(cards[cardIndex + 1]);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement> ) => {
        // console.log(event)
        event.preventDefault();
        if (event.code === 'ArrowRight') {
            slideRight();
        }
        if (event.code === 'ArrowLeft') {
            slideLeft();
        }
    }

    const fetchCards = async () => {
        const newData: iCard[] = await getCardsFromSubCollection('users', activeUser.id, dictionary.id);
        setCards(newData);
        setCurrentCard(newData[0]);
        setCardIndex(0);
    }

    const fetchWordInfo = async (word: string) => {
        await getAllByWord(word).then(data => {
            console.log(data);
            onCurrentWordChange(data);
            // setWordInfo(data);
        });
    }

    useEffect(() => {
        (async () => {
            await fetchCards();
        })();

    },[dictionary.id])

    useEffect(() => {
        (async () => {
            if (currentCard) {
                await fetchWordInfo(currentCard.word);
            }
        })();
    }, [currentCard]);

    return (
        <>
            <div
                className={ `carousel${className ? '-'+className : ''}`}
                onKeyDown={ handleKeyDown }
                tabIndex={ 0 }
            >
                <div className="card-container">
                    { cards.map((card, index) => {
                        let position = (index > cardIndex)
                            ? "nextCard"
                            : (index === cardIndex)
                                ? "activeCard"
                                : 'prevCard';
                        if (position === 'activeCard') {
                            return <>
                                <Card { ...card } cardStyle={ position } key={ card.id }>
                                    <Button className="btn btn-prev" onClick={ slideLeft } ref={ prevBtn }>Previous</Button>
                                    <Button className="btn btn-next" onClick={ slideRight } ref={ nextBtn }>Next</Button>
                                </Card>
                            </>
                        } else {
                            return <Card {...card} cardStyle={ position } key={ card.id }></Card>
                        }
                    })}
                </div>
            </div>

        </>
    );
}

export default CardsCarousel;

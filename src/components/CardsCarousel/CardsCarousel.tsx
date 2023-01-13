import { FC, KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import { iCard } from '../../types/card.type';
import Card from '../Card/Card';
import './CardsCarousel.scss';
import Button from '../UI/Button/Button';

const CardsCarousel: FC<{cards: iCard[]}> = ({ cards }) => {
    const [cardIndex, setCardIndex] = useState(0);
    const prevBtn = useRef(null);
    const nextBtn = useRef(null);

    const slideLeft = () => {
        if (cardIndex <= 0) return;
        setCardIndex(cardIndex - 1);
    };

    const slideRight = () => {
        if (cardIndex >= cards.length-1) return;
        setCardIndex(cardIndex + 1);
    };

    const handleKeyDown = (event:  React.KeyboardEvent<HTMLDivElement> ) => {
        // console.log(event)
        event.preventDefault();
        if (event.code === 'ArrowRight') {
            slideRight();
        }
        if (event.code === 'ArrowLeft') {
            slideLeft();
        }
    }

    return (
        <>
            <div
                className="carousel"
                onKeyDown={ handleKeyDown }
                tabIndex={0}
            >
                <div className="card-container">
                    { cards.map((card, index) => {
                        let position = (index > cardIndex)
                            ? "nextCard"
                            : (index === cardIndex)
                                ? "activeCard"
                                : "prevCard";
                        if (position === "activeCard") {
                            return <div key={ card.id }>
                                    <Card { ...card } cardStyle={ position } key={ card.id }>
                                        <Button className="btn-carousel btn-prev" onClick={ slideLeft } ref={ prevBtn }>Previous</Button>
                                        <Button className="btn-carousel btn-next" onClick={ slideRight } ref={ nextBtn }>Next</Button>
                                    </Card>
                                </div>
                        } else {
                            return <Card {...card} cardStyle={ position } key={ card.id }></Card>
                        }
                    }) }
                </div>
            </div>
        </>
    );
}

export default CardsCarousel;

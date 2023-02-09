import { FC, useEffect, useState } from 'react';
import { iWord } from '../../types/card.type';
import './Card.scss';

interface CardProps extends iWord {
    cardStyle: string;
    children?: any;
}

const Card: FC<CardProps> = ({ id, word, translation , cardStyle='', children }) =>  {
    const [flipped, setFlipped] = useState(true);

    useEffect(() => {
        setFlipped(true);
    }, []);

    const flipCard = () => {
        setFlipped(!flipped);
    };

    const cardInnerClassName = (): string => {
        return flipped ? 'card-inner' : 'card-inner showBack';
    };

    const cardOuterClassName = (): string => {
        return `card-outer ${cardStyle}`;
    }

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
            <div>{ children }</div>
        </div>
    )
}

export default Card;

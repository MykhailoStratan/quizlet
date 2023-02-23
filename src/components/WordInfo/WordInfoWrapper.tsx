import React, { FC } from 'react';
import './WordInfoWrapper.scss';

interface WordInfoWrapperProps {
    children: any;
}

const WordInfoWrapper: FC<WordInfoWrapperProps> = ({children}) => {
    return (
        <div className="word-info-wrapper">
            <div>{ children }</div>
        </div>
    );
}

export default WordInfoWrapper;

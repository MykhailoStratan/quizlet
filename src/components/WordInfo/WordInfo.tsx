import React, { FC, useState } from 'react';
import Button from '../UI/Button/Button';
import WordInfoWrapper from './WordInfoWrapper';
import type { iWordInfo } from '../../types/word-info.type';
import './WordInfo.scss';

interface WordInfoProps {
    wordInfo: iWordInfo;
    isShowWordInfo: boolean;
    onShowWordInfoChange: (showWordInfoState: boolean) => void;
}

const WordInfo: FC<WordInfoProps> = ({ wordInfo, isShowWordInfo, onShowWordInfoChange }) => {
    const [showWordInfo, setShowWordInfo] = useState<boolean>(isShowWordInfo);

    const switchShowWordInfo = () => {
        setShowWordInfo(!showWordInfo);
        onShowWordInfoChange(!showWordInfo);
    };

    const switchBtnWordInfoClass = () => {
        return showWordInfo ? 'btn-show-word-info' : 'btn-show-word-info-hidden';
    };

    return (
        !showWordInfo
            ? <Button className={ switchBtnWordInfoClass() } onClick={ () => switchShowWordInfo() }>Show details</Button>
            : <>
                <Button className={ switchBtnWordInfoClass() } onClick={ () => switchShowWordInfo() }>Hide details</Button>
                <WordInfoWrapper>
                    <div className="word-info">
                        <ul>
                            <h2>General info:</h2>
                            <li><strong>{ `Pronunciation:` }</strong> { wordInfo.pronunciation.all }</li>
                            { wordInfo.syllables 
                                ? <li><strong>{ `Syllables:` }</strong> { wordInfo.syllables.list.join('-') }</li> 
                                : null }
                            <li><strong>{ `Frequency:` }</strong> { wordInfo.frequency }</li>
                        </ul>

                        <ul>
                            <h2>Definitions:</h2>
                            { wordInfo.results.map((result, index) => {
                                return <ul className="word-definition" key={ index }>
                                    <li>
                                        <h4 className="word-definition-head-span"><strong>{`Definition:`}</strong></h4> <p>{`"${ result.definition }"`}</p>
                                    </li>
                                    <li><span>{ `Part of speech:` }</span> <span>{ result.partOfSpeech }</span></li>
                                    { result.synonyms
                                        ? <li><span>{ `Synonyms:` }</span> <span>{ result.synonyms.join(', ') }</span></li>
                                        : null }
                                    { result.typeOf
                                        ? <li><span>{ `Type of:` }</span> <span>{ result.typeOf.join(', ') }</span></li>
                                        : null }
                                    { result.hasInstances
                                        ? <li><span>{ `Has instances:` }</span> <span>{ result.hasInstances.join(', ') }</span></li>
                                        : null }
                                    { result.hasParts
                                        ? <li><span>{ `Has parts:` }</span> <span>{ result.hasParts.join(', ') }</span></li>
                                        : null }
                                    { result.hasTypes
                                        ? <li><span>{ `Has types:` }</span> <span>{ result.hasTypes.join(', ') }</span></li>
                                        : null }
                                    { result.hasMembers
                                        ? <li><span>{ `Has members:` }</span> <span>{ result.hasMembers.join(', ') }</span></li>
                                        : null }
                                    { result.examples
                                        ? <li><span>{ `Examples:` }</span> <span>{ result.examples.join(', ') }</span></li>
                                        : null
                                    }
                                </ul>
                            })
                            }
                        </ul>
                    </div>
                </WordInfoWrapper>
            </>
            
    );
}

export default WordInfo;

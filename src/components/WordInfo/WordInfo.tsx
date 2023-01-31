import { FC } from 'react';
import { iWordInfo } from '../../types/word-info.type';
import './WordInfo.scss';

interface WordInfoProps {
    wordInfo: iWordInfo;
}

const WordInfo: FC<WordInfoProps> = ({wordInfo}) => {
    return (
        <div className="word-info">
        {/*    word: string,*/}
        {/*    results: WordDefinitionInfo[],*/}
        {/*    syllables: {*/}
        {/*    count: number,*/}
        {/*    list: string[]*/}
        {/*},*/}
        {/*    pronunciation: {*/}
        {/*    all: string*/}
        {/*},*/}
        {/*    frequency: number*/}

            <ul>
                <h2>General info:</h2>
                <li>{`Pronunciation: ${wordInfo.pronunciation.all}`}</li>
                <li>{`Syllables: ${wordInfo.syllables.list.join('-')}`}</li>
                <li>{`Frequency: ${wordInfo.frequency}`}</li>
            </ul>

            <ul>
                <h2>Definitions:</h2>
                { wordInfo.results.map(result => {
                        return <ul className="word-definition">
                            <li><h4 className="word-definition-head-span">{`- Definition:`}</h4> <p>{`"${result.definition}"`}</p></li>
                            <li><span>{`Part of speech:`}</span> <span>{`${result.partOfSpeech}`}</span></li>
                            { result.examples ? <li><span>{`Examples:`}</span> <span>{`${result.examples.join(', ')}`}</span></li> : null }
                            { result.synonyms ? <li><span>{`Synonyms:`}</span> <span>{`${result.synonyms.join(', ')}`}</span></li> : null }
                            { result.typeOf ? <li><span>{`Type of:`}</span> <span>{`${result.typeOf.join(', ')}`}</span></li> : null }
                            { result.hasInstances ? <li><span>{`Has instances:`}</span> <span>{`${result.hasInstances.join(', ')}`}</span></li> : null }
                            { result.hasParts ? <li><span>{`Has parts:`}</span> <span>{`${result.hasParts.join(', ')}`}</span></li> : null }
                            { result.hasTypes ? <li><span>{`Has types:`}</span> <span>{`${result.hasTypes.join(', ')}`}</span></li> : null }
                            { result.hasMembers ? <li><span>{`Has members:`}</span> <span>{`${result.hasMembers.join(', ')}`}</span></li> : null }
                        </ul>
                    })
                }
            </ul>


            {/*<ul>*/}
            {/*    <li>{`Pronunciation: ${wordInfo.results.}`}</li>*/}
            {/*    <li>{`Syllables: ${wordInfo.syllables.list.join('-')}`}</li>*/}
            {/*    <li>{`Frequency: ${wordInfo.frequency}`}</li>*/}
            {/*</ul>*/}

            {/*<ul>*/}
            {/*    <li>{`Pronunciation: ${wordInfo.pronunciation.all}`}</li>*/}
            {/*    <li>{`Syllables: ${wordInfo.syllables.list.join('-')}`}</li>*/}
            {/*    <li>{`Frequency: ${wordInfo.frequency}`}</li>*/}
            {/*</ul>*/}

            {/*<ul>*/}
            {/*    <li>{`Pronunciation: ${wordInfo.pronunciation.all}`}</li>*/}
            {/*    <li>{`Syllables: ${wordInfo.syllables.list.join('-')}`}</li>*/}
            {/*    <li>{`Frequency: ${wordInfo.frequency}`}</li>*/}
            {/*</ul>*/}

            {/*<div>{`Pronunciation: ${wordInfo.pronunciation.all}`}</div>*/}
            {/*<div>{`Pronunciation: ${wordInfo.pronunciation.all}`}</div>*/}
            {/*<div>{`Pronunciation: ${wordInfo.pronunciation.all}`}</div>*/}
            {/*<div>{`Pronunciation: ${wordInfo.pronunciation.all}`}</div>*/}
            {/*<div>{`Pronunciation: ${wordInfo.pronunciation.all}`}</div>*/}
            {/*<div>{`Pronunciation: ${wordInfo.pronunciation.all}`}</div>*/}
            {/*<div>{`Pronunciation: ${wordInfo.pronunciation.all}`}</div>*/}
            {/*<div>{`Pronunciation: ${wordInfo.pronunciation.all}`}</div>*/}
            {/*<div>{`Pronunciation: ${wordInfo.pronunciation.all}`}</div>*/}
        </div>
    );
}

export default WordInfo;

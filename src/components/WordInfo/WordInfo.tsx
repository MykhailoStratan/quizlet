import { FC } from 'react';
import { iWordInfo } from '../../types/word-info.type';
import './WordInfo.scss';

interface WordInfoProps {
    wordInfo: iWordInfo;
    children?: any;
}

const WordInfo: FC<WordInfoProps> = ({wordInfo, children}) => {
    return (
        <div key={new Date().toISOString()} className="word-info">
            <div>{ children }</div>
            <ul>
                <h2>General info:</h2>
                <li><strong>{`Pronunciation:`}</strong> { wordInfo.pronunciation.all }</li>
                <li><strong>{`Syllables:`}</strong> { wordInfo.syllables.list.join('-') }</li>
                <li><strong>{`Frequency:`}</strong> { wordInfo.frequency }</li>
            </ul>

            <ul>
                <h2>Definitions:</h2>
                { wordInfo.results.map((result, index) => {
                        return <ul className="word-definition" key={ index }>
                                <li>
                                    <h4 className="word-definition-head-span"><strong>{`- Definition:`}</strong></h4> <p>{`"${ result.definition }"`}</p>
                                </li>
                                <li><span>{`Part of speech:`}</span> <span>{ result.partOfSpeech }</span></li>
                                { result.synonyms
                                    ? <li><span>{`Synonyms:`}</span> <span>{ result.synonyms.join(', ') }</span></li>
                                    : null }
                                { result.typeOf
                                    ? <li><span>{`Type of:`}</span> <span>{ result.typeOf.join(', ') }</span></li>
                                    : null }
                                { result.hasInstances
                                    ? <li><span>{`Has instances:`}</span> <span>{ result.hasInstances.join(', ') }</span></li>
                                    : null }
                                { result.hasParts
                                    ? <li><span>{`Has parts:`}</span> <span>{ result.hasParts.join(', ') }</span></li>
                                    : null }
                                { result.hasTypes
                                    ? <li><span>{`Has types:`}</span> <span>{ result.hasTypes.join(', ') }</span></li>
                                    : null }
                                { result.hasMembers
                                    ? <li><span>{`Has members:`}</span> <span>{ result.hasMembers.join(', ') }</span></li>
                                    : null }
                                { result.examples
                                    ? <li><span>{`Examples:`}</span> <span>{ result.examples.join(', ') }</span></li>
                                    : null
                                }
                        </ul>
                    })
                }
            </ul>
        </div>
    );
}

export default WordInfo;

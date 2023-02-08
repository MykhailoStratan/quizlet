import { iCard } from '../types/card.type';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import { iDictionary } from '../types/dictionary.type';

export const getCardsFromQuerySnapshot = (data: QueryDocumentSnapshot[]): iCard[] => {
    return data.map((document) => ({
        word: document.data().word,
        translation: document.data().translation,
        id: document.data().id
    }));
}

export const getDictionariesFromQuerySnapshot = (data: QueryDocumentSnapshot[]): iDictionary[] => {
    return data.map((document) => ({
        id: document.data().id,
        name: document.data().name,
        words: document.data().words
    }));
}

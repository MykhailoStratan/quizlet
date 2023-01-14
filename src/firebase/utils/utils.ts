import { iCard } from '../../types/card.type';
import { QueryDocumentSnapshot } from 'firebase/firestore';

export const getCardsFromQuerySnapshot = (data: QueryDocumentSnapshot[]): iCard[] => {
    return data.map((document) => ({
        word: document.data().word,
        translation: document.data().translation,
        id: document.data().id
    }));
}

import { iCard } from '../../types/card.type';
import { postToSubCollection, fetchSubCollection } from '../actions';
import { getCardsFromQuerySnapshot } from '../utils/utils';

export const addCardToDictionary = async (collectionName: string, userId: string, dictionaryId: string, card: iCard) => {
    const existingCollectionDocs = await fetchSubCollection(collectionName, userId, dictionaryId);
    const existingCards: iCard[] = getCardsFromQuerySnapshot(existingCollectionDocs);

    const isThisPairExists = existingCards.some(existingCard => {
        return existingCard.word.toLowerCase() === card.word.toLowerCase()
            && existingCard.translation.toLowerCase() === card.translation.toLowerCase();
    });

    if (!isThisPairExists) {
        try {
            await postToSubCollection<iCard>(collectionName, userId, dictionaryId, card);
        } catch (error) {
            console.log(`Error: ${error}`);
            return `Error: ${error}`;
        }
    } else {
        console.log(`Card "${card}" already exists `);
        return `Card "${card.word}" already exists!`;
    }
}

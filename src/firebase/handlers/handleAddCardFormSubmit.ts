import { iCard } from '../../types/card.type';
import { postToCollection } from '../actions/postToCollection';
import { fetchDataFromCollection } from '../actions/fetchFromCollection';
import { getCardsFromQuerySnapshot } from '../utils/utils';

export const handleAddCardFormSubmit = async (collectionName: string, card: iCard) => {
    const existingCollectionDocs = await fetchDataFromCollection(collectionName);
    const existingCards: iCard[] = getCardsFromQuerySnapshot(existingCollectionDocs);
    const isThisPairExists = existingCards.some(existingCard => {
        return existingCard.word.toLowerCase() === card.word.toLowerCase()
            && existingCard.translation.toLowerCase() === card.translation.toLowerCase();
    });
    if (!isThisPairExists) {
        await postToCollection<iCard>(collectionName, card);
    } else {
        console.log(`Card ${card} already exists `)
        return `Card "${card.word}" already exists!`;
    }
}

import { fetchCollection } from '../actions';
import { iCard } from '../../types/card.type';
import { getCardsFromQuerySnapshot } from '../utils/utils';

export const getCardsFromCollection = async (collectionName: string) => {
    const docs = await fetchCollection(collectionName);
    const newData: iCard[] = getCardsFromQuerySnapshot(docs)
    return newData;
}

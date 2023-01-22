import { fetchSubCollection } from '../actions';
import { iCard } from '../../types/card.type';
import { getCardsFromQuerySnapshot } from '../utils/utils';

export const getCardsFromSubCollection = async (collectionName: string, docName: string, subCollectionName: string) => {
    const docs = await fetchSubCollection(collectionName, docName, subCollectionName);
    const newData: iCard[] = getCardsFromQuerySnapshot(docs)
    return newData;
}

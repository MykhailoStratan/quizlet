import { iCard } from '../../types/card.type';
import { iDictionary } from '../../types/dictionary.type';
import * as firebaseHelper from '../../firebase/firebase.helper';
import { firebaseActions } from '../../firebase/firebase.actions';
import { iUser } from '../../types/user.type';

class DictionaryService {
    public async postDictionary(userData: iUser, payload: iDictionary) {
        await firebaseActions.updateDocument<{dictionaries: {[key: string]: iDictionary}}>('users', userData.firebaseId, {
            dictionaries: {
                ...userData.dictionaries,
                [payload.name]: payload,
            }
        });
    }


    // async addCardToDictionary(collectionName: string, userId: string, dictionaryId: string, card: iCard) {
    //     const dictionaries = await this.getDictionariesFromSubCollection(collectionName, userId, 'dictionaries');
    //     const requiredDictionary: iDictionary | undefined = dictionaries.find(dictionary => dictionary.id === dictionaryId);
    //     const existingCollectionDocs = await firebaseActions.fetchSubCollection(collectionName, userId, 'dictionaries');
    //     // const existingCards: iCard[] = getCardsFromQuerySnapshot(existingCollectionDocs);
    //     //todo: https://stackoverflow.com/questions/48541270/how-to-add-document-with-custom-id-to-firestore
    //     const isThisPairExists = existingCards.some(existingCard => {
    //         return existingCard.word.toLowerCase() === card.word.toLowerCase()
    //             && existingCard.translation.toLowerCase() === card.translation.toLowerCase();
    //     });
    //
    //     if (!isThisPairExists) {
    //         try {
    //             await firebaseActions.postToSubCollection<iCard>(collectionName, userId, dictionaryId, card);
    //         } catch (error) {
    //             console.log(`Error: ${error}`);
    //             return `Error: ${error}`;
    //         }
    //     } else {
    //         console.log(`Card "${card}" already exists `);
    //         return `Card "${card.word}" already exists!`;
    //     }
    // }
    //
    // async getCardsFromSubCollection(collectionName: string, docName: string, subCollectionName: string) {
    //     const docs = await firebaseActions.fetchSubCollection(collectionName, docName, subCollectionName);
    //     const newData: iCard[] = firebaseHelper.getCardsFromQuerySnapshot(docs)
    //     return newData;
    // }
    //
    // async getDictionariesFromSubCollection(collectionName: string, docName: string, subCollectionName: string) {
    //     const docs = await firebaseActions.fetchSubCollection(collectionName, docName, subCollectionName);
    //     const newData: iDictionary[] = firebaseHelper.getDictionariesFromQuerySnapshot(docs);
    //     newData.sort((a, b) => a.name.localeCompare(b.name));
    //     return newData;
    // }
    //
    // async postToDictionary(collectionName: string, userId: string, dictionaryId: string, payload: iDictionary) {
    //     const existingCollectionDocs = await firebaseActions.fetchSubCollection(collectionName, userId, dictionaryId);
    //     const existingDictionaries: iDictionary[] = firebaseHelper.getDictionariesFromQuerySnapshot(existingCollectionDocs);
    //
    //     const isThisPairExists = existingDictionaries.some(existingDictionary => {
    //         return existingDictionary.name.toLowerCase() === payload.name.toLowerCase()
    //             && existingDictionary.id === payload.id;
    //     });
    //
    //     if (!isThisPairExists) {
    //         try {
    //             await firebaseActions.postToSubCollection<iDictionary>(collectionName, userId, dictionaryId, payload);
    //         } catch (error) {
    //             console.log(`Error: ${error}`);
    //             return `Error: ${error}`;
    //         }
    //     } else {
    //         console.log(`Dictionary "${payload.name}" already exists `);
    //         return `Dictionary "${payload.name}" already exists!`;
    //     }
    // }
}

export const dictionaryService = new DictionaryService();

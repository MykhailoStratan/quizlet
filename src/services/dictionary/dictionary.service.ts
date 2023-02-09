import { iWord } from '../../types/card.type';
import { iDictionary } from '../../types/dictionary.type';
import * as firebaseHelper from '../../firebase/firebase.helper';
import { firebaseActions } from '../../firebase/firebase.actions';
import { iUser } from '../../types/user.type';
import { arrayUnion } from 'firebase/firestore';

class DictionaryService {
    public async postDictionary(userData: iUser, payload: iDictionary): Promise<void> {
        const existedDictionaries = await this.getDictionaries(userData);
        const isDictionaryExist = existedDictionaries.find(dictionary => dictionary.name === payload.name);

        if (isDictionaryExist) {
            return console.log(`Dictionary "${payload.name}" already exist for the current user!`);
        }

        const newData = userData.dictionaries?.length
            ? [...userData.dictionaries, {...payload}]
            : [{...payload}];

        await firebaseActions.updateDocument<{dictionaries: iDictionary[]}>('users', userData.firebaseId, {
            dictionaries: newData,
        });
    }

    public async getDictionaries(userData: iUser): Promise<iDictionary[]> {
        const { dictionaries } = await firebaseActions.getDocument('users', userData.firebaseId);
        return dictionaries;
    }

    public async addWordToDictionary(userData: iUser, currentDictionary: iDictionary, newWord: iWord) {
        const existedDictionaries = await this.getDictionaries(userData);
        const dictionaryIndex = existedDictionaries.findIndex(dictionary => dictionary.id === currentDictionary.id);

        if (existedDictionaries[dictionaryIndex].words.some(item => item.word === newWord.word)) {
            const error = `Word "${newWord.word}" already exist in the current dictionary!`;
            console.log(error);
            return error;
        } else {
            existedDictionaries[dictionaryIndex].words.push(newWord);
        }
        // const updatedDictionary = {...currentDictionary};
        // updatedDictionary.words.push(word)

        await firebaseActions.updateDocument('users', userData.firebaseId, {
            dictionaries: [...existedDictionaries]
        });
    }

    public async getWordsFromDictionary(userData: iUser, currentDictionary: iDictionary) {
        const existedDictionaries = await this.getDictionaries(userData);
        const dictionaryIndex = existedDictionaries.findIndex(dictionary => dictionary.id === currentDictionary.id);

        return existedDictionaries[dictionaryIndex].words;
    }
}

export const dictionaryService = new DictionaryService();

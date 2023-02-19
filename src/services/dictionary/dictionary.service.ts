import { iWord } from '../../types/card.type';
import { iDictionary } from '../../types/dictionary.type';
import { iUser } from '../../types/user.type';
import { arrayUnion, doc, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { usersService } from '../users/users.service';

class DictionaryService {
    private subscription: Unsubscribe | undefined;
    private db: any;
    private dictionaries: iDictionary[] = [];

    public async initialize(databaseActions: any): Promise<void> {
        this.db = databaseActions;
        // await this.subscribeToDictionaries();
    }

    public async subscribeToDictionaries(dictionariesCb?: Function) {
        this.subscription = onSnapshot(
            doc(db, 'users', usersService.getActiveUser().firebaseId),
            { includeMetadataChanges: true },
            (doc) => {
                this.dictionaries = doc.data()?.dictionaries;

                if (dictionariesCb) {
                    dictionariesCb(doc.data()?.dictionaries);
                }
            });
        return this.subscription;
    }

    public async postDictionary(payload: iDictionary): Promise<void> {
        const existedDictionaries = await this.getDictionaries();
        const isDictionaryExist = existedDictionaries.find(dictionary => dictionary.name === payload.name);

        if (isDictionaryExist) {
            console.log(`Dictionary "${payload.name}" already exist for the current user!`);
            return;
        }

        const newData = existedDictionaries?.length
            ? [...existedDictionaries, {...payload}]
            : [{...payload}];

        // @ts-ignore
        // todo: try to fix this warning
        await this.db.updateDocument<{dictionaries: iDictionary[]}>('users', usersService.getActiveUser().firebaseId, {
            dictionaries: newData,
        });
    }

    public async getDictionaries(): Promise<iDictionary[]> {
        const { dictionaries } = await this.db.getDocument('users', usersService.getActiveUser().firebaseId);
        return dictionaries;
    }

    public async addWordToDictionary(currentDictionary: iDictionary, newWord: iWord) {
        const existedDictionaries = await this.getDictionaries();
        const dictionaryIndex = existedDictionaries.findIndex(dictionary => dictionary.id === currentDictionary.id);

        if (existedDictionaries[dictionaryIndex].words.some(item => item.word === newWord.word)) {
            const error = `Word "${newWord.word}" already exist in the current dictionary!`;
            return error;
        } else {
            existedDictionaries[dictionaryIndex].words.push(newWord);
        }

        await this.db.updateDocument('users', usersService.getActiveUser().firebaseId, {
            dictionaries: [...existedDictionaries]
        });
    }

    public async getWordsFromDictionary(currentDictionary: iDictionary) {
        const existedDictionaries = await this.getDictionaries();
        const dictionaryIndex = existedDictionaries.findIndex(dictionary => dictionary.id === currentDictionary.id);

        if (existedDictionaries[dictionaryIndex].words.length) {
            return existedDictionaries[dictionaryIndex].words;
        }
    }
}

export const dictionaryService = new DictionaryService();

import { iWord } from '../../types/card.type';
import { iDictionary } from '../../types/dictionary.type';
import { iUser } from '../../types/user.type';
import { arrayUnion, doc, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

class DictionaryService {
    private subscription: Unsubscribe | undefined;
    private db: any;
    private currentUser!: iUser;
    private dictionaries: iDictionary[] = [];

    public async initialize(databaseActions: any, currentUser: iUser): Promise<void> {
        this.db = databaseActions;
        this.currentUser = currentUser;
        // await this.subscribeToDictionaries();
    }

    public async subscribeToDictionaries(dictionariesCb?: Function) {
        this.subscription = onSnapshot(
            doc(db, 'users', this.currentUser.firebaseId),
            { includeMetadataChanges: true },
            (doc) => {
                console.log(doc.data());
                this.dictionaries = doc.data()?.dictionaries;
                console.log('init:',this.dictionaries);

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
            return console.log(`Dictionary "${payload.name}" already exist for the current user!`);
        }

        const newData = existedDictionaries?.length
            ? [...existedDictionaries, {...payload}]
            : [{...payload}];

        // @ts-ignore
        // todo: try to fix this warning
        await this.db.updateDocument<{dictionaries: iDictionary[]}>('users', this.currentUser.firebaseId, {
            dictionaries: newData,
        });
    }

    public async getDictionaries(): Promise<iDictionary[]> {
        const { dictionaries } = await this.db.getDocument('users', this.currentUser.firebaseId);
        return dictionaries;
    }

    public async addWordToDictionary(userData: iUser, currentDictionary: iDictionary, newWord: iWord) {
        const existedDictionaries = await this.getDictionaries();
        const dictionaryIndex = existedDictionaries.findIndex(dictionary => dictionary.id === currentDictionary.id);

        if (existedDictionaries[dictionaryIndex].words.some(item => item.word === newWord.word)) {
            const error = `Word "${newWord.word}" already exist in the current dictionary!`;
            console.log(error);
            return error;
        } else {
            existedDictionaries[dictionaryIndex].words.push(newWord);
        }

        await this.db.updateDocument('users', userData.firebaseId, {
            dictionaries: [...existedDictionaries]
        });
    }

    public async getWordsFromDictionary(currentDictionary: iDictionary) {
        const existedDictionaries = await this.getDictionaries();
        const dictionaryIndex = existedDictionaries.findIndex(dictionary => dictionary.id === currentDictionary.id);
        console.log(existedDictionaries)
        return existedDictionaries[dictionaryIndex].words;
    }
}

export const dictionaryService = new DictionaryService();

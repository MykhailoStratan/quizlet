import { Firestore, collection, onSnapshot } from '@firebase/firestore';
import { iWord } from '../../types/card.type';
import { iDictionary } from '../../types/dictionary.type';
import { usersService } from '../users/users.service';
import { db } from '../../firebase/firebase';

class DictionaryService {
    private dbActions: any;
    private unsubscribeFromDictionaryRealTimeUpdates: any;

    public async initialize(databaseActions: any): Promise<void> {
        this.dbActions = databaseActions;
    }

    public async postDictionary(payload: iDictionary): Promise<void> {
        const existedDictionaries = await this.getDictionaries();
        const isDictionaryExist = existedDictionaries.find(dictionary => dictionary.name === payload.name);

        if (isDictionaryExist) {
            const error = `Dictionary "${payload.name}" already exist for the current user!`;
            throw new Error(error);
        }

        const newData = existedDictionaries?.length
            ? [...existedDictionaries, {...payload}]
            : [{...payload}];

        const activeUser = usersService.getActiveUser();
        if (activeUser) {
            // @ts-ignore
            // todo: try to fix this warning
            await this.db.updateDocument<{dictionaries: iDictionary[]}>('users', activeUser.firebaseId, {
                dictionaries: newData,
            });
        }

    }

    public async getDictionaries(): Promise<iDictionary[]> {
        const { dictionaries } = await this.dbActions.getDocument('users', usersService.getActiveUser()?.firebaseId);
        return dictionaries;
    }

    public async getDictionarySize(activeDictionaryName: string): Promise<number> {
        const dictionaries = await this.getDictionaries();
        const result = dictionaries.find(dictionary => dictionary.name === activeDictionaryName)?.words.length || 0;
        console.log(result);
        console.log(activeDictionaryName);
        return result;
    }

    public async addWordToDictionary(currentDictionary: iDictionary, newWord: iWord) {
        const existedDictionaries = await this.getDictionaries();
        const dictionaryIndex = existedDictionaries.findIndex(dictionary => dictionary.id === currentDictionary.id);

        if (existedDictionaries[dictionaryIndex].words.some(item => item.word === newWord.word)) {
            const error = `Word "${newWord.word}" already exist in the current dictionary!`;
            throw new Error(error);
        } else {
            existedDictionaries[dictionaryIndex].words.push(newWord);
        }

        const activeUser = usersService.getActiveUser();
        if (activeUser) {
            await this.dbActions.updateDocument('users', activeUser.firebaseId, {
                dictionaries: [...existedDictionaries]
            });
        }
    }

    public async getWordsFromDictionary(currentDictionary: iDictionary) {
        const existedDictionaries = await this.getDictionaries();
        const dictionaryIndex = existedDictionaries.findIndex(dictionary => dictionary.id === currentDictionary.id);

        if (existedDictionaries[dictionaryIndex].words.length) {
            return existedDictionaries[dictionaryIndex].words;
        }
    }

    public getDictionaryWordsCount(currentDictionary: iDictionary, setDataHook: (value: React.SetStateAction<number | null>) => void): () => void {
        const collectionRef = collection(db, 'users');

        const unsubscribe = onSnapshot(collectionRef, {
            next: (snapshot) => {
            const updatedData: any = snapshot.docs.find((doc) => doc.data().id === usersService.getActiveUser()!.id);

            const dictionaries = updatedData.data().dictionaries;

            const activeDictionary = dictionaries.find((dictionary: iDictionary) => dictionary.name === currentDictionary.name)
            setDataHook(activeDictionary.words.length);
        }});

        return () => {
            unsubscribe();
        };
    }
}

export const dictionaryService = new DictionaryService();

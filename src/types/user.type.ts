import { iDictionary } from './dictionary.type';

export type iUser = {
    name: string,
    id: string,
    firebaseId: string,
    dictionaries: {
        [key: string]: iDictionary
    },
}
import { iDictionary } from './dictionary.type';

export type iUser = {
    name?: string,
    id: string,
    firebaseId: string,
    dictionaries: iDictionary[],
    email: string,
    phone?: string,
    surname?: string,
    language: string,
}

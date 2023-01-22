import { addDoc, collection, CollectionReference } from 'firebase/firestore';
import { db } from '../firebase';

interface Payload {
    [x: string]: any;
}

export async function postToCollection<Type extends Payload>(collectionName: string, paylodad: Type): Promise<void> {
    let ref = collection(db, collectionName);

    try {
        await addDoc(ref, paylodad)
        console.log('added to firestore', paylodad);
    } catch(err) {
        console.error(err);
    }
}

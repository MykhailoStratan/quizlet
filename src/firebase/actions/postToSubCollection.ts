import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

interface Payload {
    [x: string]: any;
}

export async function postToSubCollection<Type extends Payload>(
    collectionName: string,
    docName: string,
    subCollectionName: string,
    paylodad: Type
): Promise<void> {

    let ref = collection(db, collectionName, docName, subCollectionName);

    try {
        await addDoc(ref, paylodad)
        console.log('added to firestore', paylodad);
    } catch(err) {
        console.log(err);
    }
}

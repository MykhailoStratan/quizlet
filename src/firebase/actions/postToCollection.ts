import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

interface Payload {
    [x: string]: any;
}

export async function postToCollection<Type extends Payload>(collectionName: string, paylodad: Type): Promise<void> {
    const ref = collection(db, collectionName);

    try {
        addDoc(ref, paylodad)
            .then(() => console.log('added to firestore', paylodad));
    } catch(err) {
        console.log(err);
    }
}

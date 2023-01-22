import { doc, DocumentSnapshot, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export async function fetchDoc(collectionName: string, docName: string):Promise<DocumentSnapshot> {
    let data = await getDoc(doc(db, collectionName, docName));
    return data;
}

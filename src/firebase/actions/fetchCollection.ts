import { collection, getDocs, QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export async function fetchCollection(collectionName: string):Promise<QueryDocumentSnapshot[]> {
    let data = await getDocs(collection(db, collectionName));
    return data.docs;
}

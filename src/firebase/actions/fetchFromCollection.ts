import { collection, getDocs, QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export async function fetchDataFromCollection(collectionName: string):Promise<QueryDocumentSnapshot[]> {
    let data = await getDocs(collection(db, collectionName));
    return data.docs;
}

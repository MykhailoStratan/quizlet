import { collection, getDocs, QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export async function fetchSubCollection(collectionName: string, docName: string, subCollectionName: string):Promise<QueryDocumentSnapshot[]> {
    let data = await getDocs(collection(db, collectionName, docName, subCollectionName));
    return data.docs;
}

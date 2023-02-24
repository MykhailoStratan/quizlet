import {
    addDoc,
    collection,
    CollectionReference,
    doc,
    DocumentData,
    getDoc,
    getDocs,
    updateDoc
} from 'firebase/firestore';
import { db } from './firebase';

class FirebaseActions {
    private getCollectionRef(name: string, segments?: string[]):  CollectionReference<DocumentData> {
        if (segments?.length) {
            return collection(db, name, ...segments);
        }
        return collection(db, name);
    }

    public async addDocument<T extends { [x: string]: any; }>(collectionName: string, payload: T) {
        const documentRef = await addDoc(collection(db, collectionName), payload);
        console.log("Document written with ID: ", documentRef.id);
    }

    public async updateDocument<T extends { [x: string]: any; }>(collectionName: string, documentName: string, payload: T): Promise<void> {
        const documentRef = doc(db, collectionName, documentName);
        await updateDoc(documentRef, payload);
    }

    public async getDocument<T>(collectionName: string, documentName: string): Promise<DocumentData | undefined> {
        const documentRef = doc(db, collectionName, documentName); // todo: Add Converter here to define data type
        const documentSnap = await getDoc(documentRef);

        if (documentSnap.exists()) {
            console.log("Document data:", documentSnap.data());
            return documentSnap.data();
        } else {
            console.log("No such document!");
            return;
        }
    }

    public async getCollection<T>(collectionName: string): Promise<T[]> {
        const collectionRef = collection(db, collectionName);
        const collectionData: T[] = [];
        try {
            const collectionQuerySnapshot = await getDocs(collectionRef);
            // todo: fix
            // @ts-ignore
            collectionQuerySnapshot.forEach(doc => collectionData.push({...doc.data(), firebaseId: doc.id}));

            return collectionData;
        } catch (error) {
            console.log(error);
        }
        return collectionData;
    }
}

export const firebaseActions = new FirebaseActions();

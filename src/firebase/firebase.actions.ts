import {
    addDoc,
    collection, CollectionReference,
    doc, DocumentData, DocumentReference,
    DocumentSnapshot,
    getDoc,
    getDocs,
    QueryDocumentSnapshot,
    setDoc, updateDoc
} from 'firebase/firestore';
import { db } from './firebase';
import { iUser } from '../types/user.type';

interface Payload {
    [x: string]: any;
}

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
        // let documentData: T;

        if (documentSnap.exists()) {
            console.log("Document data:", documentSnap.data());
            return documentSnap.data();
        } else {
            // doc.data() will be undefined in this case
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
    //
    // public async fetchCollection(collectionName: string): Promise<QueryDocumentSnapshot[]> {
    //     let data = await getDocs(collection(db, collectionName));
    //     return data.docs;
    // }
    //
    // async fetchDoc(collectionName: string, docName: string): Promise<DocumentSnapshot> {
    //     let data = await getDoc(doc(db, collectionName, docName));
    //     return data;
    // }
    //
    // async fetchSubCollection(collectionName: string, docName: string, subCollectionName: string): Promise<QueryDocumentSnapshot[]> {
    //     let data = await getDocs(collection(db, collectionName, docName, subCollectionName));
    //     return data.docs;
    // }
    //
    // async postToCollection<Type extends Payload>(collectionName: string, paylodad: Type): Promise<void> {
    //     let ref = collection(db, collectionName);
    //
    //     try {
    //         await addDoc(ref, paylodad)
    //         console.log('added to firestore', paylodad);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }
    //
    // async postToSubCollection<Type extends Payload>(
    //     collectionName: string,
    //     docName: string,
    //     subCollectionName: string,
    //     paylodad: Type
    // ): Promise<void> {
    //
    //     let ref = collection(db, collectionName, docName, subCollectionName);
    //
    //     try {
    //         await addDoc(ref, paylodad)
    //         console.log('added to firestore', paylodad);
    //     } catch(err) {
    //         console.log(err);
    //     }
    // }
}

export const firebaseActions = new FirebaseActions();

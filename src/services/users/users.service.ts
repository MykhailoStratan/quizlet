import { iUser } from '../../types/user.type';
import { firebaseActions } from '../../firebase/firebase.actions';
import { collection, doc, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { v4 as uuid } from 'uuid';

class UsersService {
    private users: iUser[] = [];
    private activeUser: iUser | null;
    private subscription;

    private validateUser(user: iUser) {
        if (user.name
            && user.id
            && user.email
            && user.firebaseId
            && user.dictionaries
        ) {
            return true;
        }
        return false;
    }

    public async initialize() {
        await this.updateUsers();
        const isActiveUser = localStorage.getItem('user');
        if (isActiveUser) {
            this.setActiveUserByEmail(JSON.parse(isActiveUser).email);
        }
    }

    public getUsers(): iUser[] {
        return this.users;
    }

    public getActiveUser(): iUser {
        if (this.activeUser) {
            return this.activeUser;
        }
    }

    public setActiveUserByEmail(userEmail: string) {
        const user = this.users.find(user => user.email === userEmail);
        if (user) {
            this.activeUser = user;
        }
    }

    public async updateUsers() {
        this.users = await firebaseActions.getCollection<iUser>('users');
    }

    public async addUser(user: iUser) {
        const isValidUser = this.validateUser(user);
        if (!isValidUser) {
            return;
        }

        await this.updateUsers();
        const isUserExist = this.users.find(existedUser => existedUser.email === user.email );

        if (isUserExist) {
            return;
        }

        user.dictionaries.push({
            name: 'default',
            id: uuid(),
            words: []
        });

        await firebaseActions.addDocument('users', user);
    }

    public async subscribeToUsers(activeUserSetter?: Function) {
        const collectionQuery = query(collection(db, "cities"));
        this.subscription = onSnapshot(
            collectionQuery,
            { includeMetadataChanges: true },
            (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.users.push(doc as iUser)
                });

                if (activeUserSetter) {
                    activeUserSetter(this.getActiveUser());
                }
            });
        return this.subscription;
    }

    public clearUsers() {
        this.users = [];
        this.activeUser = null;
    }
}

export const usersService = new UsersService();

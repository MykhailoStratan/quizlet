import { iUser } from '../../types/user.type';
import { firebaseActions } from '../../firebase/firebase.actions';
import { v4 as uuid } from 'uuid';

class UsersService {
    private users: iUser[] = [];
    private activeUser: iUser | null = null;

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

    public getActiveUser(): iUser | null {
        return this.activeUser;
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
        await this.updateUsers();
    }

    public clearUsers() {
        this.users = [];
        this.activeUser = null;
    }
}

export const usersService = new UsersService();

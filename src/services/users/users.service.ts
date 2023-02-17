import { iUser } from '../../types/user.type';
import { firebaseActions } from '../../firebase/firebase.actions';

class UsersService {
    private users: iUser[] = [];

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
    }

    public getUsers(): iUser[] {
        return this.users;
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

        await firebaseActions.addDocument('users', user);
    }
}

export const usersService = new UsersService();

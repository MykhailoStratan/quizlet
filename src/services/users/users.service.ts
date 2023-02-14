import { iUser } from '../../types/user.type';
import { firebaseActions } from '../../firebase/firebase.actions';

class UsersService {
    private users: iUser[] = [];

    public async initialize() {
        this.users = await firebaseActions.getCollection<iUser>('users');
    }

    public getUsers(): iUser[] {
        return this.users;
    }
}

export const usersService = new UsersService();

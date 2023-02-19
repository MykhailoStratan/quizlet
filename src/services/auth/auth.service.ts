import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { usersService } from '../users/users.service';

class AuthService {
    private auth = getAuth();

    public async createUser(email: string, password: string) {
        let userCredential;

        try {
            userCredential = await createUserWithEmailAndPassword(this.auth, email, password)
        } catch(error: any) {
            // const errorCode = error.code;
            // const errorMessage = error.message;
            throw new Error(error);
        }

        localStorage.setItem('user', JSON.stringify(userCredential.user));
        return userCredential;
    }

    public async signIn(email: string, password: string) {
        await usersService.updateUsers();
        let userCredential;

        try {
            userCredential = await signInWithEmailAndPassword(this.auth, email, password)
        } catch(error: any) {
            // const errorCode = error.code;
            // const errorMessage = error.message;
            throw new Error(error);
        }

        localStorage.setItem('user', JSON.stringify(userCredential.user));
        return userCredential;
    }

    public logOut() {
        localStorage.clear();
        usersService.clearUsers();
    }

}

export const authService = new AuthService();

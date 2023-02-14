import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

class AuthService {
    private auth = getAuth();

    public async createUser(email: string, password: string) {
        let userCredential;

        try {
            userCredential = await createUserWithEmailAndPassword(this.auth, email, password)
        } catch(error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
        }

        console.log('credential', userCredential);

        return userCredential;
    }

    public async signIn(email: string, password: string) {
        let userCredential;

        try {
            userCredential = await signInWithEmailAndPassword(this.auth, email, password)
        } catch(error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
        }

        console.log('credential', userCredential);

        return userCredential;
    }

}

export const authService = new AuthService();

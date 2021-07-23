import { userState } from '../store/states/userState';
import { Auth } from '../classes/Auth';

export const signInWithGoogle = async (): Promise<void> => {
    userState(await Auth.signInWithGoogle());
};

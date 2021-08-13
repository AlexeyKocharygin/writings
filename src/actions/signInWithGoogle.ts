import { userState } from '../store/states/userState';
import { Auth } from '../classes/Auth';
import { withCache } from '../utils/withCache';

export const signInWithGoogle = async (): Promise<void> => {
    userState(await Auth.signInWithGoogle());

    withCache.clear();
};

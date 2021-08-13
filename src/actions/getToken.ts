import { userState } from '../store/states/userState';
import { Auth, IUser } from '../classes/Auth';
import { isOnline } from '../utils/isOnline';

export const getToken = async (): Promise<IUser['idToken']> => {
    const user = userState();

    if (!user || !isOnline()) {
        throw new Error();
    }

    if (!!user && user.expires > Date.now()) {
        return user.idToken;
    }

    const refreshedData = await Auth.refreshToken(user.refreshToken);

    userState(
        (currentUser) =>
            currentUser && {
                ...currentUser,
                ...refreshedData
            }
    );

    return refreshedData.idToken;
};

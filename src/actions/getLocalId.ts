import { userState } from '../store/states/userState';
import { IUser } from '../classes/Auth';

export const getLocalId = (): IUser['localId'] => {
    const user = userState();

    if (!user) {
        throw new Error();
    }

    return user.localId;
};

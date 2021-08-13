import { resetEvent } from '../store/events/resetEvent';
import { LocalStorage } from '../classes/LocalStorage';
import { withCache } from '../utils/withCache';
import { IndexedDB } from '../classes/IndexedDB';

export const signOut = async (): Promise<void> => {
    withCache.clear();

    await IndexedDB.clearAll();

    LocalStorage.remove('state/search');
    LocalStorage.remove('state/user');
    LocalStorage.remove('writingsUpdatedOn');
    LocalStorage.remove('savedScroll');
    LocalStorage.remove('syncDeleteWritings');
    LocalStorage.remove('syncPutWritings');
    LocalStorage.remove('intro');
    resetEvent();
};

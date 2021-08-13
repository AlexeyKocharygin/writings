import { writingsState } from '../store/states/writingsState';
import { remove } from '../store/updaters/remove';
import { Database } from '../classes/Database';
import { IndexedDB } from '../classes/IndexedDB';
import { LocalStorage } from '../classes/LocalStorage';
import { concatUnique } from '../store/updaters/concatUnique';
import { without } from '../store/updaters/without';
import { getLocalId } from './getLocalId';

export const deleteWriting = async (writingId: string): Promise<void> => {
    if (!writingId) {
        return;
    }

    const updatedOn = Date.now();

    writingsState(remove(writingId));

    await IndexedDB.delete('writings', writingId);

    LocalStorage.set('writingsUpdatedOn', updatedOn);

    try {
        await Promise.all([
            Database.delete((db) => db[getLocalId()].writings[writingId]),
            Database.put((db) => db[getLocalId()].writingsUpdatedOn, updatedOn)
        ]);
    } catch (error) {
        LocalStorage.set('syncDeleteWritings', concatUnique(writingId));
        LocalStorage.set('syncPutWritings', without(writingId));
    }
};

import { writingsState } from '../store/states/writingsState';
import { add } from '../store/updaters/add';
import { Database, IWriting } from '../classes/Database';
import { IndexedDB } from '../classes/IndexedDB';
import { LocalStorage } from '../classes/LocalStorage';
import { concatUnique } from '../store/updaters/concatUnique';
import { getLocalId } from './getLocalId';

export const putWriting = async (writingId: string, data: Partial<IWriting>): Promise<void> => {
    if (!writingId) {
        return;
    }

    const updatedOn = Date.now();
    const localId = getLocalId();
    const writing = writingsState()[writingId];
    const extendedWriting: IWriting = {
        id: writingId,
        createdBy: localId,
        createdOn: updatedOn,
        title: '',
        content: '',
        ...(writing as IWriting | undefined),
        ...data,
        updatedOn
    };

    writingsState(add(writingId, extendedWriting));

    await IndexedDB.put('writings', extendedWriting);

    LocalStorage.set('writingsUpdatedOn', updatedOn);

    try {
        await Promise.all([
            Database.put((db) => db[getLocalId()].writings[writingId], extendedWriting),
            Database.put((db) => db[getLocalId()].writingsUpdatedOn, updatedOn)
        ]);
    } catch (error) {
        LocalStorage.set('syncPutWritings', concatUnique(writingId));
    }
};

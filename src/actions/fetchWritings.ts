import { writingsState } from '../store/states/writingsState';
import { objectToArray } from '../utils/objectToArray';
import { arrayToObject } from '../utils/arrayToObject';
import { LocalStorage } from '../classes/LocalStorage';
import { withCache } from '../utils/withCache';
import { IndexedDB } from '../classes/IndexedDB';
import { Database } from '../classes/Database';
import { getLocalId } from './getLocalId';
import { getToken } from './getToken';

export const fetchWritings = withCache(async (): Promise<void> => {
    const indexedDBResult = arrayToObject(await IndexedDB.getAll('writings'), 'id');

    writingsState(indexedDBResult);

    try {
        await getToken();
    } catch (error) {
        return;
    }

    const promises = [
        ...(LocalStorage.get('syncDeleteWritings') || []).map(async (id) => {
            await Database.delete((db) => db[getLocalId()].writings[id]);
        }),
        ...(LocalStorage.get('syncPutWritings') || []).map(async (id) => {
            const writingUpdatedOn = (await Database.get((db) => db[getLocalId()].writings[id].updatedOn)) || 0;
            const writing = writingsState()[id];

            if (writingUpdatedOn < writing.updatedOn) {
                await Database.put((db) => db[getLocalId()].writings[id], writing);
            }
        })
    ];

    if (promises.length) {
        LocalStorage.remove('syncDeleteWritings');
        LocalStorage.remove('syncPutWritings');

        await Promise.all([...promises, Database.put((db) => db[getLocalId()].writingsUpdatedOn, Date.now())]);
    }

    const writingsUpdatedOn = (await Database.get((db) => db[getLocalId()].writingsUpdatedOn)) || 0;

    if (!writingsUpdatedOn) {
        writingsState({});

        await IndexedDB.clear('writings');

        LocalStorage.remove('writingsUpdatedOn');

        return;
    }

    if (writingsUpdatedOn > (LocalStorage.get('writingsUpdatedOn') || 0)) {
        const databaseResult = (await Database.get((db) => db[getLocalId()].writings)) || {};

        writingsState(databaseResult);

        await IndexedDB.putAll('writings', objectToArray(databaseResult));

        LocalStorage.set('writingsUpdatedOn', writingsUpdatedOn);
    }
});

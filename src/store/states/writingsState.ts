import { createState } from 'react-tagged-state';
import { resetEvent } from '../events/resetEvent';
import { IWriting } from '../../classes/Database';

const initialState = {};

export const writingsState = createState<Record<string, IWriting>>(initialState);

resetEvent``(() => {
    writingsState(initialState);
});

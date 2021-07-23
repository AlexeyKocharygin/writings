import { createComputed } from 'react-tagged-state';
import { objectToArray } from '../../utils/objectToArray';
import { writingsState } from '../states/writingsState';

export const sortedWritings = createComputed(() =>
    objectToArray(writingsState()).sort((a, b) => b.updatedOn - a.updatedOn)
);

import { createState } from 'react-tagged-state';
import { resetEvent } from '../events/resetEvent';
import { LocalStorage } from '../../classes/LocalStorage';

const getInitialState = () => LocalStorage.get('state/lang') || null;

export const langState = createState(getInitialState());

langState``((lang) => {
    LocalStorage.set('state/lang', lang);
});

resetEvent``(() => {
    langState(getInitialState);
});

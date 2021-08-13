import { createState } from 'react-tagged-state';
import { resetEvent } from '../events/resetEvent';
import { LocalStorage } from '../../classes/LocalStorage';

const getInitialState = () => LocalStorage.get('state/theme') || null;

export const themeState = createState(getInitialState());

themeState``((theme) => {
    LocalStorage.set('state/theme', theme);
});

resetEvent``(() => {
    themeState(getInitialState);
});

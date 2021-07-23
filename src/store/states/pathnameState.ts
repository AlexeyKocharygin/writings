import { createState } from 'react-tagged-state';
import { popStateEvent } from '../events/popStateEvent';

const getInitialState = () => window.location.pathname;

export const pathnameState = createState(getInitialState());

popStateEvent``(() => {
    pathnameState(getInitialState());
});

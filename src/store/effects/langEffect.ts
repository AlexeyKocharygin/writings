import { createEffect, Effect } from 'react-tagged-state';
import { getBrowserLang } from '../../utils/getBrowserLang';
import { langState } from '../states/langState';

export const langeEffect = (): Effect =>
    createEffect(() => {
        document.documentElement.lang = getBrowserLang(langState());
    });

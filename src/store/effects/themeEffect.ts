import { createEffect, Effect } from 'react-tagged-state';
import { themeState } from '../states/themeState';

export const themeEffect = (): Effect =>
    createEffect(() => {
        if (
            themeState() === 'dark' ||
            (themeState() === null && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            document.documentElement.classList.add('dark');

            return;
        }

        document.documentElement.classList.remove('dark');
    });

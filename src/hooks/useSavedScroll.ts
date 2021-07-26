import { useEffect } from 'react';
import { useSelector } from 'react-tagged-state';
import { LocalStorage } from '../classes/LocalStorage';
import { pathnameState } from '../store/states/pathnameState';

const savedScroll = LocalStorage.get('savedScroll') || {};

window.addEventListener(
    'beforeunload',
    () => {
        LocalStorage.set('savedScroll', savedScroll);
    },
    { passive: true }
);

export const useSavedScroll = (): void => {
    const pathname = useSelector(pathnameState);

    useEffect(() => {
        const handleScroll = () => {
            const value = window.pageYOffset;

            if (value) {
                savedScroll[pathname] = value;

                return;
            }

            delete savedScroll[pathname];
        };

        window.scrollTo(0, savedScroll[pathname] || 0);
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [pathname]);
};

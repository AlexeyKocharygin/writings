import { getScrollableParent } from './getScrollableParent';

export const preventBodyScroll = (event?: any): void => {
    window.addEventListener(
        'scroll',
        () => {
            const scrollableParent = getScrollableParent(event?.target as Element);

            if (scrollableParent) {
                scrollableParent.scrollTop += window.pageYOffset;
            }

            window.scrollTo(0, 0);
        },
        { passive: true, once: true }
    );
};

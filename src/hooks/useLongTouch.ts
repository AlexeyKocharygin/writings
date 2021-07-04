import { TouchEventHandler, useCallback, useEffect, useRef } from 'react';

const useLongTouch = (onLongTouch: () => void): TouchEventHandler => {
    const timeoutRef = useRef<any>();
    const onTouchEnd = useCallback(() => {
        clearTimeout(timeoutRef.current);
    }, []);
    const onTouchStart = useCallback(() => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            onLongTouch();
        }, 500);
        window.addEventListener('touchmove', onTouchEnd, { passive: true });
        window.addEventListener('touchend', onTouchEnd, { passive: true });
    }, [onLongTouch, onTouchEnd]);

    useEffect(
        () => () => {
            clearTimeout(timeoutRef.current);
            window.removeEventListener('touchmove', onTouchEnd);
            window.removeEventListener('touchend', onTouchEnd);
        },
        [onTouchEnd]
    );

    return onTouchStart;
};

export default useLongTouch;

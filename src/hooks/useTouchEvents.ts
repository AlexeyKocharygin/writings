import { useEffect } from 'react';

export const useTouchEvents = (): void => {
    useEffect(() => {
        const handleTouchStart = () => {};

        document.body.addEventListener('touchstart', handleTouchStart, { passive: true });

        return () => {
            document.body.removeEventListener('touchstart', handleTouchStart);
        };
    }, []);
};

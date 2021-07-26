import { useEffect, useState } from 'react';

const getNewCorners = (): [number, number] => [
    window.visualViewport.offsetTop,
    document.documentElement.clientHeight - window.visualViewport.height - window.visualViewport.offsetTop
];

export const useVisualViewport = (): { corners: [number, number]; scrolling: boolean } => {
    const [corners, setCorners] = useState<[number, number]>([0, 0]);
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        if (window.visualViewport) {
            let timeoutId: any;
            const handleScroll = () => {
                if (window.visualViewport.height !== document.documentElement.clientHeight) {
                    clearTimeout(timeoutId);
                    setScrolling(true);
                    timeoutId = setTimeout(() => {
                        setCorners(
                            window.visualViewport.height === document.documentElement.clientHeight
                                ? [0, 0]
                                : getNewCorners()
                        );
                        setScrolling(false);
                    }, 150);
                }
            };
            const handleResize = () => {
                if (window.visualViewport.height === document.documentElement.clientHeight) {
                    clearTimeout(timeoutId);
                    setScrolling(false);
                    setCorners([0, 0]);

                    return;
                }

                handleScroll();
            };

            window.visualViewport.addEventListener('resize', handleResize, { passive: true });
            window.addEventListener('scroll', handleScroll, { passive: true });

            return () => {
                window.visualViewport.removeEventListener('resize', handleResize);
                window.removeEventListener('scroll', handleScroll);
                clearTimeout(timeoutId);
            };
        }
    }, []);

    return {
        corners,
        scrolling
    };
};

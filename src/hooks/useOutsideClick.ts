import { RefObject, useEffect, useRef } from 'react';

export const useOutsideClick = <Type extends HTMLElement>(
    onOutsideClick: (event: MouseEvent) => void
): RefObject<Type> => {
    const ref = useRef<Type>(null);

    useEffect(() => {
        if (onOutsideClick) {
            const handleClick = (event: MouseEvent) => {
                if (!!ref.current && !ref.current.contains(event.target as Element)) {
                    onOutsideClick(event);
                }
            };

            window.addEventListener('mousedown', handleClick, { passive: true, capture: true });

            return () => {
                window.removeEventListener('mousedown', handleClick, { capture: true });
            };
        }
    }, [onOutsideClick]);

    return ref;
};

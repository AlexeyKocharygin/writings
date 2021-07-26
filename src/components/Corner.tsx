import React, { ReactElement } from 'react';
import cx from 'clsx';
import { useVisualViewport } from '../hooks/useVisualViewport';

interface IProps {
    className?: string;
    top?: boolean;
    children: any;
}

export const Corner = ({ className, top, children }: IProps): ReactElement => {
    const { scrolling, corners } = useVisualViewport();

    return (
        <div
            className={cx(className, 'child-pointer-events duration-150 sticky transition-opacity z-10')}
            style={{
                ...(scrolling ? { opacity: 0 } : {}),
                [top ? 'top' : 'bottom']: top ? corners[0] : corners[1]
            }}
        >
            {children}
        </div>
    );
};

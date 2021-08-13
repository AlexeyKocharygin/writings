import React, { MouseEventHandler, ReactElement } from 'react';
import cx from 'clsx';

interface IProps {
    'aria-label'?: string;
    className?: string;
    children: any;
    onMouseDown?: MouseEventHandler;
    onClick?: MouseEventHandler;
}

export const IconButton = ({
    'aria-label': ariaLabel,
    className,
    children,
    onMouseDown,
    onClick
}: IProps): ReactElement => (
    <button
        aria-label={ariaLabel}
        onClick={onClick}
        className={cx(
            className,
            'active:scale-75 before:-translate-x-1/2 before:-translate-y-1/2 before:absolute before:h-full before:left-1/2 before:min-h-[3rem] before:min-w-[3rem] before:top-1/2 before:w-full duration-300 flex items-center justify-center relative transition-transform'
        )}
        type="button"
        onMouseDown={onMouseDown}
    >
        {children}
    </button>
);

import React, { MouseEventHandler, ReactElement } from 'react';
import cx from 'clsx';

interface IProps {
    'aria-label'?: string;
    className?: string;
    children: any;
    active?: boolean;
    onClick?: MouseEventHandler;
}

export const MenuIconButton = ({
    'aria-label': ariaLabel,
    className,
    children,
    active,
    onClick
}: IProps): ReactElement => (
    <button
        aria-label={ariaLabel}
        className={cx(
            className,
            'active:bg-light-gray-6 bg-white dark:active:bg-dark-gray-6 dark:bg-black duration-300 flex items-center justify-center p-4 transition-color',
            !!active && 'text-light-blue dark:text-dark-blue'
        )}
        onClick={onClick}
    >
        {children}
    </button>
);

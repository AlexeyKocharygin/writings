import React, { MouseEventHandler, ReactElement } from 'react';
import cx from 'clsx';

interface IProps {
    className?: string;
    children: any;
    active?: boolean;
    onClick?: MouseEventHandler;
}

export const MenuButton = ({ className, active, children, onClick }: IProps): ReactElement => (
    <button
        className={cx(
            className,
            'active:bg-light-gray-6 bg-white dark:active:bg-dark-gray-6 dark:bg-black duration-300 flex items-center justify-center p-4 transition-color',
            !!active && 'text-light-blue dark:text-dark-blue'
        )}
        type="button"
        onClick={onClick}
    >
        {children}
    </button>
);

import React, { MouseEventHandler, ReactElement } from 'react';
import cx from 'clsx';

interface IProps {
    className?: string;
    children: any;
    onClick?: MouseEventHandler;
}

export const ModalButton = ({ className, children, onClick }: IProps): ReactElement => (
    <button
        className={cx(
            className,
            'active:bg-light-gray-6 bg-white dark:active:bg-dark-gray-6 dark:bg-black duration-300 flex items-center p-4 text-left transition-color'
        )}
        onClick={onClick}
    >
        {children}
    </button>
);

import React, { MouseEventHandler, ReactElement } from 'react';
import cx from 'clsx';

interface IProps {
    'aria-label'?: string;
    className?: string;
    children: any;
    active?: boolean;
    onClick?: MouseEventHandler;
}

const ActionIconButton = ({ 'aria-label': ariaLabel, className, children, active, onClick }: IProps): ReactElement => (
    <button
        aria-label={ariaLabel}
        className={cx(
            className,
            'active:bg-dark-gray-6 bg-black dark:active:bg-dark-gray-5 dark:bg-dark-gray-6 duration-300 flex items-center justify-center p-4 text-white transition-color',
            !!active && 'text-light-blue dark:text-dark-blue'
        )}
        onClick={onClick}
    >
        {children}
    </button>
);

export default ActionIconButton;

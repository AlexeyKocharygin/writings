import React, { MouseEventHandler, ReactElement } from 'react';
import cx from 'clsx';

interface IProps {
    className?: string;
    children: any;
    onClick?: MouseEventHandler;
}

export const PrimaryButton = ({ className, children, onClick }: IProps): ReactElement => (
    <button
        className={cx(
            className,
            'active:scale-75 backdrop-blur-lg backdrop-contrast-75 bg-opacity-50 bg-white dark:bg-black dark:bg-opacity-50 duration-300 flex items-center justify-center min-w-[75%] p-4 rounded-xl transition-transform'
        )}
        type="button"
        onClick={onClick}
    >
        {children}
    </button>
);

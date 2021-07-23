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
            'active:bg-dark-gray-6 bg-black dark:active:bg-dark-gray-5 dark:bg-dark-gray-6 duration-300 flex items-center justify-center min-w-[75%] p-4 rounded-xl shadow-xl text-white transition-color'
        )}
        onClick={onClick}
    >
        {children}
    </button>
);

PrimaryButton.defaultProps = {
    type: 'button'
};

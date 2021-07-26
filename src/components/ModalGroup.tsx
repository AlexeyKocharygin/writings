import React, { ReactElement } from 'react';
import cx from 'clsx';

interface IProps {
    className?: string;
    horizontal?: boolean;
    children: any;
}

export const ModalGroup = ({ className, horizontal, children }: IProps): ReactElement => (
    <div
        className={cx(
            className,
            'dark:divide-dark-gray-6 divide-light-gray-6 divide-solid flex z-10',
            horizontal ? 'divide-x divide-y-0' : 'flex-col divide-y divide-x-0 rounded-xl shadow-xl overflow-hidden'
        )}
    >
        {children}
    </div>
);

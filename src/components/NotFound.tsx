import React, { ReactElement } from 'react';
import { useSelector } from 'react-tagged-state';
import cx from 'clsx';
import { intlState } from '../store/states/intlState';
import { SearchIcon } from '../icons/SearchIcon';

interface IProps {
    className?: string;
    isLoading?: boolean;
}

export const NotFound = ({ className, isLoading }: IProps): ReactElement => {
    const { formatMessage } = useSelector(intlState);

    return (
        <div
            className={cx(
                className,
                'flex flex-auto flex-col items-center justify-center',
                isLoading
                    ? 'dark:text-dark-blue text-light-blue animate-pulse'
                    : 'dark:text-light-gray-2  text-dark-gray-2'
            )}
        >
            <SearchIcon className="h-12 mb-4 w-12" />
            {!isLoading && <span className="text-center text-sm">{formatMessage('notFound')}</span>}
        </div>
    );
};

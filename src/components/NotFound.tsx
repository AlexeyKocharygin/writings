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
                'dark:text-light-gray-2 flex flex-auto flex-col items-center justify-center text-dark-gray-2',
                isLoading && 'animate-pulse'
            )}
        >
            <SearchIcon className="h-12 mb-4 w-12" />
            {!isLoading && <span className="text-center text-sm">{formatMessage('notFound')}</span>}
        </div>
    );
};

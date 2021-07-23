import React, { ReactElement } from 'react';
import { useSelector } from 'react-tagged-state';
import cx from 'clsx';
import { v1 as uuidv1 } from 'uuid';
import { intlState } from '../store/states/intlState';
import { DescriptionIcon } from '../icons/DescriptionIcon';
import { AddCircleOutlineIcon } from '../icons/AddCircleOutlineIcon';
import { Router } from '../classes/Router';
import { PrimaryButton } from './PrimaryButton';

interface IProps {
    className?: string;
    isLoading?: boolean;
}

export const NoWritings = ({ className, isLoading }: IProps): ReactElement => {
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
            <DescriptionIcon className="h-12 mb-4 w-12" />
            {!isLoading && (
                <>
                    <span className="mb-8 text-center text-sm">{formatMessage('noWritings')}</span>
                    <PrimaryButton onClick={() => Router.push(`/writings/${uuidv1()}`)}>
                        <AddCircleOutlineIcon className="mr-2" />
                        {formatMessage('add')}
                    </PrimaryButton>
                </>
            )}
        </div>
    );
};

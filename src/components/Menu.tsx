import React, { MouseEventHandler, ReactElement } from 'react';
import cx from 'clsx';
import { useSelector } from 'react-tagged-state';
import { useTransition } from '../hooks/useTransition';
import { intlState } from '../store/states/intlState';
import { preventDefault } from '../utils/preventDefault';
import { Portal } from './Portal';
import { IconButton } from './IconButton';

interface IProps {
    opened?: boolean;
    onClose: () => void;
    children: any;
    onMouseDown?: MouseEventHandler;
}

export const Menu = ({ opened, children, onClose, onMouseDown }: IProps): ReactElement => {
    const transition = useTransition(!!opened, 300);
    const { formatMessage } = useSelector(intlState);

    return (
        <Portal opened={transition !== 'closed'}>
            <div
                className="fixed flex flex-col h-screen justify-end left-0 top-0 w-full z-10"
                onClick={onClose}
                onMouseDown={onMouseDown}
            >
                <div
                    onClick={preventDefault}
                    className={cx(
                        'backdrop-blur-lg backdrop-contrast-75 bg-opacity-50 bg-white border-0 border-light-gray-6 border-solid border-t dark:bg-black dark:bg-opacity-50 dark:border-dark-gray-6 duration-300 flex flex-col max-h-full pb-8 pt-4 px-4 touch-action-none transform-gpu transition-transform',
                        !['opening', 'opened'].includes(transition) && 'translate-y-full'
                    )}
                >
                    <IconButton className="mb-4 self-end" onClick={onClose}>
                        {formatMessage('done')}
                    </IconButton>
                    {children}
                </div>
            </div>
        </Portal>
    );
};

import React, { ReactElement } from 'react';
import cx from 'clsx';
import { useTransition } from '../hooks/useTransition';
import { useSlideDown } from '../hooks/useSlideDown';
import { preventDefault } from '../utils/preventDefault';
import { Portal } from './Portal';

interface IProps {
    opened?: boolean;
    onClose: () => void;
    children: any;
}

export const Modal = ({ opened, children, onClose }: IProps): ReactElement => {
    const transition = useTransition(!!opened, 300);
    const { onTouchStart, dragging, diff } = useSlideDown(onClose);

    return (
        <Portal opened={transition !== 'closed'}>
            <div className={cx('fixed flex flex-col h-screen justify-end left-0 top-0 w-full z-10')} onClick={onClose}>
                <div
                    onClick={preventDefault}
                    className={cx(
                        'backdrop-blur-lg backdrop-contrast-75 bg-opacity-50 bg-white dark:bg-black dark:bg-opacity-50 duration-300 flex flex-col max-h-[calc(100%-2rem)] pb-8 px-4 rounded-t-3xl touch-action-none transition-transform',
                        !['opening', 'opened'].includes(transition) && 'translate-y-full',
                        dragging && 'transition-none'
                    )}
                    style={diff > 0 ? { transform: `translate3d(0, ${diff}px, 0)` } : undefined}
                >
                    <div
                        className="active:scale-75 before:bg-dark-gray-2 before:h-0.5 before:rounded-full before:w-1/2 dark:before:bg-light-gray-2 duration-300 flex justify-center mb-8 py-4 sticky top-0 transition-transform z-10"
                        onClick={onClose}
                        onTouchStart={onTouchStart}
                    />
                    {children}
                </div>
            </div>
        </Portal>
    );
};

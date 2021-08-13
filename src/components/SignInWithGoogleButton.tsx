import React, { MouseEventHandler, ReactElement } from 'react';
import { useSelector } from 'react-tagged-state';
import cx from 'clsx';
import { intlState } from '../store/states/intlState';
import GoogleIcon from '../icons/Google';

interface IProps {
    className?: string;
    onClick?: MouseEventHandler;
}

export const SignInWithGoogleButton = ({ className, onClick }: IProps): ReactElement => {
    const { formatMessage } = useSelector(intlState);

    return (
        <button
            className={cx(
                className,
                'active:scale-75 bg-white duration-300 flex items-center justify-center min-w-[75%] p-4 rounded-xl shadow-xl text-black transition-transform'
            )}
            type="button"
            onClick={onClick}
        >
            <GoogleIcon className="h-6 mr-4 w-6" />
            {formatMessage('signInWithGoogle')}
        </button>
    );
};

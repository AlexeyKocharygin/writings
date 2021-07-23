import React, { MouseEventHandler, ReactElement } from 'react';
import { useSelector } from 'react-tagged-state';
import cx from 'clsx';
import { intlState } from '../store/states/intlState';

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
                'active:bg-light-gray-6 bg-white duration-300 flex items-center justify-center min-w-[75%] p-4 rounded-xl shadow-xl text-black transition-color'
            )}
            onClick={onClick}
        >
            <img
                className="h-6 mr-4 w-6"
                alt="sign in with google"
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            />
            {formatMessage('signInWithGoogle')}
        </button>
    );
};

SignInWithGoogleButton.defaultProps = {
    type: 'button'
};

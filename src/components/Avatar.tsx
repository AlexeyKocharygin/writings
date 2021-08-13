import React, { ReactElement, useEffect, useState } from 'react';
import cx from 'clsx';
import SettingsIcon from '../icons/SettingsIcon';

interface IProps {
    className?: string;
    src?: string;
}

export const Avatar = ({ className, src }: IProps): ReactElement => {
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsError(false);
    }, [src]);

    const showAvatar = !isError && !!src;

    return (
        <div className={cx(className, 'overflow-hidden rounded-full')}>
            {showAvatar && <img className="h-full" alt="avatar" src={src} onError={() => setIsError(true)} />}
            {!showAvatar && <SettingsIcon className="h-full w-full" />}
        </div>
    );
};

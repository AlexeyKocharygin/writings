import React, { ReactElement, useEffect, useState } from 'react';
import cx from 'clsx';

interface IProps {
    className?: string;
    src?: string;
    fallback?: any;
}

export const Avatar = ({ className, src, fallback }: IProps): ReactElement => {
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsError(false);
    }, [src]);

    const showAvatar = !isError && !!src;

    return (
        <div className={cx(className, 'overflow-hidden rounded-full')}>
            {showAvatar && <img className="h-full" alt="avatar" src={src} onError={() => setIsError(true)} />}
            {!showAvatar && !!fallback && fallback}
        </div>
    );
};

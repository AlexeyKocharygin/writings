import React, { ReactElement, useEffect, useState } from 'react';
import cx from 'clsx';

interface IProps {
    className?: string;
    src?: string;
}

export const Avatar = ({ className, src }: IProps): ReactElement => {
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsError(false);
    }, [src]);

    return (
        <div className={cx(className, 'bg-white dark:black overflow-hidden rounded-full')}>
            {!isError && <img className="h-full" alt="avatar" src={src} onError={() => setIsError(true)} />}
        </div>
    );
};

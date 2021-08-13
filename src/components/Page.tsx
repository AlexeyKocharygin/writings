import React, { ReactElement } from 'react';
import cx from 'clsx';

interface IProps {
    opened?: boolean;
    children: any;
}

export const Page = ({ opened, children }: IProps): ReactElement => (
    <>{opened && <div className={cx('flex flex-col min-h-screen px-4 w-full')}>{children}</div>}</>
);

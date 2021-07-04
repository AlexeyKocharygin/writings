import React, { ReactElement } from 'react';
import cx from 'clsx';
import { IWriting } from '../classes/Database';
import Writing from './Writing';

interface IProps {
    className?: string;
    writings: IWriting[];
}

const WritingsList = ({ className, writings }: IProps): ReactElement => (
    <div className={cx(className, 'auto-rows-max gap-4 grid grid-cols-2')}>
        {writings.map((writing) => (
            <Writing key={writing.id} writing={writing} />
        ))}
    </div>
);

export default WritingsList;

import React, { ReactElement } from 'react';
import { createPortal } from 'react-dom';

interface IProps {
    opened?: boolean;
    children: any;
}

export const Portal = ({ opened, children }: IProps): ReactElement => (
    <>{opened && createPortal(children, document.getElementById('root') || document.body)}</>
);

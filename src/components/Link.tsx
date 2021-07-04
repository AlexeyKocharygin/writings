import React, { ReactElement, TouchEventHandler } from 'react';
import Router from '../classes/Router';
import preventDefault from '../utils/preventDefault';

interface IProps {
    'aria-label'?: string;
    className?: string;
    href?: string;
    children: any;
    onTouchStart?: TouchEventHandler;
}

const Link = ({ 'aria-label': ariaLabel, className, href, children, onTouchStart }: IProps): ReactElement => (
    <a
        aria-label={ariaLabel}
        className={className}
        href={href}
        onClick={(event) => {
            if (href) {
                preventDefault(event);
                Router.push(href);
            }
        }}
        onTouchStart={onTouchStart}
    >
        {children}
    </a>
);

export default Link;

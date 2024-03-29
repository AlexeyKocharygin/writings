import React, { SVGProps, ReactElement } from 'react';

export const RemoveIcon = (props: SVGProps<SVGSVGElement>): ReactElement => (
    <svg xmlns="http://www.w3.org/2000/svg" height={24} width={24} viewBox="0 0 24 24" {...props}>
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M18 13H6c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1z" />
    </svg>
);

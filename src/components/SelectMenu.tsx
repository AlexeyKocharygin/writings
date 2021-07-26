import React, { ReactElement } from 'react';
import { combine } from '../utils/combine';
import { MenuGroup } from './MenuGroup';
import { MenuButton } from './MenuButton';

interface IProps<Type> {
    value: Type;
    options: Array<{ value: Type; label: string }>;
    onChange: (nextValue: Type) => void;
    onClose: () => void;
}

export const SelectMenu = <Type extends any>({ value, options, onClose, onChange }: IProps<Type>): ReactElement => (
    <MenuGroup>
        {options.map((option, index) => (
            <MenuButton
                key={index}
                active={option.value === value}
                onClick={combine(onClose, () => onChange(option.value))}
            >
                {option.label}
            </MenuButton>
        ))}
    </MenuGroup>
);

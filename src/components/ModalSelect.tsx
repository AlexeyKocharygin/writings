import React, { ReactElement } from 'react';
import { UnfoldMoreIcon } from '../icons/UnfoldMoreIcon';
import { useToggle } from '../hooks/useToggle';
import { ModalButton } from './ModalButton';
import { SelectMenu } from './SelectMenu';
import { Menu } from './Menu';

interface IProps<Type> {
    className?: string;
    value: Type;
    options: Array<{ value: Type; label: string }>;
    onChange: (nextValue: Type) => void;
    label: string;
}

export const ModalSelect = <Type extends any>({
    className,
    options,
    value,
    onChange,
    label
}: IProps<Type>): ReactElement => {
    const selectedIndex = options?.findIndex((option) => option.value === value);
    const selectedValue = options[selectedIndex]?.label || '';
    const selectMenu = useToggle();

    return (
        <>
            <ModalButton className={className} onClick={selectMenu.toggle}>
                <span className="flex-auto">{label}</span>
                <span className="dark:text-light-gray-2 text-dark-gray-2">
                    {selectedValue || (value && `${value}`)}
                </span>
                <UnfoldMoreIcon className="ml-4" />
            </ModalButton>
            <Menu onClose={selectMenu.close} opened={selectMenu.opened}>
                <SelectMenu value={value} options={options} onChange={onChange} onClose={selectMenu.close} />
            </Menu>
        </>
    );
};

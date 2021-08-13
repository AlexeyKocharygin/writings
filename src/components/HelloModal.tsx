import React, { ReactElement } from 'react';
import { useSelector } from 'react-tagged-state';
import { intlState } from '../store/states/intlState';
import { useToggle } from '../hooks/useToggle';
import LoginIcon from '../icons/LoginIcon';
import ArrowForwardIcon from '../icons/ArrowForwardIcon';
import LockIcon from '../icons/LockIcon';
import { combine } from '../utils/combine';
import { ModalButton } from './ModalButton';
import { ModalGroup } from './ModalGroup';
import { Menu } from './Menu';
import { SignInMenu } from './SignInMenu';

interface IProps {
    onClose: () => void;
}

export const HelloModal = ({ onClose }: IProps): ReactElement => {
    const { formatMessage } = useSelector(intlState);
    const signInMenu = useToggle();

    return (
        <>
            <LockIcon className="dark:text-light-gray-2 h-12 mb-4 self-center text-dark-gray-2 w-12" />
            <span className="dark:text-light-gray-2 mb-8 self-center text-center text-dark-gray-2 text-sm">
                {formatMessage('signInPlease')}
            </span>
            <ModalGroup className="flex-shrink-0 mb-8">
                <ModalButton onClick={signInMenu.toggle}>
                    <span className="flex-auto text-left">{formatMessage('signIn')}</span>
                    <LoginIcon />
                </ModalButton>
                <ModalButton onClick={onClose}>
                    <span className="flex-auto text-left">{formatMessage('continue')}</span>
                    <ArrowForwardIcon />
                </ModalButton>
            </ModalGroup>
            <Menu opened={signInMenu.opened} onClose={signInMenu.close}>
                <SignInMenu onClose={combine(onClose, () => signInMenu.close())} />
            </Menu>
        </>
    );
};

import React, { ReactElement } from 'react';
import { useSelector } from 'react-tagged-state';
import { signOut } from '../actions/signOut';
import { themeState } from '../store/states/themeState';
import { langState } from '../store/states/langState';
import { intlState } from '../store/states/intlState';
import { AutorenewIcon } from '../icons/AutorenewIcon';
import { LogoutIcon } from '../icons/LogoutIcon';
import { combine } from '../utils/combine';
import { userState } from '../store/states/userState';
import { useToggle } from '../hooks/useToggle';
import LoginIcon from '../icons/LoginIcon';
import { reload } from '../actions/reload';
import SettingsIcon from '../icons/SettingsIcon';
import { ModalButton } from './ModalButton';
import { ModalGroup } from './ModalGroup';
import { ModalSelect } from './ModalSelect';
import { Avatar } from './Avatar';
import { Menu } from './Menu';
import { SignInMenu } from './SignInMenu';

interface IProps {
    onClose: () => void;
}

export const SettingsModal = ({ onClose }: IProps): ReactElement => {
    const user = useSelector(userState);
    const themeValue = useSelector(themeState);
    const lang = useSelector(langState);
    const { formatMessage } = useSelector(intlState);
    const signInMenu = useToggle();

    return (
        <>
            <Avatar
                className="flex-shrink-0 h-16 mb-4 self-center w-16"
                src={user?.photoUrl}
                fallback={<SettingsIcon className="dark:text-light-gray-2 h-full text-dark-gray-2 w-full" />}
            />
            <span className="flex-shrink-0 self-center truncate">{user?.displayName || ' '}</span>
            <span className="dark:text-light-gray-2 flex-shrink-0 mb-8 self-center text-dark-gray-2 text-sm truncate">
                {user?.email || ' '}
            </span>
            <ModalGroup className="flex-shrink-0 mb-4">
                <ModalSelect
                    label={formatMessage('language')}
                    value={lang}
                    options={[
                        {
                            label: formatMessage('system'),
                            value: null
                        },
                        {
                            label: formatMessage('en'),
                            value: 'en'
                        },
                        {
                            label: formatMessage('ru'),
                            value: 'ru'
                        }
                    ]}
                    onChange={(value) => langState(value)}
                />
                <ModalSelect
                    label={formatMessage('theme')}
                    value={themeValue}
                    options={[
                        {
                            label: formatMessage('system'),
                            value: null
                        },
                        {
                            label: formatMessage('dark'),
                            value: 'dark'
                        },
                        {
                            label: formatMessage('light'),
                            value: 'light'
                        }
                    ]}
                    onChange={(value) => themeState(value)}
                />
            </ModalGroup>
            <ModalGroup className="flex-shrink-0">
                <ModalButton onClick={combine(onClose, () => reload())}>
                    <span className="flex-auto text-left">{formatMessage('reload')}</span>
                    <AutorenewIcon />
                </ModalButton>
                {!!user && (
                    <ModalButton onClick={combine(onClose, () => signOut())}>
                        <span className="flex-auto text-left">{formatMessage('signOut')}</span>
                        <LogoutIcon />
                    </ModalButton>
                )}
                {!user && (
                    <ModalButton onClick={signInMenu.toggle}>
                        <span className="flex-auto text-left">{formatMessage('signIn')}</span>
                        <LoginIcon />
                    </ModalButton>
                )}
            </ModalGroup>
            <Menu opened={signInMenu.opened} onClose={signInMenu.close}>
                <SignInMenu onClose={combine(onClose, () => signInMenu.close())} />
            </Menu>
        </>
    );
};

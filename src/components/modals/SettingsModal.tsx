import React, { ReactElement } from 'react';
import { useSelector } from 'react-tagged-state';
import { signOut } from '../../actions/signOut';
import { themeState } from '../../store/states/themeState';
import { langState } from '../../store/states/langState';
import { intlState } from '../../store/states/intlState';
import { AutorenewIcon } from '../../icons/AutorenewIcon';
import { LogoutIcon } from '../../icons/LogoutIcon';
import { ModalButton } from '../ModalButton';
import { ModalGroup } from '../ModalGroup';
import { ModalSelect } from '../ModalSelect';
import { combine } from '../../utils/combine';
import { Avatar } from '../Avatar';
import { userState } from '../../store/states/userState';
import { useToggle } from '../../hooks/useToggle';
import { Menu } from '../Menu';
import { SignUpMenu } from '../SignUpMenu';
import LoginIcon from '../../icons/LoginIcon';

interface IProps {
    onClose: () => void;
}

export const SettingsModal = ({ onClose }: IProps): ReactElement => {
    const user = useSelector(userState);
    const themeValue = useSelector(themeState);
    const lang = useSelector(langState);
    const { formatMessage } = useSelector(intlState);
    const signUpMenu = useToggle();

    return (
        <>
            <div className="flex flex-col items-center mb-8">
                <Avatar className="h-16 mb-4 w-16" src={user?.photoUrl} />
                <span className="truncate">{user?.displayName || ' '}</span>
                <span className="dark:text-light-gray-2 text-dark-gray-2 text-sm truncate">{user?.email || ' '}</span>
            </div>
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
                <ModalButton onClick={combine(onClose, () => document.location.reload(true))}>
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
                    <ModalButton onClick={signUpMenu.toggle}>
                        <span className="flex-auto text-left">{formatMessage('signIn')}</span>
                        <LoginIcon />
                    </ModalButton>
                )}
            </ModalGroup>
            <Menu opened={signUpMenu.opened} onClose={signUpMenu.close}>
                <SignUpMenu onClose={signUpMenu.close} />
            </Menu>
        </>
    );
};

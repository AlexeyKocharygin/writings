import React, { ReactElement, useEffect } from 'react';
import { v1 as uuidv1 } from 'uuid';
import { useSelector } from 'react-tagged-state';
import { AddCircleOutlineIcon } from '../icons/AddCircleOutlineIcon';
import { userState } from '../store/states/userState';
import { searchState } from '../store/states/searchState';
import { filteredWritingsSelector } from '../store/selectors/filteredWritingsSelector';
import { useToggle } from '../hooks/useToggle';
import { Router } from '../classes/Router';
import { intlState } from '../store/states/intlState';
import { DescriptionIcon } from '../icons/DescriptionIcon';
import { SearchIcon } from '../icons/SearchIcon';
import SettingsOutlineIcon from '../icons/SettingsOutlineIcon';
import { LocalStorage } from '../classes/LocalStorage';
import { useWritings } from '../hooks/useWritings';
import { SearchInput } from './SearchInput';
import { Avatar } from './Avatar';
import { Modal } from './Modal';
import { IconButton } from './IconButton';
import { SettingsModal } from './SettingsModal';
import { Writing } from './Writing';
import { PrimaryButton } from './PrimaryButton';
import { HelloModal } from './HelloModal';

export const WritingsPage = (): ReactElement => {
    const user = useSelector(userState);
    const search = useSelector(searchState);
    const filteredWritings = useSelector(filteredWritingsSelector);
    const settingsModal = useToggle();
    const helloModal = useToggle();
    const { formatMessage } = useSelector(intlState);
    const isLoading = useWritings();

    useEffect(() => {
        if (LocalStorage.get('intro') !== false) {
            LocalStorage.set('intro', false);

            if (!user) {
                helloModal.toggle();
            }
        }
    }, [helloModal, user]);

    return (
        <>
            <div className="flex flex-col py-8 sticky top-0 z-10">
                <div className="flex items-center justify-between mb-8">
                    <IconButton aria-label="settings" onClick={settingsModal.toggle}>
                        <Avatar
                            className="h-6 w-6"
                            src={user?.photoUrl}
                            fallback={<SettingsOutlineIcon className="h-full w-full" />}
                        />
                    </IconButton>
                    {isLoading && <span>{formatMessage('loading')}</span>}
                    <IconButton aria-label="add writing" onClick={() => Router.push(`/writings/${uuidv1()}`)}>
                        <AddCircleOutlineIcon />
                    </IconButton>
                </div>
                <SearchInput value={search} onChange={(value) => searchState(value)} />
            </div>
            {!!filteredWritings.length && (
                <div className={'flex-auto flex-shrink- auto-rows-max gap-4 grid grid-cols-2'}>
                    {filteredWritings.map((writing) => (
                        <Writing key={writing.id} writing={writing} />
                    ))}
                </div>
            )}
            {!filteredWritings.length && !isLoading && (
                <div className="flex flex-auto flex-col items-center justify-center">
                    {search === null ? (
                        <DescriptionIcon className="dark:text-light-gray-2 h-12 mb-4 text-dark-gray-2 w-12" />
                    ) : (
                        <SearchIcon className="dark:text-light-gray-2 h-12 mb-4 text-dark-gray-2 w-12" />
                    )}
                    <span className="dark:text-light-gray-2 mb-8 text-center text-dark-gray-2 text-sm">
                        {formatMessage(search === null ? 'noWritings' : 'notFound')}
                    </span>
                    <PrimaryButton onClick={() => Router.push(`/writings/${uuidv1()}`)}>
                        <AddCircleOutlineIcon className="mr-2" />
                        {formatMessage('add')}
                    </PrimaryButton>
                </div>
            )}
            <Modal opened={settingsModal.opened} onClose={settingsModal.close}>
                <SettingsModal onClose={settingsModal.close} />
            </Modal>
            <Modal opened={helloModal.opened} onClose={helloModal.close}>
                <HelloModal onClose={helloModal.close} />
            </Modal>
        </>
    );
};

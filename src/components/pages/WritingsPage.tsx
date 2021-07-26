import React, { ReactElement } from 'react';
import { v1 as uuidv1 } from 'uuid';
import { useSelector } from 'react-tagged-state';
import { AddCircleOutlineIcon } from '../../icons/AddCircleOutlineIcon';
import { userState } from '../../store/states/userState';
import { searchState } from '../../store/states/searchState';
import { filteredWritingsSelector } from '../../store/selectors/filteredWritingsSelector';
import { useFetch } from '../../hooks/useFetch';
import { fetchWritings } from '../../actions/fetchWritings';
import { SearchInput } from '../SearchInput';
import { Avatar } from '../Avatar';
import { WritingsList } from '../WritingsList';
import { NotFound } from '../NotFound';
import { NoWritings } from '../NoWritings';
import { useToggle } from '../../hooks/useToggle';
import { Modal } from '../Modal';
import { IconButton } from '../IconButton';
import { SettingsModal } from '../modals/SettingsModal';
import { Router } from '../../classes/Router';

export const WritingsPage = (): ReactElement => {
    const user = useSelector(userState);
    const search = useSelector(searchState);
    const filteredWritings = useSelector(filteredWritingsSelector);
    const settingsModal = useToggle();
    const { isLoading } = useFetch(fetchWritings);

    return (
        <>
            <div className="flex flex-col py-8 sticky top-0 z-10">
                <div className="flex items-center justify-between mb-8">
                    <IconButton aria-label="settings" onClick={settingsModal.toggle}>
                        <Avatar className="h-6 w-6" src={user?.photoUrl} />
                    </IconButton>
                    <IconButton aria-label="add writing" onClick={() => Router.push(`/writings/${uuidv1()}`)}>
                        <AddCircleOutlineIcon />
                    </IconButton>
                </div>
                <SearchInput value={search} onChange={(value) => searchState(value)} />
            </div>
            {!!filteredWritings.length && (
                <WritingsList className="flex-auto flex-shrink-0" writings={filteredWritings} />
            )}
            {!filteredWritings.length && (
                <>
                    {search !== null && <NotFound isLoading={isLoading} />}
                    {search === null && <NoWritings isLoading={isLoading} />}
                </>
            )}
            <Modal opened={settingsModal.opened} onClose={settingsModal.close}>
                <SettingsModal onClose={settingsModal.close} />
            </Modal>
        </>
    );
};

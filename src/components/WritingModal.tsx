import React, { ReactElement } from 'react';
import { useSelector } from 'react-tagged-state';
import { intlState } from '../store/states/intlState';
import { combine } from '../utils/combine';
import { IWriting } from '../classes/Database';
import { putWriting } from '../actions/putWriting';
import { shareWriting } from '../actions/shareWriting';
import { IosShareIcon } from '../icons/IosShareIcon';
import { Router } from '../classes/Router';
import { deleteWriting } from '../actions/deleteWriting';
import { DeleteOutlineIcon } from '../icons/DeleteOutlineIcon';
import { EditIcon } from '../icons/EditIcon';
import { ToggledDate } from './ToggledDate';
import { ModalGroup } from './ModalGroup';
import { ModalButton } from './ModalButton';

interface IProps {
    writingId: string;
    writing?: IWriting;
    onClose: () => void;
}

export const WritingModal = ({ writingId, writing, onClose }: IProps): ReactElement => {
    const { formatMessage } = useSelector(intlState);

    return (
        <>
            <div className="flex flex-col items-center mb-8">
                <span className="mb-4 truncate">{writing?.title || formatMessage('noTitle')}</span>
                <ToggledDate createdOn={writing?.createdOn} updatedOn={writing?.updatedOn} />
            </div>
            <ModalGroup className="mb-4">
                <ModalButton
                    onClick={() => {
                        const result = prompt(formatMessage('saveAs'), writing?.title);

                        if (typeof result !== 'string') {
                            return;
                        }

                        if (result !== (writing?.title || '')) {
                            putWriting(writingId, { title: result });
                        }

                        onClose();
                    }}
                >
                    <span className="flex-auto text-left">{formatMessage('saveAs')}</span>
                    <EditIcon />
                </ModalButton>
            </ModalGroup>
            <ModalGroup className="flex-shrink-0">
                {!!writing && (
                    <ModalButton onClick={combine(onClose, () => shareWriting(writing?.id))}>
                        <span className="flex-auto text-left">{formatMessage('share')}</span>
                        <IosShareIcon />
                    </ModalButton>
                )}
                <ModalButton
                    onClick={() => {
                        onClose();
                        Router.replace('/');

                        if (writing) {
                            deleteWriting(writing?.id);
                        }
                    }}
                >
                    <span className="flex-auto text-left">{formatMessage('remove')}</span>
                    <DeleteOutlineIcon />
                </ModalButton>
            </ModalGroup>
        </>
    );
};

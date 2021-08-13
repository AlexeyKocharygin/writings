import React, { ReactElement, useState } from 'react';
import { useSelector } from 'react-tagged-state';
import cx from 'clsx';
import { putWriting } from '../../actions/putWriting';
import { MoreHorizIcon } from '../../icons/MoreHorizIcon';
import { writingsState } from '../../store/states/writingsState';
import { useFetch } from '../../hooks/useFetch';
import { usePermanentMatch } from '../../hooks/usePermanentMatch';
import { IconButton } from '../IconButton';
import { Editor } from '../Editor';
import { Router } from '../../classes/Router';
import { ArrowBackIosIcon } from '../../icons/ArrowBackIosIcon';
import { useToggle } from '../../hooks/useToggle';
import { Modal } from '../Modal';
import { WritingModal } from '../modals/WritingModal';
import { preventDefault } from '../../utils/preventDefault';
import { AddIcon } from '../../icons/AddIcon';
import { Menu } from '../Menu';
import { RichStylesMenu } from '../RichStylesMenu';
import { Corner } from '../Corner';
import { intlState } from '../../store/states/intlState';
import { fetchWritings } from '../../actions/fetchWritings';

export const WritingPage = (): ReactElement => {
    const { writingId } = usePermanentMatch<{ writingId: string }>('/writings/:writingId');
    const writing = useSelector(() => writingsState()[writingId], [writingId]);
    const richStyleMenu = useToggle();
    const writingModal = useToggle();
    const [focused, setFocused] = useState(false);
    const { formatMessage } = useSelector(intlState);

    useFetch(fetchWritings);

    return (
        <>
            <Corner className="flex items-center justify-between py-8" top>
                <IconButton
                    aria-label="back"
                    onClick={() => {
                        if (writing?.title) {
                            Router.back();

                            return;
                        }

                        const result = prompt(formatMessage('saveAs'));

                        if (typeof result !== 'string') {
                            return;
                        }

                        if (result) {
                            putWriting(writingId, { title: result });
                        }

                        Router.back();
                    }}
                >
                    <ArrowBackIosIcon />
                </IconButton>
                <IconButton aria-label="more" onClick={writingModal.toggle}>
                    <MoreHorizIcon />
                </IconButton>
            </Corner>
            <Editor
                className="after:block after:h-[50vh] after:pointer-events-none after:w-full flex-auto"
                inputMode={richStyleMenu.opened ? 'none' : undefined}
                value={writing?.content}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onChange={(html) => putWriting(writingId, { content: html })}
            />
            <Corner
                className={cx(
                    'flex justify-end py-4',
                    focused ? 'child-pointer-events' : 'opacity-0 pointer-events-none'
                )}
            >
                <IconButton aria-label="richStyle" onClick={richStyleMenu.toggle} onMouseDown={preventDefault}>
                    <AddIcon />
                </IconButton>
            </Corner>
            <Menu opened={richStyleMenu.opened} onClose={richStyleMenu.close} onMouseDown={preventDefault}>
                <RichStylesMenu onClose={richStyleMenu.close} />
            </Menu>
            <Modal opened={writingModal.opened} onClose={writingModal.close}>
                <WritingModal writingId={writingId} writing={writing} onClose={writingModal.close} />
            </Modal>
        </>
    );
};

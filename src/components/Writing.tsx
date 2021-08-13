import React, { ReactElement } from 'react';
import { useSelector } from 'react-tagged-state';
import cx from 'clsx';
import { intlState } from '../store/states/intlState';
import { IWriting } from '../classes/Database';
import { useLongTouch } from '../hooks/useLongTouch';
import { useToggle } from '../hooks/useToggle';
import { Link } from './Link';
import { WritingModal } from './WritingModal';
import { Modal } from './Modal';

interface IProps {
    className?: string;
    writing: IWriting;
}

export const Writing = ({ className, writing }: IProps): ReactElement => {
    const { formatMessage } = useSelector(intlState);
    const writingModal = useToggle();
    const onTouchStart = useLongTouch(writingModal.open);

    return (
        <>
            <Link
                className={cx(
                    className,
                    'active:scale-75 duration-300 flex flex-col items-center transition-transform'
                )}
                href={`/writings/${writing.id}`}
                onTouchStart={onTouchStart}
            >
                <div className="bg-white flex flex-col h-[80px] leading-none mb-4 px-[3px] py-[6px] relative rounded-lg shadow-xl text-[3px] text-black w-[64px]">
                    <div
                        className="flex-auto overflow-hidden"
                        dangerouslySetInnerHTML={{ __html: writing.content.slice(0, 1000) }}
                    />
                </div>
                <span className="line-clamp-2 max-w-full text-center">{writing.title || formatMessage('noTitle')}</span>
            </Link>
            <Modal opened={writingModal.opened} onClose={writingModal.close}>
                <WritingModal writingId={writing.id} writing={writing} onClose={writingModal.close} />
            </Modal>
        </>
    );
};

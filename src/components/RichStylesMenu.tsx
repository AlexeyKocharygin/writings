import React, { ReactElement } from 'react';
import { useRichStyles } from '../hooks/useRichStyles';
import { FormatAlignCenterIcon } from '../icons/FormatAlignCenterIcon';
import { FormatAlignLeftIcon } from '../icons/FormatAlignLeftIcon';
import { FormatAlignRightIcon } from '../icons/FormatAlignRightIcon';
import { FormatBoldIcon } from '../icons/FormatBoldIcon';
import { FormatItalicIcon } from '../icons/FormatItalicIcon';
import { FormatListBulletedIcon } from '../icons/FormatListBulletedIcon';
import { FormatListNumberedIcon } from '../icons/FormatListNumberedIcon';
import { FormatSizeIcon } from '../icons/FormatSizeIcon';
import { FormatUnderlinedIcon } from '../icons/FormatUnderlinedIcon';
import { RichUtils } from '../classes/RichUtils';
import { combine } from '../utils/combine';
import { MenuIconButton } from './MenuIconButton';
import { MenuGroup } from './MenuGroup';

interface IProps {
    onClose: () => void;
}

export const RichStylesMenu = ({ onClose }: IProps): ReactElement => {
    const formatting = useRichStyles();

    return (
        <>
            <MenuGroup className="mb-4">
                <MenuGroup horizontal>
                    <MenuIconButton
                        aria-label="toggle justify left"
                        className="flex-auto"
                        active={formatting.isJustifyLeft}
                        onClick={combine(onClose, () => RichUtils.toggleJustifyLeft())}
                    >
                        <FormatAlignLeftIcon />
                    </MenuIconButton>
                    <MenuIconButton
                        aria-label="toggle justify center"
                        className="flex-auto"
                        active={formatting.isJustifyCenter}
                        onClick={combine(onClose, () => RichUtils.toggleJustifyCenter())}
                    >
                        <FormatAlignCenterIcon />
                    </MenuIconButton>
                    <MenuIconButton
                        aria-label="toggle justify right"
                        className="flex-auto"
                        active={formatting.isJustifyRight}
                        onClick={combine(onClose, () => RichUtils.toggleJustifyRight())}
                    >
                        <FormatAlignRightIcon />
                    </MenuIconButton>
                </MenuGroup>
            </MenuGroup>
            <MenuGroup className="mb-4">
                <MenuGroup horizontal>
                    <MenuIconButton
                        aria-label="toggle header"
                        className="flex-auto"
                        active={formatting.isHeader}
                        onClick={combine(onClose, () => RichUtils.toggleHeader())}
                    >
                        <FormatSizeIcon />
                    </MenuIconButton>
                    <MenuIconButton
                        aria-label="toggle unordered list"
                        className="flex-auto"
                        active={formatting.isUnorderedList}
                        onClick={combine(onClose, () => RichUtils.toggleUnorderedList())}
                    >
                        <FormatListBulletedIcon />
                    </MenuIconButton>
                    <MenuIconButton
                        aria-label="toggle ordered list"
                        className="flex-auto"
                        active={formatting.isOrderedList}
                        onClick={combine(onClose, () => RichUtils.toggleOrderedList())}
                    >
                        <FormatListNumberedIcon />
                    </MenuIconButton>
                </MenuGroup>
            </MenuGroup>
            <MenuGroup>
                <MenuGroup horizontal>
                    <MenuIconButton
                        aria-label="toggle bold"
                        className="flex-auto"
                        active={formatting.isBold}
                        onClick={combine(onClose, () => RichUtils.toggleBold())}
                    >
                        <FormatBoldIcon />
                    </MenuIconButton>
                    <MenuIconButton
                        aria-label="toggle italic"
                        className="flex-auto"
                        active={formatting.isItalic}
                        onClick={combine(onClose, () => RichUtils.toggleItalic())}
                    >
                        <FormatItalicIcon />
                    </MenuIconButton>
                    <MenuIconButton
                        aria-label="toggle underline"
                        className="flex-auto"
                        active={formatting.isUnderline}
                        onClick={combine(onClose, () => RichUtils.toggleUnderline())}
                    >
                        <FormatUnderlinedIcon />
                    </MenuIconButton>
                </MenuGroup>
            </MenuGroup>
        </>
    );
};

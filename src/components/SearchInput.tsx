import React, { ReactElement } from 'react';
import { useSelector } from 'react-tagged-state';
import cx from 'clsx';
import { CancelIcon } from '../icons/CancelIcon';
import { SearchIcon } from '../icons/SearchIcon';
import { intlState } from '../store/states/intlState';
import { ISearch } from '../classes/LocalStorage';
import { IconButton } from './IconButton';

interface IProps {
    className?: string;
    value: ISearch;
    onChange: (nextValue: ISearch) => void;
}

export const SearchInput = ({ className, value = null, onChange }: IProps): ReactElement => {
    const { formatMessage } = useSelector(intlState);

    return (
        <div className={cx(className, 'flex items-center')}>
            <label
                className={cx(
                    'backdrop-blur-lg backdrop-contrast-75 bg-opacity-50 bg-white dark:bg-black dark:bg-opacity-50 flex flex-auto items-center p-2 rounded-xl'
                )}
            >
                <SearchIcon
                    className={cx(
                        'duration-300 flex-shrink-0 mr-2 transition-color',
                        value === null && 'dark:text-light-gray-2 text-dark-gray-2'
                    )}
                />
                <input
                    className="dark:placeholder-light-gray-2 placeholder-dark-gray-2 w-full"
                    inputMode="search"
                    value={value || ''}
                    placeholder={formatMessage('search')}
                    onChange={(event) => onChange(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.keyCode === 13) {
                            (event.target as HTMLInputElement).blur();
                        }
                    }}
                    onFocus={() => {
                        if (value === null) {
                            onChange('');
                        }
                    }}
                    onBlur={() => {
                        if (!value) {
                            onChange(null);
                        }
                    }}
                />
                <IconButton
                    aria-label="clear"
                    className={cx('flex-shrink-0 ml-2', !value && 'opacity-0 pointer-events-none')}
                    onClick={() => onChange('')}
                >
                    <CancelIcon />
                </IconButton>
            </label>
            <IconButton className={cx('flex-shrink-0 ml-2', value === null && 'hidden')} onClick={() => onChange(null)}>
                {formatMessage('cancel')}
            </IconButton>
        </div>
    );
};

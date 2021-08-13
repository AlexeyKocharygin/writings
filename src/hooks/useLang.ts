import { useEffect } from 'react';
import { themeEffect } from '../store/effects/themeEffect';

export const useLang = (): void => {
    useEffect(themeEffect);
};

import { useEffect } from 'react';
import { themeEffect } from '../store/effects/themeEffect';

export const useTheme = (): void => {
    useEffect(themeEffect, []);
};

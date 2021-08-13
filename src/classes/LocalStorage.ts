import { IBrowserLang } from '../utils/getBrowserLang';
import { IUser } from './Auth';

export type ILang = null | IBrowserLang;

export type ITheme = null | 'light' | 'dark';

export type ISearch = null | string;

interface ILocalStorageScheme {
    'state/user': IUser | null;
    'state/lang': ILang;
    'state/theme': ITheme;
    'state/search': ISearch;
    writingsUpdatedOn: number;
    savedScroll: Record<string, number>;
    syncDeleteWritings: string[];
    syncPutWritings: string[];
    intro: boolean;
}

class LocalStorageClass {
    set<Type extends keyof ILocalStorageScheme>(
        key: Type,
        data: ILocalStorageScheme[Type] | ((data: ILocalStorageScheme[Type] | undefined) => ILocalStorageScheme[Type])
    ): void {
        window.localStorage.setItem(key, JSON.stringify(typeof data === 'function' ? data(this.get(key)) : data));
    }

    get<Type extends keyof ILocalStorageScheme>(key: Type): ILocalStorageScheme[Type] | undefined {
        const item = window.localStorage.getItem(key);

        return item ? JSON.parse(item) : item;
    }

    remove<Type extends keyof ILocalStorageScheme>(key: Type) {
        window.localStorage.removeItem(key);
    }

    clear(): void {
        window.localStorage.clear();
    }
}

export const LocalStorage = new LocalStorageClass();

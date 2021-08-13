import { copy } from './copy';

export const remove =
    <Type>(key: string) =>
    (object: Record<string, Type> = {}): Record<string, Type> => {
        const objectCopy = copy()(object);

        delete objectCopy[key];

        return objectCopy;
    };

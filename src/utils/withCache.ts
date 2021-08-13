import { getId } from './getId';

let pending: Record<string, Promise<void>> = {};
let fulfilled: Record<string, boolean> = {};

export const withCache = <Type extends (...args: any[]) => Promise<void>>(
    action: Type,
    getName?: (...args: Parameters<Type>) => string
): ((...args: Parameters<Type>) => Promise<void>) => {
    const id = getId();

    return async (...args) => {
        const name = getName ? getName(...args) : id;

        if (pending[name]) {
            return pending[name];
        }

        if (fulfilled[name]) {
            return;
        }

        pending[name] = action(...args);

        await pending[name];

        if (pending[name]) {
            delete pending[name];

            fulfilled[name] = true;
        }
    };
};

withCache.clear = () => {
    pending = {};
    fulfilled = {};
};

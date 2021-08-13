export const without =
    <Type>(data: Type) =>
    (array: Type[] = []): Type[] =>
        array.includes(data) ? array.filter((arrayItem) => arrayItem !== data) : array;

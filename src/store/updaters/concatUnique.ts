export const concatUnique =
    <Type>(data: Type) =>
    (array: Type[] = []): Type[] =>
        array.includes(data) ? array : array.concat(data);

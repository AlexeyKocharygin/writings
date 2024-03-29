export const objectToArray = <Type>(object: Record<string, Type>): Type[] =>
    Object.keys(object).map((key) => object[key]);

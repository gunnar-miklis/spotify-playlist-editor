/**
 * Sorts an array of objects based on a field and toggles the sort order between ascending and descending.
 * @param field The property name to sort by.
 * @param initalArray The array to sort.
 * @param isAsc Whether to sort in ascending (true) or descending (false) order.
 * @returns A tuple containing the sorted array and the opposite boolean value of `isAsc`.
 * @throws An error if the type of the values in the array at the given property is not: string, boolean, or number.
 */
export function sortObjectsByField<ObjectType>(
  field: keyof ObjectType,
  initalArray: ObjectType[],
  isAsc: boolean,
): [ObjectType[], boolean] {
  const sortedArray = initalArray.toSorted((a, b) => {
    if (typeof a[field] === 'string' && typeof b[field] === 'string') {
      return isAsc
        ? a[field].localeCompare(b[field])
        : b[field].localeCompare(a[field]);
    }
    if (typeof a[field] === 'boolean' && typeof b[field] === 'boolean') {
      return isAsc
        ? Number(a[field]) - Number(b[field])
        : Number(b[field]) - Number(a[field]);
    }
    if (typeof a[field] === 'number' && typeof b[field] === 'number') {
      return isAsc ? a[field] - b[field] : b[field] - a[field];
    }
    throw new Error('Sorting failed: Unexpected type.');
  });
  const isAscToggled = isAsc ? false : true;
  return [sortedArray, isAscToggled];
}

/**
 * Converts milliseconds to minutes and seconds.
 * @param ms the number of milliseconds.
 * @returns a string in the format of '02:05'.
 */
export function msToMin(ms: number): string {
  const minutes: number = Math.floor(ms / 60 / 1000);
  const seconds: string = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes.toString().padStart(2, '0')}:${seconds.padStart(2, '0')}`;
}

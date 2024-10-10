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

/**
 * Returns the first two letters of a string, capitalized.
 * @param {string} name The string to get initials from.
 * @returns {string} The first two letters of the string, capitalized.
 */
export function getIntials(name: string) {
  return (name.charAt(0) + name.charAt(1)).toUpperCase();
}

/**
 * Converts any given string into kebab case (words are separated by hyphens).
 *
 * @example
 * convertToKebabCase('Spotify Playlist Assistant'); // => 'spotify-playlist-assistant'
 * convertToKebabCase('Playlist: 07/11 ++'); // => 'playlist-07-11'
 *
 * @param {string} str - the string to convert into kebab case.
 * @returns {string} the formatted string.
 */
export function convertToKebabCase(str: string): string {
  const formattedStr = str
    .toLowerCase()
    .replace(/\W+(?=\W?)/g, '-') // replaces everything non-word char with "-"
    .replace(/(^\W+)|(\W+$)/g, ''); // remove a non-word char at the beginning and end of the string

  return formattedStr;
}

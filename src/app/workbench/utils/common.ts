import { environment } from '@app/environments';
import { v4 as uuidv4 } from 'uuid';

/** Assign a new add to the object
 * @param object Object to assign a new ID to.
 * @returns Object with a new ID.
 */
export function assignNewId(object: any) {
  object.id = uuidv4();
  return object;
}

/** Returns the size of an object in bytes.
 * @param object Object to get the size of.
 * @returns Size of the object in bytes.
 */
export function byteSize(object: Object) {
  return new Blob([JSON.stringify(object)]).size;
}

/** Escape special characters in Regexp.
 * @param string String to escape.
 * @returns Escaped string.
 */
export function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

/** Returns the url for a given path.
 * @param route A given route, e.g. '/login' (with slashes).
 * @returns Url for a given path.
 */
export function getAppUrl(route: string) {
  return environment.appUrl + route;
}

/** Returns a random element from an array.
 * @param arr Array to get a random element from.
 * @returns Random element from the array.
 */
export function getRandomElement<T>(arr: Array<T>): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Returns the id of the latest element or null.
 * @param arr Array to get the last id from.
 * @param id: Input id.
 * @returns Id of the latest element.
 */
export function getLastObjectIdOrNull(arr: any[] | undefined): any | null {
  if (arr === undefined) {
    return null;
  }
  const lastId = arr[arr.length - 1]?.id;
  if (lastId !== undefined) {
    return lastId;
  } else {
    return null;
  }
}

// TODO(gustavoauma): Document and refactor this function. It's not generic enough.
export function keepSelectionIfPossible(
  arr: any[] | undefined,
  name: string
): any | null {
  if (arr === undefined) {
    return null;
  }
  const item = arr.find((x) => x.name === name);
  // Get the id of the item with the same "name" field passed by the caller.
  if (item !== undefined) {
    return item.id;
  } else {
    return getLastObjectIdOrNull(arr);
  }
}

/** Returns an id from the array that is different from the input id or null.
 * @param arr Array to get the last id from.
 * @param id: Input id.
 * @returns Id of the latest element.
 */
export function getOtherOrNull(arr: any[] | undefined, id: any): any | null {
  if (arr === undefined) {
    return null;
  }

  const otherId = arr.find((x) => x !== id);
  if (otherId !== undefined) {
    return otherId;
  } else {
    return null;
  }
}

/** Converts a list to a dictionary.
 *
 * @param list The list of elements.
 * @param idFn Function to generate the id of an element, e.g. (x) => x.id
 * @returns Dictionary with the elements of the list.
 */
export function listToDict<T>(
  list: T[],
  idFn: (arg: T) => string
): { [key: string]: T } {
  const dict: { [key: string]: T } = {};
  list.forEach((element) => {
    const dictKey = idFn(element);
    dict[dictKey] = element;
  });
  return dict;
}

/** Returns an array with the given range.
 * @param start Start of the range.
 * @param stop Stop of the range.
 * @param step Step of the range.
 * @returns Array with the given range.
 */
export function range(start: number, stop: number, step: number = 1): number[] {
  if (typeof stop == 'undefined') {
    // one param defined
    stop = start;
    start = 0;
  }
  if (typeof step == 'undefined') {
    step = 1;
  }
  if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
    return [];
  }
  var result = [];
  for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i);
  }
  return result;
}

/**
 * Sort two objects by id.
 * @param a Object A.
 * @param b Object B.
 * @returns -1 if a < b, 0 if a == b, 1 if a > b.
 * This is used as a sortComparer for @ngrx/entity.
 * @see https://ngrx.io/guide/entity/adapter#sorting
 */
export function sortComparerById(a: any, b: any): number {
  return a?.id?.localeCompare(b?.id);
}

/**
 * Sort two objects by name.
 * @param a Object A.
 * @param b Object B.
 * @returns -1 if a < b, 0 if a == b, 1 if a > b.
 * This is used as a sortComparer for @ngrx/entity.
 * @see https://ngrx.io/guide/entity/adapter#sorting
 */
export function sortComparerByName(a: any, b: any): number {
  return a?.name?.localeCompare(b?.name);
}

/**
 * Sort and remove duplicates from an array of numbers.
 * @param arr Array of numbers.
 * @returns Sorted array of unique numbers.
 */
export function sortUniqNumbers(arr: number[]): number[] {
  return [...new Set(arr)].sort(function (a, b) {
    return a - b;
  });
}

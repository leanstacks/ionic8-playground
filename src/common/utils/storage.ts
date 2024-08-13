import { StorageKey } from './constants';

/**
 * Returns the current value associated with the given `key`, or `null` if
 * the given key does not exist.
 * @param {StorageKey} key - The storage `key`.
 * @returns {string | null} Returns the value if found, otherwise `null`.
 * @see {@link localStorage.getItem}
 */
const getItem = (key: StorageKey): string | null => {
  return localStorage.getItem(key);
};

/**
 * Removes the key/value pair with the given `key`, if a key/value pair with the given key exists.
 *
 * Dispatches a storage event on Window objects holding an equivalent Storage object.
 * @param {StorageKey} key - The storage `key`.
 * @see {@link localstorage.removeItem}
 */
const removeItem = (key: StorageKey): void => {
  localStorage.removeItem(key);
};

/**
 * Sets the value of the pair identified by `key` to `value`, creating a new
 * key/value pair if none existed for key previously.
 *
 * Throws a "QuotaExceededError" DOMException exception if the new value couldn't be set.
 * (Setting could fail if, e.g., the user has disabled storage for the site, or if the quota has been exceeded.)
 *
 * Dispatches a storage event on Window objects holding an equivalent Storage
 * object.
 * @param {StorageKey} key - The storage `key`.
 * @param {string} value - The `value` to be stored.
 * @see {@link localStorage.setItem}
 */
const setItem = (key: StorageKey, value: string): void => {
  localStorage.setItem(key, value);
};

const storage = {
  getItem,
  removeItem,
  setItem,
};

export default storage;

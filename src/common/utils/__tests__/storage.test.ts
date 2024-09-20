import { afterEach, describe, expect } from 'vitest';

import { StorageKey } from '../constants';

import storage from '../storage';

describe('storage', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('should get item', () => {
    // ARRANGE
    const value = '1024';
    localStorage.setItem(StorageKey.RememberMe, value);

    // ASSERT
    expect(storage.getItem(StorageKey.RememberMe)).toBe(value);
  });

  it('should set item', () => {
    // ARRANGE
    const value = '2048';
    storage.setItem(StorageKey.RememberMe, value);

    // ASSERT
    expect(localStorage.getItem(StorageKey.RememberMe)).toBe(value);
  });

  it('should remove item', () => {
    // ARRANGE
    const value = '3072';
    storage.setItem(StorageKey.RememberMe, value);
    expect(localStorage.getItem(StorageKey.RememberMe)).toBe(value);

    // ACT
    storage.removeItem(StorageKey.RememberMe);

    // ASSERT
    expect(localStorage.getItem(StorageKey.RememberMe)).toBeNull();
  });

  it('should get JSON', () => {
    // ARRANGE
    const value = { id: 10, value: 'hello' };
    localStorage.setItem(StorageKey.RememberMe, JSON.stringify(value));

    // ASSERT
    expect(storage.getJsonItem(StorageKey.RememberMe)).toEqual(value);
  });

  it('should use fallback when cannot find JSON item', () => {
    // ARRANGE
    const value = { id: 10, value: 'hello' };
    const fallback = { id: 20, value: 'goodbye' };

    localStorage.setItem(StorageKey.RememberMe, JSON.stringify(value));

    // ASSERT
    expect(storage.getJsonItem(StorageKey.Settings, fallback)).not.toEqual(value);
    expect(storage.getJsonItem(StorageKey.Settings, fallback)).toEqual(fallback);
  });

  it('should return null when cannot find JSON item and no fallback', () => {
    // ARRANGE
    const value = { id: 10, value: 'hello' };

    localStorage.setItem(StorageKey.RememberMe, JSON.stringify(value));

    // ASSERT
    expect(storage.getJsonItem(StorageKey.Settings)).toBeNull();
  });

  it('should set JSON', () => {
    // ARRANGE
    const value = { id: 30, value: 'hola' };
    storage.setJsonItem(StorageKey.RememberMe, value);

    // ASSERT
    expect(JSON.parse(localStorage.getItem(StorageKey.RememberMe) || '{}')).toEqual(value);
  });
});

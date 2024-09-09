import { describe, expect, it, vi } from 'vitest';

import { renderHook, waitFor } from 'test/test-utils';
import storage from 'common/utils/storage';
import { StorageKey } from 'common/utils/constants';
import { profileFixture1 } from '__fixtures__/profiles';
import { userFixture1 } from '__fixtures__/users';

import { useGetProfile } from '../useGetProfile';

describe('useGetProfile', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should get profile', async () => {
    // ARRANGE
    const getItemSpy = vi.spyOn(storage, 'getItem');
    getItemSpy.mockReturnValue(JSON.stringify(profileFixture1));
    const { result } = renderHook(() => useGetProfile());
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // ASSERT
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual(profileFixture1);
  });

  it('should initialize profile from current user', async () => {
    // ARRANGE
    const getItemSpy = vi.spyOn(storage, 'getItem');
    // no stored profile; use current user
    getItemSpy.mockImplementation((key: StorageKey) => {
      if (key == StorageKey.UserProfile) return null;
      if (key == StorageKey.User) return JSON.stringify(userFixture1);
      return null;
    });
    const { result } = renderHook(() => useGetProfile());
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // ASSERT
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data?.name).toBe(userFixture1.name);
    expect(result.current.data?.email).toBe(userFixture1.email);
    expect(result.current.data?.bio).toBeUndefined();
  });

  it('should error with profile not found', async () => {
    // ARRANGE
    const getItemSpy = vi.spyOn(storage, 'getItem');
    // no stored profile; use current user
    getItemSpy.mockImplementation(() => {
      return null;
    });
    const { result } = renderHook(() => useGetProfile());
    await waitFor(() => expect(result.current.isError).toBe(true));

    // ASSERT
    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBe('Profile not found.');
  });

  it('should return error', async () => {
    // ARRANGE
    const getItemSpy = vi.spyOn(storage, 'getItem');
    getItemSpy.mockImplementation(() => {
      throw new Error('test');
    });
    const { result } = renderHook(() => useGetProfile());
    await waitFor(() => expect(result.current.isError).toBe(true));

    // ASSERT
    expect(result.current.isError).toBe(true);
  });
});

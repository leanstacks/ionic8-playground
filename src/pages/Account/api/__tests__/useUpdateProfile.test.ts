import { afterAll, describe, expect, it, vi } from 'vitest';

import { renderHook, waitFor } from 'test/test-utils';
import { userFixture1 } from '__fixtures__/users';
import storage from 'common/utils/storage';
import { StorageKey } from 'common/utils/constants';

import { useUpdateProfile } from '../useUpdateProfile';

describe('useUpdateProfile', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  afterAll(() => {
    storage.removeItem(StorageKey.User);
  });

  it('should update profile', async () => {
    // ARRANGE
    let isSuccess = false;
    storage.setItem(StorageKey.User, JSON.stringify(userFixture1));
    const { result } = renderHook(() => useUpdateProfile());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ACT
    result.current.mutate(
      { profile: userFixture1 },
      {
        onSuccess: () => {
          isSuccess = true;
        },
      },
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // ASSERT
    expect(isSuccess).toBe(true);
  });

  it('should error when no stored profile', async () => {
    // ARRANGE
    let isSuccess = false;
    let isError = false;
    storage.removeItem(StorageKey.User);
    const { result } = renderHook(() => useUpdateProfile());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ACT
    result.current.mutate(
      { profile: userFixture1 },
      {
        onSuccess: () => {
          isSuccess = true;
        },
        onError: () => {
          isError = true;
        },
      },
    );
    await waitFor(() => expect(result.current.isError).toBe(true));

    // ASSERT
    expect(isSuccess).toBe(false);
    expect(isError).toBe(true);
  });

  it('should error when an error is caught in mutation function', async () => {
    // ARRANGE
    let isSuccess = false;
    let isError = false;
    const getItemSpy = vi.spyOn(storage, 'getItem');
    getItemSpy.mockImplementation(() => {
      throw new Error('test');
    });
    const { result } = renderHook(() => useUpdateProfile());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ACT
    result.current.mutate(
      { profile: userFixture1 },
      {
        onSuccess: () => {
          isSuccess = true;
        },
        onError: () => {
          isError = true;
        },
      },
    );
    await waitFor(() => expect(result.current.isError).toBe(true));

    // ASSERT
    expect(isSuccess).toBe(false);
    expect(isError).toBe(true);
  });
});
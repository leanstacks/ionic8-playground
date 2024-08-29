import { afterEach, describe, expect, it, vi } from 'vitest';

import { renderHook, waitFor } from 'test/test-utils';
import { settingsFixture } from '__fixtures__/settings';
import storage from 'common/utils/storage';

import { useUpdateSettings } from '../useUpdateSettings';

describe('useUpdateSettings', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should update settings', async () => {
    // ARRANGE
    let isSuccess = false;
    const { result } = renderHook(() => useUpdateSettings());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ACT
    result.current.mutate(
      { settings: settingsFixture },
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

  it('should error when update fails', async () => {
    // ARRANGE
    const setItemSpy = vi.spyOn(storage, 'setItem');
    setItemSpy.mockImplementation(() => {
      throw new Error('test');
    });
    let isError = false;
    let isSuccess = false;
    const { result } = renderHook(() => useUpdateSettings());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ACT
    result.current.mutate(
      { settings: settingsFixture },
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
    expect(isError).toBe(true);
    expect(isSuccess).toBe(false);
  });
});

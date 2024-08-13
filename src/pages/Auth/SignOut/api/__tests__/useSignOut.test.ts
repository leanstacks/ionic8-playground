import { describe, expect, it, vi } from 'vitest';

import { renderHook, waitFor } from 'test/test-utils';
import storage from 'common/utils/storage';

import { useSignOut } from '../useSignOut';

describe('useSignOut', () => {
  it('should render hook sucessufully', async () => {
    // ARRANGE
    let isSuccess = false;
    const { result } = renderHook(() => useSignOut());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ACT
    result.current.mutate(undefined, {
      onSuccess: () => {
        isSuccess = true;
      },
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // ASSERT
    expect(isSuccess).toBe(true);
  });

  it('should return error when sign out fails', async () => {
    // ARRANGE
    const removeItemSpy = vi.spyOn(storage, 'removeItem');
    removeItemSpy.mockImplementation(() => {
      throw new Error('test');
    });
    let isError = false;
    const { result } = renderHook(() => useSignOut());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ACT
    result.current.mutate(undefined, {
      onError: () => {
        isError = true;
      },
    });
    await waitFor(() => expect(result.current.isError).toBe(true));

    // ASSERT
    expect(isError).toBe(true);
  });
});

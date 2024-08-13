import { describe, expect, it } from 'vitest';

import { renderHook, waitFor } from 'test/test-utils';
import { usersFixture } from '__fixtures__/users';

import { useSignIn } from '../useSignIn';

describe('useSignIn', () => {
  it('should render hook successfully', async () => {
    // ARRANGE
    let isSuccess = false;
    const { result } = renderHook(() => useSignIn());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ACT
    result.current.mutate(usersFixture[0].username, {
      onSuccess: () => {
        isSuccess = true;
      },
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // ASSERT
    expect(isSuccess).toBe(true);
  });

  it('should return error when sign in fails', async () => {
    // ARRANGE
    const badUsername = 'invalidUsername';
    let isError = false;
    const { result } = renderHook(() => useSignIn());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ACT
    result.current.mutate(badUsername, {
      onError: () => {
        isError = true;
      },
    });
    await waitFor(() => expect(result.current.isError).toBe(true));

    // ASSERT
    expect(isError).toBe(true);
  });
});

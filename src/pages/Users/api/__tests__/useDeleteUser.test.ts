import { describe, expect, it } from 'vitest';

import { renderHook, waitFor } from 'test/test-utils';
import { queryClient } from 'test/query-client';
import { QueryKey } from 'common/utils/constants';
import { userFixture1, usersFixture } from '__fixtures__/users';

import { useDeleteUser } from '../useDeleteUser';
import { User } from 'common/models/user';

describe('useDeleteUser', () => {
  it('should delete user', async () => {
    // ARRANGE
    let isSuccess = false;
    const { result } = renderHook(() => useDeleteUser());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ACT
    result.current.mutate(
      { id: userFixture1.id },
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

  it('should update cached data when exists', async () => {
    // ARRANGE
    const userId = usersFixture[0].id;
    const originalSize = usersFixture.length;
    queryClient.setQueryData([QueryKey.Users], usersFixture);
    let isSuccess = false;
    const { result } = renderHook(() => useDeleteUser());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ACT
    result.current.mutate(
      { id: userId },
      {
        onSuccess: () => {
          isSuccess = true;
        },
      },
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // ASSERT
    expect(isSuccess).toBe(true);
    const cachedUsers = queryClient.getQueryData<User[]>([QueryKey.Users]);
    expect(cachedUsers?.length).toBe(originalSize - 1);
    expect(cachedUsers?.find((user) => user.id === userId)).toBeUndefined();
  });
});

import { describe, expect, it } from 'vitest';

import { renderHook, waitFor } from 'test/test-utils';
import { queryClient } from 'test/query-client';
import { QueryKey } from 'common/utils/constants';
import { User } from 'common/models/user';
import { userFixture1 } from '__fixtures__/users';

import { useUpdateUser } from '../useUpdateUser';

describe('useUpdateUser', () => {
  it('should update user', async () => {
    // ARRANGE
    let isSuccess = false;
    const { result } = renderHook(() => useUpdateUser());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ACT
    result.current.mutate(
      { user: userFixture1 },
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
    const updatedUser = { ...userFixture1 };
    updatedUser.name = 'Updated Name';
    const userIdStr = '' + updatedUser.id;
    queryClient.setQueryData([QueryKey.Users, userIdStr], userFixture1);
    let isSuccess = false;
    const { result } = renderHook(() => useUpdateUser());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ACT
    result.current.mutate(
      { user: updatedUser },
      {
        onSuccess: () => {
          isSuccess = true;
        },
      },
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // ASSERT
    expect(isSuccess).toBe(true);
    expect(queryClient.getQueryData<User>([QueryKey.Users, userIdStr])).toEqual(updatedUser);
  });

  it('should create cached data when none exists', async () => {
    // ARRANGE
    const userIdStr = '' + userFixture1.id;
    let isSuccess = false;
    const { result } = renderHook(() => useUpdateUser());
    await waitFor(() => expect(result.current).not.toBeNull());
    expect(queryClient.getQueryData<User>([QueryKey.Users, userIdStr])).toBeUndefined();

    // ACT
    result.current.mutate(
      { user: userFixture1 },
      {
        onSuccess: () => {
          isSuccess = true;
        },
      },
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // ASSERT
    expect(isSuccess).toBe(true);
    expect(queryClient.getQueryData<User>([QueryKey.Users, userIdStr])).toEqual(userFixture1);
  });
});

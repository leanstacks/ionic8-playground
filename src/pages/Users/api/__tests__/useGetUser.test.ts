import { describe, expect, it } from 'vitest';

import { renderHook, waitFor } from 'test/test-utils';
import { useGetUser } from '../useGetUser';

describe('useGetUser', () => {
  it('should get user', async () => {
    // ARRANGE
    const { result } = renderHook(() => useGetUser({ userId: '1' }));
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // ASSERT
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBeDefined();
    expect(result.current.data?.id).toEqual(1);
  });
});

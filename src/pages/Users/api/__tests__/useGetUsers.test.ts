import { renderHook, waitFor } from 'test/test-utils';
import { describe, expect, it } from 'vitest';

import { useGetUsers } from '../useGetUsers';

describe('useGetUsers', () => {
  it('should get users', async () => {
    // ARRANGE
    const { result } = renderHook(() => useGetUsers());
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // ASSERT
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBeDefined();
    expect(result.current.data?.length).toBe(2);
  });
});

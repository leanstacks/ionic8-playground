import { describe, expect, it } from 'vitest';
import { renderHook, waitFor } from 'test/test-utils';

import { useAxios } from '../useAxios';

describe('useAxios', () => {
  it('should return context', async () => {
    // ARRANGE
    const { result } = renderHook(() => useAxios());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ASSERT
    expect(result.current).toBeDefined();
    expect(result.current.request).toBeDefined();
  });
});

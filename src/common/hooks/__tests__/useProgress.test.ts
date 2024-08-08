import { describe, expect, it } from 'vitest';

import { renderHook, waitFor } from 'test/test-utils';

import { useProgress } from '../useProgress';

describe('useProgress', () => {
  it('should return context', async () => {
    // ARRANGE
    const { result } = renderHook(() => useProgress());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ASSERT
    expect(result.current).toBeDefined();
    expect(result.current.isActive).toBe(false);
  });
});

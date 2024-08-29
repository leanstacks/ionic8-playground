import { describe, expect, it } from 'vitest';

import { renderHook, waitFor } from 'test/test-utils';

import { usePlatform } from '../usePlatform';

describe('usePlatform', () => {
  it('should return platform details', async () => {
    // ARRANGE
    const { result } = renderHook(() => usePlatform());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ASSERT
    expect(result.current).toBeDefined();
    expect(result.current.isNativePlatform).toBe(false);
    expect(result.current.platforms.length).toBeGreaterThan(0);
  });
});

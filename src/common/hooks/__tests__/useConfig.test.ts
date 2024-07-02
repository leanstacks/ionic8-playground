import { describe, expect, it } from 'vitest';
import { renderHook as renderHookWithoutWrapper } from '@testing-library/react';

import { renderHook, waitFor } from 'test/test-utils';

import { useConfig } from '../useConfig';

describe('useConfig', () => {
  it('should return the context', async () => {
    // ARRANGE
    const { result } = renderHook(() => useConfig());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ASSERT
    expect(result.current).toBeDefined();
    expect(result.current.VITE_BUILD_ENV_CODE).toBe('test');
  });

  it('should throw error when not within provider', () => {
    // ASSERT
    expect(() => renderHookWithoutWrapper(() => useConfig())).toThrow(/hook must be used within/);
  });
});

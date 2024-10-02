import { describe, expect, it } from 'vitest';
import { renderHook as renderHookWithoutWrapper } from '@testing-library/react';

import { act, renderHook, waitFor } from 'test/test-utils';

import { useScrollContext } from '../useScrollContext';

describe('useScrollContext', () => {
  it('should return context', async () => {
    // ARRANGE
    const { result } = renderHook(() => useScrollContext());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ASSERT
    expect(result.current).toBeDefined();
    expect(result.current.handleIonScroll).toBeDefined();
    expect(result.current.scrollDirection).toBeUndefined();
  });

  it('should return default context', async () => {
    // ARRANGE
    const { result } = renderHookWithoutWrapper(() => useScrollContext());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ACT
    act(() =>
      result.current.handleIonScroll({
        // @ts-expect-error required detail attributes only
        detail: {
          startY: 0,
          currentY: 100,
        },
      }),
    );

    // ASSERT
    expect(result.current).toBeDefined();
    expect(result.current.handleIonScroll).toBeDefined();
    expect(result.current.scrollDirection).toBeUndefined();
  });

  it('should set scroll direction down', async () => {
    // ARRANGE
    const { result } = renderHook(() => useScrollContext());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ACT
    act(() =>
      result.current.handleIonScroll({
        // @ts-expect-error required detail attributes only
        detail: {
          startY: 0,
          currentY: 100,
        },
      }),
    );

    // ASSERT
    expect(result.current).toBeDefined();
    expect(result.current.handleIonScroll).toBeDefined();
    expect(result.current.scrollDirection).toBe('down');
  });

  it('should set scroll direction up', async () => {
    // ARRANGE
    const { result } = renderHook(() => useScrollContext());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ACT
    act(() =>
      result.current.handleIonScroll({
        // @ts-expect-error required detail attributes only
        detail: {
          startY: 100,
          currentY: 0,
        },
      }),
    );

    // ASSERT
    expect(result.current).toBeDefined();
    expect(result.current.handleIonScroll).toBeDefined();
    expect(result.current.scrollDirection).toBe('up');
  });
});

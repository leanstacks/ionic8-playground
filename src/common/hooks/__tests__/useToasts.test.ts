import { describe, expect, it } from 'vitest';
import { renderHook as renderHookWithoutWrapper } from '@testing-library/react';

import { act, renderHook, waitFor } from 'test/test-utils';

import { useToasts } from '../useToasts';

describe('useToasts', () => {
  it('should return the context', async () => {
    // ARRANGE
    const { result } = renderHook(() => useToasts());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ASSERT
    expect(result.current).not.toBeNull();
    expect(Array.isArray(result.current.toasts)).toBe(true);
    expect(result.current.toasts.length).toBe(0);
    expect(typeof result.current.createToast).toBe('function');
    expect(typeof result.current.removeToast).toBe('function');
  });

  it('should create a toast', async () => {
    // ARRANGE
    const { result } = renderHook(() => useToasts());
    await waitFor(() => expect(result.current).not.toBeNull());
    expect(result.current.toasts.length).toBe(0);

    // ACT
    act(() => result.current.createToast({ message: 'Test toast', duration: 5000 }));

    // ASSERT
    await waitFor(() => expect(result.current.toasts.length).toBe(1));
  });

  it('should remove a toast', async () => {
    // ARRANGE
    const { result } = renderHook(() => useToasts());
    await waitFor(() => expect(result.current).not.toBeNull());
    expect(result.current.toasts.length).toBe(0);

    // ACT
    act(() => result.current.createToast({ message: 'Test toast', duration: 5000 }));
    await waitFor(() => expect(result.current.toasts.length).toBe(1));
    act(() => result.current.removeToast(result.current.toasts[0].id));

    // ASSERT
    await waitFor(() => expect(result.current.toasts.length).toBe(0));
  });

  it('should throw error when not within provider', async () => {
    // ASSERT
    expect(() => renderHookWithoutWrapper(() => useToasts())).toThrow(
      /useToasts hook must be used within a ToastProvider/,
    );
  });
});

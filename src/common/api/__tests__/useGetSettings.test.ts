import { afterEach, describe, expect, it, vi } from 'vitest';

import { renderHook, waitFor } from 'test/test-utils';
import { settingsFixture } from '__fixtures__/settings';
import storage from 'common/utils/storage';
import { DEFAULT_SETTINGS } from 'common/utils/constants';

import { useGetSettings } from '../useGetSettings';

describe('useGetUser', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should get settings', async () => {
    // ARRANGE
    const { result } = renderHook(() => useGetSettings());
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // ASSERT
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual(DEFAULT_SETTINGS);
  });

  it('should get settings from storage', async () => {
    // ARRANGE
    const getItemSpy = vi.spyOn(storage, 'getItem');
    getItemSpy.mockReturnValue(JSON.stringify(settingsFixture));
    const { result } = renderHook(() => useGetSettings());
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // ASSERT
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual({ ...DEFAULT_SETTINGS, ...settingsFixture });
  });

  it('should return error', async () => {
    // ARRANGE
    const getItemSpy = vi.spyOn(storage, 'getItem');
    getItemSpy.mockImplementation(() => {
      throw new Error('test');
    });
    const { result } = renderHook(() => useGetSettings());
    await waitFor(() => expect(result.current.isError).toBe(true));

    // ASSERT
    expect(result.current.isError).toBe(true);
  });
});

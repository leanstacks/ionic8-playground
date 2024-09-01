import { expect, it, vi } from 'vitest';

import { render, screen } from 'test/test-utils';
import * as UsePlatform from 'common/hooks/usePlatform';

import PlatformDiagnostics from '../PlatformDiagnostics';

describe('PlatformDiagnostics', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should render successfully', async () => {
    // ARRANGE
    render(<PlatformDiagnostics />);
    await screen.findByTestId('diagnostics-platform');

    // ASSERT
    expect(screen.getByTestId('diagnostics-platform')).toBeDefined();
  });

  it('should display platform values', async () => {
    // ARRANGE
    const usePlatformSpy = vi.spyOn(UsePlatform, 'usePlatform');
    usePlatformSpy.mockReturnValue({ isNativePlatform: true, platforms: ['test'] });
    render(<PlatformDiagnostics />);
    await screen.findByTestId('diagnostics-platform');

    // ASSERT
    expect(screen.getByTestId('diagnostics-platform')).toBeDefined();
    expect(screen.getByTestId('diagnostics-platform-is-native')).toBeDefined();
    expect(screen.queryByTestId('diagnostics-platform-not-native')).toBeNull();
    expect(screen.getAllByTestId('diagnostics-platform-platform').length).toBe(1);
  });

  it('should display non-native badge', async () => {
    // ARRANGE
    const usePlatformSpy = vi.spyOn(UsePlatform, 'usePlatform');
    usePlatformSpy.mockReturnValue({ isNativePlatform: false, platforms: ['test', 'test2'] });
    render(<PlatformDiagnostics />);
    await screen.findByTestId('diagnostics-platform');

    // ASSERT
    expect(screen.getByTestId('diagnostics-platform')).toBeDefined();
    expect(screen.getByTestId('diagnostics-platform-not-native')).toBeDefined();
    expect(screen.queryByTestId('diagnostics-platform-is-native')).toBeNull();
    expect(screen.getAllByTestId('diagnostics-platform-platform').length).toBe(2);
  });
});

import { describe, expect, it, vi } from 'vitest';
import { UseQueryResult } from '@tanstack/react-query';
import { AppInfo } from '@capacitor/app';

import { render, screen } from 'test/test-utils';
import * as UsePlatform from 'common/hooks/usePlatform';
import * as UseGetAppInfo from 'pages/Account/api/useGetAppInfo';
import { appInfoFixture } from '__fixtures__/appinfo';

import AppDiagnostics from '../AppDiagnostics';

describe('AppDiagnostics', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render successfully', async () => {
    // ARRANGE
    render(<AppDiagnostics />);
    await screen.findByTestId('diagnostics-app');

    // ASSERT
    expect(screen.getByTestId('diagnostics-app')).toBeDefined();
  });

  it('should render non-native values', async () => {
    // ARRANGE
    const usePlatformSpy = vi.spyOn(UsePlatform, 'usePlatform');
    usePlatformSpy.mockReturnValue({ isNativePlatform: false, platforms: [] });
    render(<AppDiagnostics />);
    await screen.findByTestId('diagnostics-app');

    // ASSERT
    expect(screen.getByTestId('diagnostics-app')).toBeDefined();
    expect(screen.getByTestId('diagnostics-app-not-native')).toBeDefined();
    expect(screen.getByTestId('diagnostics-app-not-native')).toHaveTextContent(
      /Information available on mobile devices./,
    );
  });

  it('should display app info', async () => {
    // ARRANGE
    const usePlatformSpy = vi.spyOn(UsePlatform, 'usePlatform');
    usePlatformSpy.mockReturnValue({ isNativePlatform: true, platforms: [] });
    const useGetAppInfoSpy = vi.spyOn(UseGetAppInfo, 'useGetAppInfo');
    useGetAppInfoSpy.mockReturnValue({
      data: appInfoFixture,
      isLoading: false,
    } as unknown as UseQueryResult<AppInfo>);
    render(<AppDiagnostics />);
    await screen.findByTestId('diagnostics-app-name');

    // ASSERT
    expect(screen.getByTestId('diagnostics-app-name')).toHaveTextContent(appInfoFixture.name);
    expect(screen.getByTestId('diagnostics-app-id')).toHaveTextContent(appInfoFixture.id);
    expect(screen.getByTestId('diagnostics-app-build')).toHaveTextContent(appInfoFixture.build);
    expect(screen.getByTestId('diagnostics-app-version')).toHaveTextContent(appInfoFixture.version);
  });

  it('should display loading state', async () => {
    // ARRANGE
    const usePlatformSpy = vi.spyOn(UsePlatform, 'usePlatform');
    usePlatformSpy.mockReturnValue({ isNativePlatform: true, platforms: [] });
    const useGetAppInfoSpy = vi.spyOn(UseGetAppInfo, 'useGetAppInfo');
    useGetAppInfoSpy.mockReturnValue({
      data: undefined,
      isLoading: true,
    } as unknown as UseQueryResult<AppInfo>);
    render(<AppDiagnostics />);
    await screen.findByTestId('diagnostics-app-loading');

    // ASSERT
    expect(screen.getByTestId('diagnostics-app-loading')).toBeDefined();
  });
});

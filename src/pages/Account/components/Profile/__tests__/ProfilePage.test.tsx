import { describe, expect, it, vi } from 'vitest';
import { UseQueryResult } from '@tanstack/react-query';

import { render, screen } from 'test/test-utils';
import { profileFixture1 } from '__fixtures__/profiles';
import { Profile } from 'common/models/profile';
import * as UseGetProfile from 'pages/Account/api/useGetProfile';

import ProfilePage from '../ProfilePage';

describe('ProfilePage', () => {
  const useGetProfileSpy = vi.spyOn(UseGetProfile, 'useGetProfile');

  it('should render successfully', async () => {
    // ARRANGE
    useGetProfileSpy.mockReturnValueOnce({
      data: profileFixture1,
      isLoading: false,
      isError: false,
      isSuccess: true,
    } as unknown as UseQueryResult<Profile, Error>);
    render(<ProfilePage />);
    await screen.findByTestId('page-profile');

    // ASSERT
    expect(screen.getByTestId('page-profile')).toBeDefined();
  });

  it('should render loading state', async () => {
    // ARRANGE
    useGetProfileSpy.mockReturnValueOnce({ isLoading: true } as unknown as UseQueryResult<
      Profile,
      Error
    >);
    render(<ProfilePage />);
    await screen.findByTestId('page-profile-loading');

    // ASSERT
    expect(screen.getByTestId('page-profile-loading')).toBeDefined();
  });

  it('should render error state', async () => {
    // ARRANGE
    useGetProfileSpy.mockReturnValueOnce({
      isError: true,
      isLoading: false,
    } as unknown as UseQueryResult<Profile, Error>);
    render(<ProfilePage />);
    await screen.findByTestId('page-profile-error');

    // ASSERT
    expect(screen.getByTestId('page-profile-error')).toBeDefined();
  });

  it('should render profile', async () => {
    // ARRANGE
    useGetProfileSpy.mockReturnValueOnce({
      data: profileFixture1,
      isLoading: false,
      isError: false,
      isSuccess: true,
    } as unknown as UseQueryResult<Profile, Error>);
    render(<ProfilePage />);
    await screen.findByTestId('form-profile');

    // ASSERT
    expect(screen.getByTestId('form-profile')).toBeDefined();
  });
});

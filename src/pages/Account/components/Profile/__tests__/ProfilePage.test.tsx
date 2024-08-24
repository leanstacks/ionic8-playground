import { describe, expect, it, vi } from 'vitest';
import { UseQueryResult } from '@tanstack/react-query';

import { render, screen } from 'test/test-utils';
import { User } from 'common/models/user';
import { userFixture1 } from '__fixtures__/users';
import * as UseGetCurrentUser from 'common/api/useGetCurrentUser';

import ProfilePage from '../ProfilePage';

describe('ProfilePage', () => {
  const useGetCurrentUserSpy = vi.spyOn(UseGetCurrentUser, 'useGetCurrentUser');

  it('should render successfully', async () => {
    // ARRANGE
    useGetCurrentUserSpy.mockReturnValueOnce({
      data: userFixture1,
      isLoading: false,
      isError: false,
      isSuccess: true,
    } as unknown as UseQueryResult<User, Error>);
    render(<ProfilePage />);
    await screen.findByTestId('page-profile');

    // ASSERT
    expect(screen.getByTestId('page-profile')).toBeDefined();
  });

  it('should render loading state', async () => {
    // ARRANGE
    useGetCurrentUserSpy.mockReturnValueOnce({ isLoading: true } as unknown as UseQueryResult<
      User,
      Error
    >);
    render(<ProfilePage />);
    await screen.findByTestId('page-profile-loading');

    // ASSERT
    expect(screen.getByTestId('page-profile-loading')).toBeDefined();
  });

  it('should render error state', async () => {
    // ARRANGE
    useGetCurrentUserSpy.mockReturnValueOnce({
      isError: true,
      isLoading: false,
    } as unknown as UseQueryResult<User, Error>);
    render(<ProfilePage />);
    await screen.findByTestId('page-profile-error');

    // ASSERT
    expect(screen.getByTestId('page-profile-error')).toBeDefined();
  });
});

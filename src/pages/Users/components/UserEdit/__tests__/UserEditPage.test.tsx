import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UseQueryResult } from '@tanstack/react-query';

import { render, screen } from 'test/test-utils';
import { User } from 'common/models/user';
import * as UseGetUser from 'pages/Users/api/useGetUser';
import { userFixture1 } from '__fixtures__/users';

import UserEditPage from '../UserEditPage';

// mock select functions from react-router
vi.mock('react-router', async () => {
  const original = await vi.importActual('react-router');
  return {
    ...original,
    useParams: () => ({
      userId: userFixture1.id,
    }),
  };
});

describe('UserEditPage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should render successfully', async () => {
    // ARRANGE
    render(<UserEditPage />);
    await screen.findByTestId('page-user-edit');

    // ASSERT
    expect(screen.getByTestId('page-user-edit')).toBeDefined();
  });

  it('should render loading state', async () => {
    // ARRANGE
    const useGetUserSpy = vi.spyOn(UseGetUser, 'useGetUser');
    useGetUserSpy.mockReturnValue({
      data: undefined,
      error: undefined,
      isPending: true,
    } as unknown as UseQueryResult<User>);
    render(<UserEditPage />);
    await screen.findByTestId('page-user-edit');

    // ASSERT
    expect(screen.getByTestId('page-user-edit')).toBeDefined();
    expect(screen.getByTestId('page-user-edit-loader')).toBeDefined();
  });

  it('should render user details', async () => {
    // ARRANGE
    render(<UserEditPage />);
    await screen.findByTestId('page-user-edit-title');

    // ASSERT
    expect(screen.getByTestId('page-user-edit-title')).toBeDefined();
  });
});

import { describe, expect, it, vi } from 'vitest';
import { UseQueryResult } from '@tanstack/react-query';

import { render, screen } from 'test/test-utils';
import { userFixture1 } from '__fixtures__/users';
import * as UseGetUser from 'pages/Users/api/useGetUser';
import { User } from 'common/models/user';

import UserDetailPage from '../UserDetailPage';

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

describe('UserDetailPage', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<UserDetailPage />);
    await screen.findByTestId('page-user-detail');

    // ASSERT
    expect(screen.getByTestId('page-user-detail')).toBeDefined();
  });

  it('should render user details', async () => {
    // ARRANGE
    render(<UserDetailPage testid="test" />);
    await screen.findByTestId('test-header-button-edit');

    // ASSERT
    expect(screen.getByTestId('test-header-button-edit')).toBeDefined();
    expect(screen.getByTestId('test-header-button-delete')).toBeDefined();
    expect(screen.getByTestId('test-page-header-button-edit')).toBeDefined();
    expect(screen.getByTestId('test-page-header-button-delete')).toBeDefined();
    expect(screen.getByTestId('test-page-header-title')).toHaveTextContent(userFixture1.name);
  });

  it('should render loader when no user', async () => {
    // ARRANGE
    const useGetUserSpy = vi.spyOn(UseGetUser, 'useGetUser');
    useGetUserSpy.mockReturnValue({
      data: undefined,
      isPending: true,
      isSuccess: false,
    } as unknown as UseQueryResult<User>);
    render(<UserDetailPage testid="test" />);
    await screen.findByTestId('test');

    // ASSERT
    expect(screen.getByTestId('test')).toBeDefined();
    expect(screen.queryByTestId('test-loader')).toBeDefined();
  });
});

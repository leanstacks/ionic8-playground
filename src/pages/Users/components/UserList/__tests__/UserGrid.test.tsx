import { describe, expect, it, vi } from 'vitest';
import { UseQueryResult } from '@tanstack/react-query';

import { render, screen } from 'test/test-utils';
import * as UseGetUsers from 'pages/Users/api/useGetUsers';
import { User } from 'common/models/user';

import UserGrid from '../UserGrid';

describe('UserGrid', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<UserGrid />);
    await screen.findByTestId('grid-user');

    // ASSERT
    expect(screen.getByTestId('grid-user')).toBeDefined();
  });

  it('should render grid', async () => {
    // ARRANGE
    render(<UserGrid />);
    await screen.findByTestId('grid-user-card-user-1');

    // ASSERT
    expect(screen.getByTestId('grid-user-card-user-1')).toBeDefined();
  });

  it('should render loading state', async () => {
    // ARRANGE
    const useGetUsersSpy = vi.spyOn(UseGetUsers, 'useGetUsers');
    useGetUsersSpy.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as unknown as UseQueryResult<User[], Error>);
    render(<UserGrid />);
    await screen.findByTestId('grid-user-loader');

    // ASSERT
    expect(screen.getByTestId('grid-user-loader')).toBeDefined();
  });

  it('should render error state', async () => {
    // ARRANGE
    const useGetUsersSpy = vi.spyOn(UseGetUsers, 'useGetUsers');
    useGetUsersSpy.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    } as unknown as UseQueryResult<User[], Error>);
    render(<UserGrid />);
    await screen.findByTestId('grid-user-error');

    // ASSERT
    expect(screen.getByTestId('grid-user-error')).toBeDefined();
  });

  it('should render empty state', async () => {
    // ARRANGE
    const useGetUsersSpy = vi.spyOn(UseGetUsers, 'useGetUsers');
    useGetUsersSpy.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    } as unknown as UseQueryResult<User[], Error>);
    render(<UserGrid />);
    await screen.findByTestId('grid-user-empty');

    // ASSERT
    expect(screen.getByTestId('grid-user-empty')).toBeDefined();
  });
});

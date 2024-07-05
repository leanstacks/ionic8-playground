import { afterEach, describe, expect, it, vi } from 'vitest';

import { render, screen } from 'test/test-utils';
import * as UseGetUsers from '../../../api/useGetUsers';
import UserSummaryCard from '../UserSummaryCard';
import { UseQueryResult } from '@tanstack/react-query';
import { User } from 'common/models/user';

describe('UserSummaryCard', () => {
  afterEach(() => {
    // restore all mocks to their original implementations
    vi.restoreAllMocks();
  });

  it('should render successfully', async () => {
    // ARRANGE
    render(<UserSummaryCard />);
    await screen.findByTestId('card-user-summary');

    // ASSERT
    expect(screen.getByTestId('card-user-summary')).toBeDefined();
  });

  it('should render badge with user count', async () => {
    // ARRANGE
    render(<UserSummaryCard />);
    await screen.findByTestId('card-user-summary-badge');

    // ASSERT
    expect(screen.getByTestId('card-user-summary-badge')).toHaveTextContent('2');
  });

  it('should not render badge when user data not available', async () => {
    // ARRANGE
    const useGetUsersSpy = vi.spyOn(UseGetUsers, 'useGetUsers');
    useGetUsersSpy.mockReturnValueOnce({
      data: undefined,
      error: undefined,
      isPending: true,
    } as unknown as UseQueryResult<User[], Error>);
    render(<UserSummaryCard />);
    await screen.findByTestId('card-user-summary');

    // ASSERT
    expect(screen.getByTestId('card-user-summary')).toBeDefined();
    expect(screen.queryByTestId('card-user-summary-badge')).toBeNull();
  });
});

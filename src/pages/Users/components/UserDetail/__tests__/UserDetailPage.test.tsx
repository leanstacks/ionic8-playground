import { describe, expect, it, vi } from 'vitest';

import { render, screen } from 'test/test-utils';
import { userFixture1 } from '__fixtures__/users';

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
    render(<UserDetailPage />);
    await screen.findByTestId('page-user-detail-user-detail');

    // ASSERT
    expect(screen.getByTestId('page-user-detail-user-detail')).toBeDefined();
  });
});

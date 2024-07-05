import { describe, expect, it, vi } from 'vitest';

import { render, screen } from 'test/test-utils';
import UserDetailPage from '../UserDetailPage';

// mock select functions from react-router
vi.mock('react-router', async () => {
  const original = await vi.importActual('react-router');
  return {
    ...original,
    useParams: () => ({
      userId: '1',
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
    await screen.findByTestId('page-user-detail-name');

    // ASSERT
    expect(screen.getByTestId('page-user-detail')).toBeDefined();
    expect(screen.getByTestId('page-user-detail-name')).toHaveTextContent('Leanne Graham');
  });

  it.skip('should render loading state', async () => {});

  it.skip('should render error state', async () => {});
});

import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';

import { render, screen, waitFor } from 'test/test-utils';

import UserListPage from '../UserListPage';

describe('UserListPage', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<UserListPage />);
    await screen.findByTestId('page-user-list');

    // ASSERT
    expect(screen.getByTestId('page-user-list')).toBeDefined();
  });

  it('should filter users', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<UserListPage />);
    await screen.findByTestId('list-item-user-1');

    // ACT
    await user.click(screen.getByPlaceholderText(/Search/i));
    await user.type(screen.getByPlaceholderText(/Search/i), 'Ervin');
    await waitFor(() => expect(screen.queryByTestId('list-item-user-1')).toBeNull());

    // ASSERT
    expect(screen.queryByTestId('list-item-user-1')).toBeNull();
    expect(screen.getByTestId('list-item-user-2')).toBeDefined();
  });
});

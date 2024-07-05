import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';
import UserListPage from '../UserListPage';

describe('UserListPage', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<UserListPage />);
    await screen.findByTestId('page-user-list');

    // ASSERT
    expect(screen.getByTestId('page-user-list')).toBeDefined();
  });
});

import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import UserAddFab from '../UserAddFab';

describe('UserAddFab', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<UserAddFab />);
    await screen.findByTestId('fab-user-add');

    // ASSERT
    expect(screen.getByTestId('fab-user-add')).toBeDefined();
  });
});

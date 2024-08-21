import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import UserAddPage from '../UserAddPage';

describe('UserAddPage', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<UserAddPage />);
    await screen.findByTestId('page-user-add');

    // ASSERT
    expect(screen.getByTestId('page-user-add')).toBeDefined();
  });
});

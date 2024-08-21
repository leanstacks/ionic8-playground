import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import UserAdd from '../UserAdd';

describe('UserAdd', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<UserAdd />);
    await screen.findByTestId('user-add');

    // ASSERT
    expect(screen.getByTestId('user-add')).toBeDefined();
  });
});

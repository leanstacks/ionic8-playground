import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import SignOutPage from '../SignOutPage';

describe('SignOutPage', () => {
  it('should render successfully', async () => {
    // ASSERT
    render(<SignOutPage />);
    await screen.findByTestId('page-signout');

    // ASSERT
    expect(screen.getByTestId('page-signout')).toBeDefined();
  });
});

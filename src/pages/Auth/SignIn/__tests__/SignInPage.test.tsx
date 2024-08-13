import { expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import SignInPage from '../SignInPage';

describe('SignInPage', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<SignInPage />);
    await screen.findByTestId('page-signin');

    // ASSERT
    expect(screen.getByTestId('page-signin')).toBeDefined();
  });
});

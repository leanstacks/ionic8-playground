import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import AccountPage from '../AccountPage';

describe('AccountPage', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<AccountPage />);
    await screen.findByTestId('page-account');

    expect(screen.getByTestId('page-account')).toBeDefined();
  });
});

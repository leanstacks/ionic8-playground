import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';
import { userFixture1 } from '__fixtures__/users';

import UserSummary from '../UserSummary';

describe('UserSummary', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<UserSummary user={userFixture1} />);
    await screen.findByTestId('user-summary');

    // ASSERT
    expect(screen.getByTestId('user-summary')).toBeDefined();
  });

  it('should render loading state', async () => {
    // ARRANGE
    render(<UserSummary />);
    await screen.findByTestId('user-summary-loader');

    // ASSERT
    expect(screen.getByTestId('user-summary-loader')).toBeDefined();
  });
});

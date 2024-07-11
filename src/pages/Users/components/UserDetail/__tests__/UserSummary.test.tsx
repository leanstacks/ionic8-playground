import { describe, expect, it } from 'vitest';

import { render, screen, waitFor } from 'test/test-utils';
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
    render(<UserSummary isLoading={true} />);
    await screen.findByTestId('user-summary-loader');

    // ASSERT
    expect(screen.getByTestId('user-summary-loader')).toBeDefined();
  });

  it('should render empty state', async () => {
    // ARRANGE
    const { container } = render(<UserSummary />);
    await waitFor(() => expect(container).toBeDefined());

    // ASSERT
    expect(screen.queryByTestId('user-summary')).toBeNull();
  });
});

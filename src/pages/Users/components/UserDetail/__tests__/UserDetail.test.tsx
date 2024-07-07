import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';
import { userFixture1 } from '__fixtures__/users';

import UserDetail from '../UserDetail';

describe('UserDetail', () => {
  const userId: string = '' + userFixture1.id;

  it('should render successfully', async () => {
    // ARRANGE
    render(<UserDetail userId={userId} />);
    await screen.findByTestId('user-detail');

    // ASSERT
    expect(screen.getByTestId('user-detail')).toBeDefined();
  });

  it('should render user details', async () => {
    // ARRANGE
    render(<UserDetail userId={userId} />);
    await screen.findByTestId('user-detail-user-summary');

    // ASSERT
    expect(screen.getByTestId('user-detail-user-summary')).toBeDefined();
    expect(screen.getByTestId('user-detail-company-detail')).toBeDefined();
    expect(screen.getByTestId('user-detail-address-detail')).toBeDefined();
  });

  it('should render error state', async () => {
    // ARRANGE
    const NOT_FOUND = 'notFound';
    render(<UserDetail userId={NOT_FOUND} />);
    await screen.findByTestId('user-detail-error');

    // ASSERT
    expect(screen.getByTestId('user-detail-error')).toBeDefined();
  });
});

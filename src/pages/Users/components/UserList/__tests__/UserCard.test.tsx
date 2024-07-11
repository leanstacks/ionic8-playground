import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';
import { userFixture1 } from '__fixtures__/users';

import UserCard from '../UserCard';

describe('UserCard', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<UserCard user={userFixture1} />);
    await screen.findByTestId('card-user');

    // ASSERT
    expect(screen.getByTestId('card-user')).toBeDefined();
  });
});

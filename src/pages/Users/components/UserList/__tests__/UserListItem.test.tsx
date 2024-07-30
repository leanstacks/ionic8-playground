import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';
import { userFixture1 } from '__fixtures__/users';

import UserListItem from '../UserListItem';

describe('UserListItem', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<UserListItem user={userFixture1} />);
    await screen.findByTestId('list-item-user-1');

    // ASSERT
    expect(screen.getByTestId('list-item-user-1')).toBeDefined();
  });

  it('should render item', async () => {
    // ARRANGE
    render(<UserListItem user={userFixture1} />);
    await screen.findByTestId('list-item-user-1');

    // ASSERT
    expect(screen.getByTestId('list-item-user-1')).toBeDefined();
    expect(screen.getByTestId('list-item-user-1-name')).toHaveTextContent(userFixture1.name);
    expect(screen.getByTestId('list-item-user-1-email')).toHaveTextContent(userFixture1.email);
  });
});

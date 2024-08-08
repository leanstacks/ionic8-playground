import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import { render, screen, waitFor } from 'test/test-utils';
import { userFixture1 } from '__fixtures__/users';

import UserDeleteAlert from '../UserDeleteAlert';

describe('UserDeleteAlert', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<UserDeleteAlert user={userFixture1} testid="test" />);
    await screen.findByTestId('test');

    // ASSERT
    expect(screen.getByTestId('test')).toBeDefined();
  });

  it('should call onSuccess handler', async () => {
    // ARRANGE
    const mockOnSuccess = vi.fn();
    render(<UserDeleteAlert onSuccess={mockOnSuccess} user={userFixture1} testid="test" />);
    await screen.findByTestId('test-button-delete');

    // ACT
    await userEvent.click(screen.getByTestId('test-button-delete'));

    // ASSERT
    expect(screen.getByTestId('test')).toBeDefined();
    expect(mockOnSuccess).toHaveBeenCalled();
  });

  it('should call onCancel handler', async () => {
    // ARRANGE
    const mockOnCancel = vi.fn();
    render(<UserDeleteAlert onCancel={mockOnCancel} user={userFixture1} testid="test" />);
    await screen.findByTestId('test-button-cancel');

    // ACT
    await userEvent.click(screen.getByTestId('test-button-cancel'));

    // ASSERT
    expect(screen.getByTestId('test')).toBeDefined();
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('should call isPending handler', async () => {
    // ARRANGE
    const mockIsPending = vi.fn();
    render(<UserDeleteAlert isPending={mockIsPending} user={userFixture1} testid="test" />);
    await screen.findByTestId('test-button-delete');

    // ACT
    await userEvent.click(screen.getByTestId('test-button-delete'));

    // ASSERT
    expect(screen.getByTestId('test')).toBeDefined();
    expect(mockIsPending).toHaveBeenCalled();
  });

  it('should call onError handler', async () => {
    // ARRANGE
    const notFoundUserId = 99;
    const mockOnError = vi.fn();
    render(
      <UserDeleteAlert
        onError={mockOnError}
        user={{ ...userFixture1, id: notFoundUserId }}
        testid="test"
      />,
    );
    await screen.findByTestId('test-button-delete');

    // ACT
    await userEvent.click(screen.getByTestId('test-button-delete'));

    // ASSERT
    expect(screen.getByTestId('test')).toBeDefined();
    await waitFor(() => expect(mockOnError).toHaveBeenCalled());
  });
});

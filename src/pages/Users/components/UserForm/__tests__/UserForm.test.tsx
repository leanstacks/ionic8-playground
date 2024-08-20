import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import { render, screen } from 'test/test-utils';
import { userFixture1 } from '__fixtures__/users';

import UserForm from '../UserForm';

describe('UserForm', () => {
  it('should render successfully', async () => {
    // ARRANGE
    const mockOnCancel = vi.fn();
    const mockOnSubmit = vi.fn();
    render(<UserForm user={userFixture1} onCancel={mockOnCancel} onSubmit={mockOnSubmit} />);
    await screen.findByTestId('form-user');

    // ASSERT
    expect(screen.getByTestId('form-user')).toBeDefined();
  });

  it('should submit form', async () => {
    // ARRANGE
    const mockOnCancel = vi.fn();
    const mockOnSubmit = vi.fn();
    render(<UserForm onCancel={mockOnCancel} onSubmit={mockOnSubmit} />);
    await screen.findByTestId('form-user');

    // ACT
    await userEvent.click(screen.getByTestId('form-user-field-name'));
    await userEvent.type(screen.getByLabelText('Name'), 'name');
    await userEvent.type(screen.getByLabelText('Username'), 'username');
    await userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('Phone'), '123-456-7890');
    await userEvent.type(screen.getByLabelText('Website'), 'https://test.com');
    await userEvent.click(screen.getByTestId('form-user-button-submit'));

    // ASSERT
    expect(screen.getByTestId('form-user')).toBeDefined();
    expect(mockOnSubmit).toHaveBeenCalled();
  });
});

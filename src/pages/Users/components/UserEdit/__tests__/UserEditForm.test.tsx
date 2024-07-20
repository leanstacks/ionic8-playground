import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';
import { userFixture1 } from '__fixtures__/users';

import UserEditForm from '../UserEditForm';
import userEvent from '@testing-library/user-event';

describe('UserEditForm', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<UserEditForm user={userFixture1} />);
    await screen.findByTestId('form-user-edit');

    // ASSERT
    expect(screen.getByTestId('form-user-edit')).toBeDefined();
  });

  it('should submit form', async () => {
    // ARRANGE
    render(<UserEditForm user={userFixture1} testid="form" />);
    await screen.findByTestId('form');

    // ACT
    await userEvent.click(screen.getByTestId('form-field-name'));
    await userEvent.clear(screen.getByLabelText('Name'));
    await userEvent.type(screen.getByLabelText('Name'), 'test name');
    await userEvent.click(screen.getByTestId('form-button-submit'));

    // ASSERT
    expect(screen.getByTestId('form')).toBeDefined();
  });
});

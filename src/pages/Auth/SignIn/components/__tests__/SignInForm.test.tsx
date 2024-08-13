import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import SignInForm from '../SignInForm';

describe('SignInForm', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<SignInForm />);
    await screen.findByTestId('form-signin');

    // ASSERT
    expect(screen.getByTestId('form-signin')).toBeDefined();
  });
});

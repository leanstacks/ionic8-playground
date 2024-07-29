import { describe, expect, it } from 'vitest';
import { render as renderWithoutWrapper } from '@testing-library/react';

import { screen } from 'test/test-utils';

import ToastProvider from '../ToastProvider';

describe('ToastProvider', () => {
  it('should render successfully', async () => {
    // ARRANGE
    renderWithoutWrapper(
      <ToastProvider>
        <div data-testid="provider-toast"></div>
      </ToastProvider>,
    );
    await screen.findByTestId('provider-toast');

    // ASSERT
    expect(screen.getByTestId('provider-toast')).toBeDefined();
  });
});

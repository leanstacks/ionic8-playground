import { describe, expect, it, vi } from 'vitest';

import { render, screen, waitFor } from 'test/test-utils';
import { toastFixture1 } from '__fixtures__/toasts';

import Toast from '../Toast';

describe('Toast', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<Toast toast={toastFixture1} />);
    await screen.findByTestId('toast');

    // ASSERT
    expect(screen.getByTestId('toast')).toBeDefined();
  });

  it('should auto dismiss', async () => {
    // ARRANGE
    const mockDismiss = vi.fn();
    render(<Toast toast={toastFixture1} dismiss={mockDismiss} />);
    await screen.findByTestId('toast');

    // ASSERT
    await waitFor(() => expect(mockDismiss).toHaveBeenCalled(), { timeout: 5000 });
  });
});

import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import DiagnosticsPage from '../DiagnosticsPage';

describe('DiagnosticsPage', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<DiagnosticsPage />);
    await screen.findByTestId('page-diagnostics');

    // ASSERT
    expect(screen.getByTestId('page-diagnostics')).toBeDefined();
  });
});

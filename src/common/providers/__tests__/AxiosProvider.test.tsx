import { describe, expect, it } from 'vitest';
import { render, screen } from 'test/test-utils';

import AxiosProvider from '../AxiosProvider';

describe('AxiosProvider', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <AxiosProvider>
        <div data-testid="provider-axios-ready"></div>
      </AxiosProvider>,
    );
    await screen.findByTestId('provider-axios-ready');

    // ASSERT
    expect(screen.getByTestId('provider-axios-ready')).toBeDefined();
  });
});

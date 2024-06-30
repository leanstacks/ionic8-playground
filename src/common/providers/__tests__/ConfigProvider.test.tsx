import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import ConfigContextProvider from 'providers/ConfigProvider';

describe('ConfigProvider', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <ConfigContextProvider>
        <div data-testid="provider-config"></div>
      </ConfigContextProvider>,
    );
    await screen.findByTestId('provider-config');

    // ASSERT
    expect(screen.getByTestId('provider-config')).toBeDefined();
  });
});

describe.skip('ConfigProvider error', () => {
  const originalEnv = process.env;

  beforeAll(() => {
    process.env = { NODE_ENV: 'test', PUBLIC_URL: 'localhost' };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should throw configuration validation error', () => {
    // ARRANGE
    function renderContextProvider() {
      render(
        <ConfigContextProvider>
          <div data-testid="provider-config"></div>
        </ConfigContextProvider>,
      );
    }

    // ASSERT
    expect(renderContextProvider).toThrow(/is a required field/);
  });
});

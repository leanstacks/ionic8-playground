import { describe, expect, it } from 'vitest';

import { render, screen, waitFor } from 'test/test-utils';

import ProgressProvider from '../ProgressProvider';
import userEvent from '@testing-library/user-event';

describe('ProgressProvider', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <ProgressProvider>
        <div data-testid="provider-progress-ready"></div>
      </ProgressProvider>,
    );
    await screen.findByTestId('provider-progress-ready');

    // ASSERT
    expect(screen.getByTestId('provider-progress-ready')).toBeDefined();
  });

  it('should set progress values', async () => {
    // ARRANGE
    render(
      <ProgressProvider>
        {({ progressBar, setProgress }) => (
          <div data-testid="provider-progress-ready">
            <div data-testid="value">{progressBar.value}</div>
            <button onClick={() => setProgress(true, { value: 0.75 })} data-testid="button">
              Button
            </button>
          </div>
        )}
      </ProgressProvider>,
    );
    await screen.findByTestId('provider-progress-ready');

    // ACT
    await userEvent.click(screen.getByTestId('button'));
    await waitFor(() => expect(screen.getByTestId('value')).toHaveTextContent('0.75'));

    // ASSERT
    expect(screen.getByTestId('provider-progress-ready')).toBeDefined();
  });

  it('should set active', async () => {
    // ARRANGE
    render(
      <ProgressProvider>
        {({ isActive, setIsActive }) => (
          <div data-testid="provider-progress-ready">
            <div data-testid="value">{new Boolean(isActive).toString()}</div>
            <button onClick={() => setIsActive(true)} data-testid="button">
              Button
            </button>
          </div>
        )}
      </ProgressProvider>,
    );
    await screen.findByTestId('provider-progress-ready');

    // ACT
    await userEvent.click(screen.getByTestId('button'));
    await waitFor(() => expect(screen.getByTestId('value')).toHaveTextContent('true'));

    // ASSERT
    expect(screen.getByTestId('provider-progress-ready')).toBeDefined();
  });

  it('should set progress bar values', async () => {
    // ARRANGE
    render(
      <ProgressProvider>
        {({ progressBar, setProgressBar }) => (
          <div data-testid="provider-progress-ready">
            <div data-testid="value">{progressBar.value}</div>
            <button onClick={() => setProgressBar({ value: 0.75 })} data-testid="button">
              Button
            </button>
          </div>
        )}
      </ProgressProvider>,
    );
    await screen.findByTestId('provider-progress-ready');

    // ACT
    await userEvent.click(screen.getByTestId('button'));
    await waitFor(() => expect(screen.getByTestId('value')).toHaveTextContent('0.75'));

    // ASSERT
    expect(screen.getByTestId('provider-progress-ready')).toBeDefined();
  });
});

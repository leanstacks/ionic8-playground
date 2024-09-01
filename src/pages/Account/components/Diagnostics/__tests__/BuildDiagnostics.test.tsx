import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import BuildDiagnostics from '../BuildDiagnostics';

describe('BuildDiagnostics', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<BuildDiagnostics />);
    await screen.findByTestId('diagnostics-build');

    // ASSERT
    expect(screen.getByTestId('diagnostics-build')).toBeDefined();
  });

  it('should display build values', async () => {
    // ARRANGE
    render(<BuildDiagnostics testid="build" />);
    await screen.findByTestId('build');

    // ASSERT
    expect(screen.getByTestId('build')).toBeDefined();
    expect(screen.getByTestId('build-env')).toHaveTextContent('test');
    expect(screen.getByTestId('build-time')).toHaveTextContent('1969-12-31 19:00:00 -05:00');
    expect(screen.getByTestId('build-sha')).toHaveTextContent('test');
    expect(screen.getByTestId('build-workflow')).toHaveTextContent('test 1.1');
  });
});

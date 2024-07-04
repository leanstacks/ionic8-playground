import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';
import WelcomeBlock from '../WelcomeBlock';

describe('WelcomeBlock', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<WelcomeBlock />);
    await screen.findByTestId('block-welcome');

    // ASSERT
    expect(screen.getByTestId('block-welcome')).toBeDefined();
  });
});

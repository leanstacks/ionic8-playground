import { describe, expect } from 'vitest';

import { render, screen } from 'test/test-utils';

import ButtonRow from '../ButtonRow';

describe('ButtonRow', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <ButtonRow>
        <div data-testid="children"></div>
      </ButtonRow>,
    );
    await screen.findByTestId('row-button');

    // ASSERT
    expect(screen.getByTestId('row-button')).toBeDefined();
    expect(screen.getByTestId('children')).toBeDefined();
  });
});

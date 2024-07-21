import { describe, expect, it } from 'vitest';

import { render, screen, waitFor } from 'test/test-utils';
import { userFixture1 } from '__fixtures__/users';

import ContactInfo from '../ContactInfo';

describe('ContactInfo', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<ContactInfo user={userFixture1} />);
    await screen.findByTestId('contact-info');

    // ASSERT
    expect(screen.getByTestId('contact-info')).toBeDefined();
  });

  it('should render loading state', async () => {
    // ARRANGE
    render(<ContactInfo isLoading={true} />);
    await screen.findByTestId('contact-info-loader');

    // ASSERT
    expect(screen.getByTestId('contact-info-loader')).toBeDefined();
  });

  it('should render empty state', async () => {
    // ARRANGE
    const { container } = render(<ContactInfo />);
    await waitFor(() => expect(container).toBeDefined());

    // ASSERT
    expect(screen.queryByTestId('contact-info')).toBeNull();
  });
});

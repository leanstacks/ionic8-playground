import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';
import imageFixture from 'assets/logo_ls.png';

import Avatar from '../Avatar';

describe('Avatar', () => {
  const valueFixture = 'John Smith';

  it('should render successfully', async () => {
    // ARRANGE
    render(<Avatar value={valueFixture} />);
    await screen.findByTestId('avatar');

    // ASSERT
    expect(screen.getByTestId('avatar')).toBeDefined();
  });

  it('should render initial', async () => {
    // ARRANGE
    render(<Avatar value={valueFixture} />);
    await screen.findByTestId('avatar');

    // ASSERT
    expect(screen.getByTestId('avatar-initial')).toBeDefined();
  });

  it('should render default when value empty', async () => {
    // ARRANGE
    const defaultInitial = '?';
    render(<Avatar value={' '} />);
    await screen.findByTestId('avatar');

    // ASSERT
    expect(screen.getByTestId('avatar-initial')).toBeDefined();
    expect(screen.getByTestId('avatar-initial')).toHaveTextContent(defaultInitial);
  });

  it('should render image', async () => {
    // ARRANGE
    render(<Avatar value={valueFixture} src={imageFixture} />);
    await screen.findByTestId('avatar');

    // ASSERT
    expect(screen.getByTestId('avatar-image')).toBeDefined();
  });
});

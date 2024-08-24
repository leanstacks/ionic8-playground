import { beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { UseMutationResult } from '@tanstack/react-query';

import { render, screen } from 'test/test-utils';
import { User } from 'common/models/user';
import * as UseUpdateProfile from 'pages/Account/api/useUpdateProfile';
import { userFixture1 } from '__fixtures__/users';

import ProfileForm from '../ProfileForm';

const mockGoBack = vi.fn();
vi.mock('@ionic/react', async () => {
  const original = await vi.importActual('@ionic/react');
  return {
    ...original,
    useIonRouter: () => ({
      goBack: mockGoBack,
    }),
  };
});

describe('ProfileForm', async () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should render successfully', async () => {
    // ARRANGE
    render(<ProfileForm user={userFixture1} />);
    await screen.findByTestId('form-profile');

    // ASSERT
    expect(screen.getByTestId('form-profile')).toBeDefined();
  });

  it('should submit form', async () => {
    // ARRANGE
    const mockUpdateProfile = vi.fn();
    const useUpdateProfileSpy = vi.spyOn(UseUpdateProfile, 'useUpdateProfile');
    useUpdateProfileSpy.mockReturnValueOnce({
      mutate: mockUpdateProfile,
    } as unknown as UseMutationResult<User, Error, UseUpdateProfile.UpdateProfileVariables>);
    render(<ProfileForm user={userFixture1} testid="form" />);
    await screen.findByTestId('form-field-name');

    // ACT
    await userEvent.click(screen.getByTestId('form-field-name'));
    await userEvent.clear(screen.getByLabelText('Name'));
    await userEvent.type(screen.getByLabelText('Name'), 'Valid Name');
    await userEvent.clear(screen.getByLabelText('Username'));
    await userEvent.type(screen.getByLabelText('Username'), 'ValidUsername');
    await userEvent.clear(screen.getByLabelText('Email'));
    await userEvent.type(screen.getByLabelText('Email'), 'valid@email.com');
    await userEvent.clear(screen.getByLabelText('Phone'));
    await userEvent.type(screen.getByLabelText('Phone'), '123-456-7890');
    await userEvent.clear(screen.getByLabelText('Website'));
    await userEvent.type(screen.getByLabelText('Website'), 'http://valid.example.com');
    await userEvent.click(screen.getByTestId('form-button-submit'));

    // ASSERT
    expect(screen.getByTestId('form')).toBeDefined();
    expect(mockUpdateProfile).toHaveBeenCalled();
  });

  it('should perform cancel', async () => {
    // ARRANGE
    render(<ProfileForm user={userFixture1} testid="form" />);
    await screen.findByTestId('form');

    // ACT
    await userEvent.click(screen.getByTestId('form-button-cancel'));

    // ASSERT
    expect(screen.getByTestId('form')).toBeDefined();
    expect(mockGoBack).toHaveBeenCalled();
  });
});

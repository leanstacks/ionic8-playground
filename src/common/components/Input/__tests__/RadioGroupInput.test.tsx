import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { IonRadio } from '@ionic/react';
import { Form, Formik } from 'formik';
import { object, string } from 'yup';

import { render, screen, waitFor } from 'test/test-utils';

import RadioGroupInput from '../RadioGroupInput';

describe('RadioGroupInput', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <Formik initialValues={{ testField: '' }} onSubmit={() => {}}>
        <Form>
          <RadioGroupInput name="testField" testid="input">
            <IonRadio value="one">One</IonRadio>
            <IonRadio value="two">Two</IonRadio>
          </RadioGroupInput>
        </Form>
      </Formik>,
    );
    await screen.findByTestId('input');

    // ASSERT
    expect(screen.getByTestId('input')).toBeDefined();
  });

  it('should should be selected', async () => {
    // ARRANGE
    render(
      <Formik initialValues={{ testField: 'one' }} onSubmit={() => {}}>
        <Form>
          <RadioGroupInput name="testField" testid="input">
            <IonRadio value="one">One</IonRadio>
            <IonRadio value="two">Two</IonRadio>
          </RadioGroupInput>
        </Form>
      </Formik>,
    );
    await screen.findAllByRole('radio');

    // ASSERT
    expect(screen.getByTestId('input')).toHaveAttribute('value', 'one');
    expect(screen.getByText(/One/i)).toHaveClass('radio-checked');
    expect(screen.getByText(/One/i)).toBeChecked();
    expect(screen.getByText(/Two/i)).not.toHaveClass('radio-checked');
    expect(screen.getByText(/Two/i)).not.toBeChecked();
  });

  it('should should change value', async () => {
    // ARRANGE
    const user = userEvent.setup();
    const mockOnChange = vi.fn();
    render(
      <Formik initialValues={{ testField: 'two' }} onSubmit={() => {}}>
        <Form>
          <RadioGroupInput name="testField" onIonChange={mockOnChange} testid="input">
            <IonRadio value="one">One</IonRadio>
            <IonRadio value="two">Two</IonRadio>
          </RadioGroupInput>
        </Form>
      </Formik>,
    );
    await screen.findAllByRole('radio');
    expect(screen.getByText(/One/i)).not.toHaveClass('radio-checked');

    // ACT
    await user.click(screen.getByText(/One/i));
    await waitFor(() => expect(screen.getByText(/One/i)).toHaveClass('radio-checked'));

    // ASSERT
    expect(screen.getByTestId('input')).toHaveAttribute('value', 'one');
    expect(screen.getByText(/One/i)).toHaveClass('radio-checked');
    expect(screen.getByText(/One/i)).toBeChecked();
    expect(screen.getByText(/Two/i)).not.toHaveClass('radio-checked');
    expect(screen.getByText(/Two/i)).not.toBeChecked();
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('should should display error', async () => {
    // ARRANGE
    const user = userEvent.setup();
    const validationSchema = object({
      testField: string().oneOf(['three'], 'invalid'),
    });
    render(
      <Formik
        initialValues={{ testField: '' }}
        onSubmit={() => {}}
        validationSchema={validationSchema}
      >
        {({ submitForm }) => (
          <Form>
            <RadioGroupInput onIonChange={() => submitForm()} name="testField" testid="input">
              <IonRadio value="one">One</IonRadio>
              <IonRadio value="two">Two</IonRadio>
            </RadioGroupInput>
          </Form>
        )}
      </Formik>,
    );
    await screen.findAllByRole('radio');

    // ACT
    await user.click(screen.getByText(/One/i));

    // ASSERT
    expect(screen.getByTestId('input-error')).toBeDefined();
    expect(screen.getByText(/invalid/i)).toBeDefined();
  });
});

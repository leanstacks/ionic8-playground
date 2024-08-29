import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Form, Formik } from 'formik';

import { render, screen } from 'test/test-utils';

import ToggleInput from '../ToggleInput';

describe('ToggleInput', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <Formik initialValues={{ testField: '' }} onSubmit={() => {}}>
        <Form>
          <ToggleInput name="test-field" />
        </Form>
      </Formik>,
    );
    await screen.findByTestId('input-toggle');

    // ASSERT
    expect(screen.getByTestId('input-toggle')).toBeDefined();
  });

  it('should change value', async () => {
    // ARRANGE
    let value = false;
    render(
      <Formik<{ testField: boolean }>
        initialValues={{ testField: value }}
        onSubmit={(values) => {
          value = values.testField;
        }}
      >
        {(formikProps) => (
          <Form>
            <ToggleInput name="testField" onIonChange={() => formikProps.submitForm()} />
          </Form>
        )}
      </Formik>,
    );
    await screen.findByTestId('input-toggle');

    // ACT
    await userEvent.click(screen.getByTestId('input-toggle'));

    // ASSERT
    expect(screen.getByTestId('input-toggle')).toBeDefined();
    expect(value).toBe(true);
  });
});

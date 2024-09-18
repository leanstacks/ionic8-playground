import { describe, expect, it } from 'vitest';
import { Form, Formik } from 'formik';

import { render, screen } from 'test/test-utils';

import CheckboxInput from '../CheckboxInput';

describe('CheckboxInput', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <Formik initialValues={{ checkboxField: false }} onSubmit={() => {}}>
        <Form>
          <CheckboxInput name="checkboxField" testid="input" />
        </Form>
      </Formik>,
    );
    await screen.findByTestId('input');

    // ASSERT
    expect(screen.getByTestId('input')).toBeDefined();
  });

  it('should not be checked', async () => {
    // ARRANGE
    render(
      <Formik initialValues={{ checkboxField: false }} onSubmit={() => {}}>
        <Form>
          <CheckboxInput name="checkboxField" testid="input" />
        </Form>
      </Formik>,
    );
    await screen.findByTestId('input');

    // ASSERT
    expect(screen.getByTestId('input')).toBeDefined();
    expect(screen.getByTestId('input')).toHaveAttribute('checked', 'false');
  });

  it('should be checked', async () => {
    // ARRANGE
    render(
      <Formik initialValues={{ checkboxField: true }} onSubmit={() => {}}>
        <Form>
          <CheckboxInput name="checkboxField" testid="input" />
        </Form>
      </Formik>,
    );
    await screen.findByTestId('input');

    // ASSERT
    expect(screen.getByTestId('input')).toBeDefined();
    expect(screen.getByTestId('input')).toHaveAttribute('checked', 'true');
  });
});

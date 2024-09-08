import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Form, Formik } from 'formik';

import { render, screen } from 'test/test-utils';

import Textarea from '../Textarea';

describe('Textarea', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <Formik initialValues={{ testField: '' }} onSubmit={() => {}}>
        <Form>
          <Textarea name="testField" />
        </Form>
      </Formik>,
    );
    await screen.findByTestId('textarea');

    // ASSERT
    expect(screen.getByTestId('textarea')).toBeDefined();
  });

  it('should change value when typing', async () => {
    // ARRANGE
    const value = 'hello';
    render(
      <Formik initialValues={{ testField: '' }} onSubmit={() => {}}>
        <Form>
          <Textarea name="testField" label="Field" />
        </Form>
      </Formik>,
    );
    await screen.findByLabelText('Field');

    // ACT
    await userEvent.type(screen.getByLabelText('Field'), value);

    // ASSERT
    expect(screen.getByTestId('textarea')).toBeDefined();
    expect(screen.getByTestId('textarea')).toHaveValue(value);
  });
});

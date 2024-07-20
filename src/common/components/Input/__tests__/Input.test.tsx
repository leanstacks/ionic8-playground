import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Form, Formik } from 'formik';

import { render, screen } from 'test/test-utils';

import Input from '../Input';

describe('Input', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <Formik initialValues={{ testField: '' }} onSubmit={() => {}}>
        <Form>
          <Input name="testField" />
        </Form>
      </Formik>,
    );
    await screen.findByTestId('input');

    // ASSERT
    expect(screen.getByTestId('input')).toBeDefined();
  });

  it('should change value when typing', async () => {
    // ARRANGE
    const value = 'hello';
    render(
      <Formik initialValues={{ testField: '' }} onSubmit={() => {}}>
        <Form>
          <Input name="testField" label="Test Field" />
        </Form>
      </Formik>,
    );
    await screen.findByTestId('input');

    // ACT
    await userEvent.type(screen.getByLabelText('Test Field'), value);

    // ASSERT
    expect(screen.getByTestId('input')).toBeDefined();
    expect(screen.getByTestId('input')).toHaveValue(value);
  });
});

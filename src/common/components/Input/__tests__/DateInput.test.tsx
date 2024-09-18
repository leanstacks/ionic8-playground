import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Form, Formik } from 'formik';

import { render, screen } from 'test/test-utils';

import DateInput from '../DateInput';

describe('DateInput', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <Formik initialValues={{ testField: '' }} onSubmit={() => {}}>
        <Form>
          <DateInput name="testField" testid="input" />
        </Form>
      </Formik>,
    );
    await screen.findByTestId('input');

    // ASSERT
    expect(screen.getByTestId('input')).toBeDefined();
  });

  it('should display initial value', async () => {
    // ARRANGE
    render(
      <Formik initialValues={{ testField: '2024-01-01' }} onSubmit={() => {}}>
        <Form>
          <DateInput name="testField" testid="input" />
        </Form>
      </Formik>,
    );
    await screen.findByTestId('input-button-calendar');

    // ACT
    await userEvent.click(screen.getByTestId('input-button-calendar'));

    // ASSERT
    expect(screen.getByTestId('input')).toBeDefined();
    expect(screen.getByTestId('input')).toHaveValue('Jan 1, 2024');
    expect(screen.getByTestId('input-datetime')).toBeDefined();
    expect(screen.getByTestId('input-datetime')).toHaveValue('2024-01-01T00:00');
  });
});

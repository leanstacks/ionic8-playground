import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Form, Formik } from 'formik';

import { render, screen } from 'test/test-utils';

import DatetimeInput from '../DatetimeInput';

describe('DatetimeInput', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <Formik initialValues={{ testField: '' }} onSubmit={() => {}}>
        <Form>
          <DatetimeInput name="testField" testid="input" />
        </Form>
      </Formik>,
    );
    await screen.findByTestId('input');

    // ASSERT
    expect(screen.getByTestId('input')).toBeDefined();
    expect(screen.getByTestId('input')).toHaveValue('');
  });

  it('should display initial value', async () => {
    // ARRANGE
    render(
      <Formik initialValues={{ testField: '2024-01-01T05:00:00Z' }} onSubmit={() => {}}>
        <Form>
          <DatetimeInput name="testField" testid="input" />
        </Form>
      </Formik>,
    );
    await screen.findByTestId('input-button-calendar');

    // ACT
    await userEvent.click(screen.getByTestId('input-button-calendar'));

    // ASSERT
    expect(screen.getByTestId('input')).toBeDefined();
    expect(screen.getByTestId('input')).toHaveValue('Jan 1, 2024 5:00 AM');
    expect(screen.getByTestId('input-datetime')).toBeDefined();
    expect(screen.getByTestId('input-datetime')).toHaveValue('2024-01-01T05:00');
  });
});

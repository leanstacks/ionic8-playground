import { describe, expect, it } from 'vitest';
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
});

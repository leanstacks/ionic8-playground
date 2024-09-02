import { describe, expect, it } from 'vitest';
import { Form, Formik } from 'formik';

import { render, screen } from 'test/test-utils';

import RangeInput from '../RangeInput';

describe('RangeInput', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <Formik initialValues={{ rangeField: 0 }} onSubmit={() => {}}>
        <Form>
          <RangeInput name="rangeField"></RangeInput>
        </Form>
      </Formik>,
    );
    await screen.findByTestId('input-range');

    // ASSERT
    expect(screen.getByTestId('input-range')).toBeDefined();
  });

  it.skip('should change value', async () => {
    // TODO implement test simulating user sliding range input
  });
});

import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Form, Formik } from 'formik';

import { render, screen } from 'test/test-utils';

import CheckboxInput from '../CheckboxInput';

describe('CheckboxInput', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <Formik initialValues={{ checkboxField: false }} onSubmit={() => {}}>
        <Form>
          <CheckboxInput name="checkboxField" testid="input">
            MyCheckbox
          </CheckboxInput>
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
          <CheckboxInput name="checkboxField" testid="input">
            MyCheckbox
          </CheckboxInput>
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
          <CheckboxInput name="checkboxField" testid="input">
            MyCheckbox
          </CheckboxInput>
        </Form>
      </Formik>,
    );
    await screen.findByTestId('input');

    // ASSERT
    expect(screen.getByTestId('input')).toBeDefined();
    expect(screen.getByTestId('input')).toHaveAttribute('checked', 'true');
  });

  it('should change boolean value', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(
      <Formik initialValues={{ checkboxField: false }} onSubmit={() => {}}>
        <Form>
          <CheckboxInput name="checkboxField" testid="input">
            MyCheckbox
          </CheckboxInput>
        </Form>
      </Formik>,
    );
    await screen.findByTestId('input');
    expect(screen.getByTestId('input')).toHaveAttribute('checked', 'false');

    // ACT
    await user.click(screen.getByText('MyCheckbox'));

    // ASSERT
    expect(screen.getByTestId('input')).toBeDefined();
    expect(screen.getByTestId('input')).toHaveAttribute('checked', 'true');
  });

  it('should change array value', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(
      <Formik initialValues={{ checkboxField: [] }} onSubmit={() => {}}>
        <Form>
          <CheckboxInput name="checkboxField" value="One" testid="one">
            CheckboxOne
          </CheckboxInput>
          <CheckboxInput name="checkboxField" value="Two" testid="two">
            CheckboxTwo
          </CheckboxInput>
        </Form>
      </Formik>,
    );
    await screen.findByTestId('one');
    expect(screen.getByTestId('one')).toHaveAttribute('checked', 'false');
    expect(screen.getByTestId('two')).toHaveAttribute('checked', 'false');

    // ACT
    await user.click(screen.getByText('CheckboxOne'));

    // ASSERT
    expect(screen.getByTestId('one')).toBeDefined();
    expect(screen.getByTestId('one')).toHaveAttribute('checked', 'true');
    expect(screen.getByTestId('two')).toHaveAttribute('checked', 'false');

    // ACT
    await user.click(screen.getByText('CheckboxOne'));

    // ASSERT
    expect(screen.getByTestId('one')).toHaveAttribute('checked', 'false');
    expect(screen.getByTestId('two')).toHaveAttribute('checked', 'false');
  });

  it.skip('should call onChange function', async () => {
    // ARRANGE
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <Formik initialValues={{ checkboxField: false }} onSubmit={() => {}}>
        <Form>
          <CheckboxInput name="checkboxField" onIonChange={onChange} testid="input">
            MyCheckbox
          </CheckboxInput>
        </Form>
      </Formik>,
    );
    await screen.findByText(/MyCheckbox/i);

    // ACT
    await user.click(screen.getByText(/MyCheckbox/i));

    // ASSERT
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('input')).toHaveAttribute('checked', 'true');
  });
});

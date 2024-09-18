import { describe, expect, it, vi } from 'vitest';
import { Form, Formik } from 'formik';

import { render, screen } from 'test/test-utils';

import CheckboxInput from '../CheckboxInput';
import userEvent from '@testing-library/user-event';

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

  it('should be change boolean value', async () => {
    // ARRANGE
    render(
      <Formik initialValues={{ checkboxField: false }} onSubmit={() => {}}>
        <Form>
          <CheckboxInput name="checkboxField" testid="input" />
        </Form>
      </Formik>,
    );
    await screen.findByTestId('input');
    expect(screen.getByTestId('input')).toHaveAttribute('checked', 'false');

    // ACT
    await userEvent.click(screen.getByTestId('input'));

    // ASSERT
    expect(screen.getByTestId('input')).toBeDefined();
    expect(screen.getByTestId('input')).toHaveAttribute('checked', 'true');
  });

  it('should be change array value', async () => {
    // ARRANGE
    render(
      <Formik initialValues={{ checkboxField: [] }} onSubmit={() => {}}>
        <Form>
          <CheckboxInput name="checkboxField" value="One" testid="one" />
          <CheckboxInput name="checkboxField" value="Two" testid="two" />
        </Form>
      </Formik>,
    );
    await screen.findByTestId('one');
    expect(screen.getByTestId('one')).toHaveAttribute('checked', 'false');
    expect(screen.getByTestId('two')).toHaveAttribute('checked', 'false');

    // ACT
    await userEvent.click(screen.getByTestId('one'));

    // ASSERT
    expect(screen.getByTestId('one')).toBeDefined();
    expect(screen.getByTestId('one')).toHaveAttribute('checked', 'true');
    expect(screen.getByTestId('two')).toHaveAttribute('checked', 'false');

    // ACT
    await userEvent.click(screen.getByTestId('one'));
    expect(screen.getByTestId('one')).toHaveAttribute('checked', 'false');
    expect(screen.getByTestId('two')).toHaveAttribute('checked', 'false');
  });

  it('should call onChange function', async () => {
    // ARRANGE
    const mockChangeFn = vi.fn();

    render(
      <Formik initialValues={{ checkboxField: false }} onSubmit={() => {}}>
        <Form>
          <CheckboxInput name="checkboxField" onIonChange={mockChangeFn} testid="input" />
        </Form>
      </Formik>,
    );
    await screen.findByTestId('input');

    // ACT
    await userEvent.click(screen.getByTestId('input'));

    // ASSERT
    expect(mockChangeFn).toHaveBeenCalled();
  });
});

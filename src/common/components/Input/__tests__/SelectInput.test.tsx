import { describe, expect, it } from 'vitest';
import { IonSelectOption } from '@ionic/react';
import { Form, Formik } from 'formik';
import userEvent from '@testing-library/user-event';

import { render, screen, waitFor } from 'test/test-utils';

import SelectInput from '../SelectInput';

describe('SelectInput', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <Formik initialValues={{ selectInput: '' }} onSubmit={() => {}}>
        <Form>
          <SelectInput name="selectInput" testid="input">
            <IonSelectOption value="a">Able</IonSelectOption>
          </SelectInput>
        </Form>
      </Formik>,
    );
    await screen.findByTestId('input');

    // ASSERT
    expect(screen.getByTestId('input')).toBeDefined();
  });

  it('should change value', async () => {
    // ARRANGE
    const value = 'a';
    let submittedValue = '';
    render(
      <Formik
        initialValues={{ selectInput: value }}
        onSubmit={(values) => {
          submittedValue = values.selectInput;
        }}
      >
        {(formikProps) => (
          <Form>
            <SelectInput
              name="selectInput"
              interface="popover"
              testid="input"
              onIonChange={() => formikProps.submitForm()}
            >
              <IonSelectOption value="a">Alpha</IonSelectOption>
              <IonSelectOption value="b">Bravo</IonSelectOption>
            </SelectInput>
          </Form>
        )}
      </Formik>,
    );
    await screen.findByTestId('input');

    // ACT
    // open the select
    await userEvent.click(screen.getByTestId('input'));
    await waitFor(() => expect(screen.getAllByRole('radio').length).toBe(2));
    // select the second option
    await userEvent.click(screen.getAllByRole('radio')[1]);
    await waitFor(() => expect(submittedValue).toBe('b'));

    // ASSERT
    expect(screen.getByTestId('input')).toBeDefined();
    expect(submittedValue).toBe('b');
  });
});

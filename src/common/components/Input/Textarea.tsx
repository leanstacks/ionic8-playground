import { IonTextarea, TextareaCustomEvent } from '@ionic/react';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import classNames from 'classnames';

import { PropsWithTestId } from '../types';
import { useField } from 'formik';

/**
 * Properties for the `Textarea` component.
 * @see {@link PropsWithTestId}
 * @see {@link IonTextarea}
 */
interface TextareaProps
  extends PropsWithTestId,
    Omit<ComponentPropsWithoutRef<typeof IonTextarea>, 'name'>,
    Required<Pick<ComponentPropsWithoutRef<typeof IonTextarea>, 'name'>> {}

/**
 * The `Textarea` component renders a standardized `IonTextarea` which is
 * integrated with Formik.
 *
 * Optionally accepts a forwarded `ref` which allows the parent to manipulate
 * the textarea, performing actions programmatically such as giving focus.
 *
 * @param {TextareaProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const Textarea = forwardRef<HTMLIonTextareaElement, TextareaProps>(
  ({ className, testid = 'textarea', ...textareaProps }: TextareaProps, ref): JSX.Element => {
    const [field, meta, helpers] = useField(textareaProps.name);

    return (
      <IonTextarea
        className={classNames(
          'ls-textarea',
          className,
          { 'ion-touched': meta.touched },
          { 'ion-invalid': meta.error },
          { 'ion-valid': meta.touched && !meta.error },
        )}
        onIonInput={async (e: TextareaCustomEvent) => {
          await helpers.setValue(e.detail.value);
        }}
        data-testid={testid}
        {...field}
        {...textareaProps}
        errorText={meta.error}
        ref={ref}
      ></IonTextarea>
    );
  },
);
Textarea.displayName = 'Textarea';

export default Textarea;
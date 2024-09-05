import { useEffect, useRef } from 'react';
import { IonButton } from '@ionic/react';
import { Form, Formik, FormikHelpers } from 'formik';
import { object, string } from 'yup';
import classNames from 'classnames';

import './UserForm.scss';
import { BaseComponentProps } from 'common/components/types';
import { User } from 'common/models/user';
import Input from 'common/components/Input/Input';

/**
 * User form values.
 * @see {@link User}
 */
type UserFormValues = Pick<User, 'email' | 'name' | 'phone' | 'username' | 'website'>;

/**
 * Properties for the `UserForm` component.
 * @param {User} [user] - Optional. User to initialize the form.
 * @see {@link BaseComponentProps}
 */
interface UserFormProps extends BaseComponentProps {
  onCancel: () => void;
  onSubmit: (values: UserFormValues, helpers: FormikHelpers<UserFormValues>) => void;
  user?: User;
}

/**
 * User form validation schema.
 */
const validationSchema = object<UserFormValues>({
  name: string().required('Required. '),
  username: string()
    .required('Required. ')
    .min(8, 'Must be at least 8 characters. ')
    .max(30, 'Must be at most 30 characters. '),
  email: string().required('Required. ').email('Must be an email address. '),
  phone: string().required('Required. '),
  website: string().url('Must be a URL. '),
});

/**
 * The `UserForm` component renders a Formik form for creating or editing
 * a `User`.
 * @param {UserFormProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const UserForm = ({
  className,
  onCancel,
  onSubmit,
  user,
  testid = 'form-user',
}: UserFormProps): JSX.Element => {
  const focusInput = useRef<HTMLIonInputElement>(null);

  useEffect(() => {
    focusInput.current?.setFocus();
  }, []);

  return (
    <div className={classNames('form-user', className)} data-testid={testid}>
      <Formik<UserFormValues>
        enableReinitialize={true}
        initialValues={{
          email: user?.email ?? '',
          name: user?.name ?? '',
          phone: user?.phone ?? '',
          username: user?.username ?? '',
          website: user?.website ?? '',
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ dirty, isSubmitting }) => (
          <Form data-testid={`${testid}-form`}>
            <Input
              name="name"
              label="Name"
              labelPlacement="stacked"
              disabled={isSubmitting}
              required
              ref={focusInput}
              data-testid={`${testid}-field-name`}
            ></Input>
            <Input
              name="username"
              label="Username"
              labelPlacement="stacked"
              disabled={isSubmitting}
              minlength={8}
              maxlength={30}
              data-testid={`${testid}-field-username`}
            ></Input>
            <Input
              name="email"
              type="email"
              label="Email"
              labelPlacement="stacked"
              disabled={isSubmitting}
              required
              data-testid={`${testid}-field-email`}
            ></Input>
            <Input
              name="phone"
              label="Phone"
              labelPlacement="stacked"
              disabled={isSubmitting}
              required
              data-testid={`${testid}-field-phone`}
            ></Input>
            <Input
              name="website"
              label="Website"
              labelPlacement="stacked"
              disabled={isSubmitting}
              data-testid={`${testid}-field-website`}
            ></Input>

            <div className="buttons">
              <IonButton
                type="button"
                color="secondary"
                fill="clear"
                disabled={isSubmitting}
                onClick={onCancel}
                data-testid={`${testid}-button-cancel`}
              >
                Cancel
              </IonButton>
              <IonButton
                type="submit"
                color="primary"
                disabled={isSubmitting || !dirty}
                data-testid={`${testid}-button-submit`}
              >
                Save
              </IonButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserForm;

import { useState } from 'react';
import { IonButton, IonIcon, IonRow, useIonRouter } from '@ionic/react';
import { person } from 'ionicons/icons';
import { Form, Formik } from 'formik';
import { object, string } from 'yup';
import classNames from 'classnames';

import './UserEditForm.scss';
import { BaseComponentProps } from 'common/components/types';
import { User } from 'common/models/user';
import Input from 'common/components/Input/Input';
import { useUpdateUser } from 'pages/Users/api/useUpdateUser';

/**
 * Properties for the `UserEditForm` component.
 * @see {@link BaseComponentProps}
 */
interface UserEditFormProps extends BaseComponentProps {
  user: User;
}

/**
 * User edit form values.
 * @param {User} user - A `User` object.
 */
interface UserEditFormValues {
  user: User;
}

/**
 * User edit form validation schema.
 */
const validationSchema = object<UserEditFormValues>({
  user: object({
    name: string().required('Required. '),
    username: string()
      .required('Required. ')
      .min(8, 'Must be at least 8 characters. ')
      .max(30, 'Must be at most 30 characters. '),
    email: string().required('Required. ').email('Must be an email address. '),
    phone: string().required('Required. '),
    website: string().url('Must be a URL. '),
  }),
});

/**
 * The `UserEditForm` component renders a Formik form for editing a `User`.
 * @param {UserEditFormProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const UserEditForm = ({
  className,
  user,
  testid = 'form-user-edit',
}: UserEditFormProps): JSX.Element => {
  const router = useIonRouter();
  const [error, setError] = useState<string>('');
  const { mutate: updateUser } = useUpdateUser();

  const onCancel = () => {
    router.goBack();
  };

  return (
    <div className={classNames('form-user-edit', className)} data-testid={testid}>
      {error && <div>{error}</div>}
      <Formik<UserEditFormValues>
        enableReinitialize={true}
        initialValues={{ user: user }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(`UserEditForm::onSubmit::${JSON.stringify(values)}`);
          setError('');
          updateUser(
            { user: { ...user, ...values.user } },
            {
              onSuccess: () => {
                setSubmitting(false);
                router.push(`/tabs/users/${user.id}`);
              },
              onError(error) {
                setError(error.message);
                setSubmitting(false);
              },
            },
          );
        }}
        validationSchema={validationSchema}
      >
        {({ dirty, isSubmitting }) => (
          <Form data-testid={`${testid}-form`}>
            <section>
              <IonRow className="section-heading">
                <IonIcon icon={person} />
                <div>Contact Info</div>
              </IonRow>
              <Input
                name="user.name"
                label="Name"
                labelPlacement="stacked"
                disabled={isSubmitting}
                required
                autoFocus
                data-testid={`${testid}-field-name`}
              ></Input>
              <Input
                name="user.username"
                label="Username"
                labelPlacement="stacked"
                disabled={isSubmitting}
                minlength={8}
                maxlength={30}
                data-testid={`${testid}-field-username`}
              ></Input>
              <Input
                name="user.email"
                type="email"
                label="Email"
                labelPlacement="stacked"
                disabled={isSubmitting}
                required
                data-testid={`${testid}-field-email`}
              ></Input>
              <Input
                name="user.phone"
                label="Phone"
                labelPlacement="stacked"
                disabled={isSubmitting}
                required
                data-testid={`${testid}-field-phone`}
              ></Input>
              <Input
                name="user.website"
                label="Website"
                labelPlacement="stacked"
                disabled={isSubmitting}
                data-testid={`${testid}-field-website`}
              ></Input>
            </section>

            <div className="buttons">
              <IonButton
                type="button"
                color="secondary"
                fill="clear"
                disabled={isSubmitting}
                onClick={onCancel}
              >
                Cancel
              </IonButton>
              <IonButton type="submit" color="primary" disabled={isSubmitting || !dirty}>
                Save
              </IonButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserEditForm;

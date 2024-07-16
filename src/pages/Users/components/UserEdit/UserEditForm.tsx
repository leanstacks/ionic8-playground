import { useState } from 'react';
import { object, string } from 'yup';
import classNames from 'classnames';
import { IonButton, useIonRouter } from '@ionic/react';
import { Form, Formik } from 'formik';

import './UserEditForm.scss';
import { BaseComponentProps } from 'common/components/types';
import { User } from 'common/models/user';
import Input from 'common/components/Input/Input';
import { useUpdateUser } from 'pages/Users/api/useUpdateUser';

interface UserEditFormProps extends BaseComponentProps {
  user: User;
}

/**
 * User edit form values.
 */
interface UserEditFormValues {
  name: string;
}

/**
 * User edit form validation schema.
 */
const validationSchema = object<UserEditFormValues>({
  name: string().required('Required. '),
});

const UserEditForm = ({
  className,
  user,
  testid = 'form-user-edit',
}: UserEditFormProps): JSX.Element => {
  const router = useIonRouter();
  const [error, setError] = useState<string>('');
  const { mutate: updateUser } = useUpdateUser();

  return (
    <div className={classNames('form-user-edit', className)} data-testid={testid}>
      {error && <div>{error}</div>}
      <Formik<UserEditFormValues>
        enableReinitialize={true}
        initialValues={{ name: user.name }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(`UserEditForm::onSubmit::${JSON.stringify(values)}`);
          setError('');
          updateUser(
            { user: { ...user, ...values } },
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
            <Input
              type="text"
              name="name"
              label="Name"
              disabled={isSubmitting}
              data-testid={`${testid}-field-name`}
            ></Input>
            <IonButton type="submit" color="primary" disabled={isSubmitting || !dirty}>
              Save
            </IonButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserEditForm;

import { IonButton, useIonRouter } from '@ionic/react';
import { useState } from 'react';
import classNames from 'classnames';
import { Form, Formik } from 'formik';
import { object, string } from 'yup';

import './SignInForm.scss';
import { BaseComponentProps } from 'common/components/types';
import { useSignIn } from '../api/useSignIn';
import { useProgress } from 'common/hooks/useProgress';
import Input from 'common/components/Input/Input';
import CardRow from 'common/components/Card/CardRow';
import ErrorCard from 'common/components/Card/ErrorCard';

/**
 * Properties for the `SignInForm` component.
 */
interface SignInFormProps extends BaseComponentProps {}

/**
 * Sign in form values.
 * @param {string} username - A username.
 * @param {string} password - A password.
 */
interface SignInFormValues {
  username: string;
  password: string;
}

/**
 * Sign in form validation schema.
 */
const validationSchema = object<SignInFormValues>({
  username: string().required('Required. '),
  password: string().required('Required. '),
});

/**
 * The `SignInForm` component renders a Formik form for user authentication.
 * @param {SignInFormProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const SignInForm = ({ className, testid = 'form-signin' }: SignInFormProps): JSX.Element => {
  const [error, setError] = useState<string>('');
  const { setIsActive: setShowProgress } = useProgress();
  const router = useIonRouter();
  const { mutate: signIn } = useSignIn();

  return (
    <div className={classNames('form-signin', className)} data-testid={testid}>
      {error && (
        <CardRow className="row-message" testid={`${testid}-error`}>
          <ErrorCard content={`We were unable verify your credentials. Please try again.`} />
        </CardRow>
      )}

      <Formik<SignInFormValues>
        enableReinitialize={true}
        initialValues={{ username: '', password: '' }}
        onSubmit={(values, { setSubmitting }) => {
          setError('');
          setShowProgress(true);
          signIn(values.username, {
            onSuccess: () => {
              router.push('/tabs', 'forward', 'replace');
            },
            onError: (err: Error) => {
              setError(err.message);
            },
            onSettled: () => {
              setShowProgress(false);
              setSubmitting(false);
            },
          });
        }}
        validationSchema={validationSchema}
      >
        {({ dirty, isSubmitting }) => (
          <Form data-testid={`${testid}-form`}>
            <div className="heading">Sign In</div>
            <Input
              name="username"
              label="Username"
              labelPlacement="stacked"
              disabled={isSubmitting}
              maxlength={30}
              autoFocus
              autocomplete="off"
              data-testid={`${testid}-field-username`}
            />
            <Input
              type="password"
              name="password"
              label="Password"
              labelPlacement="stacked"
              disabled={isSubmitting}
              maxlength={30}
              autoFocus
              autocomplete="off"
              data-testid={`${testid}-field-password`}
            />

            <IonButton
              type="submit"
              color="primary"
              expand="block"
              disabled={isSubmitting || !dirty}
              data-testid={`${testid}-button-submit`}
            >
              Sign In
            </IonButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignInForm;

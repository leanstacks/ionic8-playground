import {
  IonButton,
  IonContent,
  IonInputPasswordToggle,
  IonPopover,
  useIonRouter,
  useIonViewDidEnter,
} from '@ionic/react';
import { useRef, useState } from 'react';
import classNames from 'classnames';
import { Form, Formik } from 'formik';
import { object, string } from 'yup';

import './SignInForm.scss';
import { BaseComponentProps } from 'common/components/types';
import { useSignIn } from '../api/useSignIn';
import { useProgress } from 'common/hooks/useProgress';
import Input from 'common/components/Input/Input';
import ErrorCard from 'common/components/Card/ErrorCard';
import Icon, { IconName } from 'common/components/Icon/Icon';
import HeaderRow from 'common/components/Text/HeaderRow';

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
  const focusInput = useRef<HTMLIonInputElement>(null);
  const [error, setError] = useState<string>('');
  const { setIsActive: setShowProgress } = useProgress();
  const router = useIonRouter();
  const { mutate: signIn } = useSignIn();

  useIonViewDidEnter(() => {
    focusInput.current?.setFocus();
  });

  return (
    <div className={classNames('form-signin', className)} data-testid={testid}>
      {error && (
        <ErrorCard
          content={`We were unable verify your credentials. Please try again. ${error}`}
          className="ion-margin-bottom"
          testid={`${testid}-error`}
        />
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
            <HeaderRow border>
              <div>Sign In</div>
              <Icon id="signinInfo" icon={IconName.CircleInfo} color="secondary" />
            </HeaderRow>

            <Input
              name="username"
              label="Username"
              labelPlacement="stacked"
              disabled={isSubmitting}
              maxlength={30}
              autocomplete="off"
              ref={focusInput}
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
            >
              <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
            </Input>

            <IonButton
              type="submit"
              color="primary"
              className="button-submit"
              expand="block"
              disabled={isSubmitting || !dirty}
              data-testid={`${testid}-button-submit`}
            >
              Sign In
            </IonButton>

            <IonPopover trigger="signinInfo" triggerAction="hover" className="form-signin-popover">
              <IonContent class="ion-padding">
                <p>
                  This example application uses{' '}
                  <a
                    href="https://jsonplaceholder.typicode.com/users"
                    target="_blank"
                    rel="noreferrer"
                  >
                    JSONPlaceholder data
                  </a>
                  . Try a username like <span className="inline-code">Bret</span> or{' '}
                  <span className="inline-code">Samantha</span>.
                </p>
                <p>You may use any value as the password.</p>
              </IonContent>
            </IonPopover>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignInForm;

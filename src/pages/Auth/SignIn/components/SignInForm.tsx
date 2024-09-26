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
import { boolean, object, string } from 'yup';

import './SignInForm.scss';
import { BaseComponentProps } from 'common/components/types';
import { RememberMe } from 'common/models/auth';
import storage from 'common/utils/storage';
import { StorageKey } from 'common/utils/constants';
import { useSignIn } from '../api/useSignIn';
import { useProgress } from 'common/hooks/useProgress';
import Input from 'common/components/Input/Input';
import ErrorCard from 'common/components/Card/ErrorCard';
import Icon, { IconName } from 'common/components/Icon/Icon';
import HeaderRow from 'common/components/Text/HeaderRow';
import CheckboxInput from 'common/components/Input/CheckboxInput';

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
  rememberMe: boolean;
}

/**
 * Sign in form validation schema.
 */
const validationSchema = object<SignInFormValues>({
  username: string().required('Required. '),
  password: string().required('Required. '),
  rememberMe: boolean().default(false),
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

  // remember me details
  const rememberMe = storage.getJsonItem<RememberMe>(StorageKey.RememberMe);

  useIonViewDidEnter(() => {
    focusInput.current?.setFocus();
  });

  return (
    <div className={classNames('ls-signin-form', className)} data-testid={testid}>
      {error && (
        <ErrorCard
          content={`We were unable verify your credentials. Please try again. ${error}`}
          className="ion-margin-bottom"
          testid={`${testid}-error`}
        />
      )}

      <Formik<SignInFormValues>
        enableReinitialize={true}
        initialValues={{
          username: rememberMe?.username ?? '',
          password: '',
          rememberMe: !!rememberMe,
        }}
        onSubmit={(values, { setSubmitting }) => {
          setError('');
          setShowProgress(true);
          signIn(values.username, {
            onSuccess: () => {
              if (values.rememberMe) {
                storage.setJsonItem<RememberMe>(StorageKey.RememberMe, {
                  username: values.username,
                });
              } else {
                storage.removeItem(StorageKey.RememberMe);
              }
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
              maxlength={30}
              autocomplete="off"
              data-testid={`${testid}-field-password`}
            >
              <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
            </Input>

            <CheckboxInput name="rememberMe" testid={`${testid}-field-rememberme`}>
              Remember me
            </CheckboxInput>

            <IonButton
              type="submit"
              color="primary"
              className="ls-signin-form-button-submit"
              expand="block"
              disabled={isSubmitting || !dirty}
              data-testid={`${testid}-button-submit`}
            >
              Sign In
            </IonButton>

            <IonPopover
              trigger="signinInfo"
              triggerAction="hover"
              className="ls-signin-form-popover"
            >
              <IonContent className="ion-padding">
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

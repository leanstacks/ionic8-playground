import { IonButton, useIonRouter, useIonViewDidEnter } from '@ionic/react';
import { useRef, useState } from 'react';
import { Form, Formik } from 'formik';
import { object, string } from 'yup';
import classNames from 'classnames';

import './ProfileForm.scss';
import { BaseComponentProps } from 'common/components/types';
import { User } from 'common/models/user';
import { useProgress } from 'common/hooks/useProgress';
import { useUpdateProfile } from 'pages/Account/api/useUpdateProfile';
import { useToasts } from 'common/hooks/useToasts';
import { DismissButton } from 'common/components/Toast/Toast';
import ErrorCard from 'common/components/Card/ErrorCard';
import Input from 'common/components/Input/Input';
import ButtonRow from 'common/components/Button/ButtonRow';

/**
 * Profile form values.
 * @see {@link User}
 */
type ProfileFormValues = Pick<User, 'email' | 'name' | 'phone' | 'username' | 'website'>;

/**
 * Properties for the `ProfileForm` component.
 * @param {User} user - User to initialize the form.
 * @see {@link BaseComponentProps}
 */
interface ProfileFormProps extends BaseComponentProps {
  user: User;
}

/**
 * Profile form validation schema.
 */
const validationSchema = object<ProfileFormValues>({
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
 * The `ProfileForm` component renders a Formik form to edit a user profile.
 * @param {ProfileFormProps} props - Component propeties.
 * @returns {JSX.Element} JSX
 */
const ProfileForm = ({
  className,
  testid = 'form-profile',
  user,
}: ProfileFormProps): JSX.Element => {
  const focusInput = useRef<HTMLIonInputElement>(null);
  const [error, setError] = useState<string>('');
  const { mutate: updateProfile } = useUpdateProfile();
  const router = useIonRouter();
  const { setProgress } = useProgress();
  const { createToast } = useToasts();

  useIonViewDidEnter(() => {
    focusInput.current?.setFocus();
  });

  const onCancel = () => {
    router.goBack();
  };

  return (
    <div className={classNames('form-profile', className)} data-testid={testid}>
      {error && (
        <ErrorCard
          content={`We are experiencing problems processing your request. ${error}`}
          className="ion-margin-bottom"
          testid={`${testid}-error`}
        />
      )}

      <Formik<ProfileFormValues>
        enableReinitialize={true}
        initialValues={{
          email: user.email,
          name: user.name,
          phone: user.phone,
          username: user.username,
          website: user.website,
        }}
        onSubmit={(values, { setSubmitting }) => {
          setProgress(true);
          setError('');
          updateProfile(
            { profile: values },
            {
              onSuccess: () => {
                createToast({
                  message: 'Updated profile',
                  duration: 5000,
                  buttons: [DismissButton],
                });
                router.goBack();
              },
              onError: (err) => {
                setError(err.message);
              },
              onSettled: () => {
                setProgress(false);
                setSubmitting(false);
              },
            },
          );
        }}
        validationSchema={validationSchema}
      >
        {({ dirty, isSubmitting }) => (
          <Form>
            <Input
              name="name"
              label="Name"
              labelPlacement="stacked"
              disabled={isSubmitting}
              autocomplete="off"
              ref={focusInput}
              data-testid={`${testid}-field-name`}
            />
            <Input
              name="username"
              label="Username"
              labelPlacement="stacked"
              disabled={isSubmitting}
              autocomplete="off"
              minlength={8}
              maxlength={30}
              data-testid={`${testid}-field-username`}
            />
            <Input
              name="email"
              type="email"
              label="Email"
              labelPlacement="stacked"
              disabled={isSubmitting}
              autocomplete="off"
              data-testid={`${testid}-field-email`}
            />
            <Input
              name="phone"
              label="Phone"
              labelPlacement="stacked"
              disabled={isSubmitting}
              autocomplete="off"
              data-testid={`${testid}-field-phone`}
            />
            <Input
              name="website"
              label="Website"
              labelPlacement="stacked"
              disabled={isSubmitting}
              autocomplete="off"
              data-testid={`${testid}-field-website`}
            />

            <ButtonRow className="ion-margin-top" expand="block">
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
            </ButtonRow>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileForm;

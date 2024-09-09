import { IonButton, useIonRouter, useIonViewDidEnter } from '@ionic/react';
import { useRef, useState } from 'react';
import { Form, Formik } from 'formik';
import { object, string } from 'yup';
import classNames from 'classnames';

import './ProfileForm.scss';
import { BaseComponentProps } from 'common/components/types';
import { Profile } from 'common/models/profile';
import { useProgress } from 'common/hooks/useProgress';
import { useUpdateProfile } from 'pages/Account/api/useUpdateProfile';
import { useToasts } from 'common/hooks/useToasts';
import { DismissButton } from 'common/components/Toast/Toast';
import ErrorCard from 'common/components/Card/ErrorCard';
import Input from 'common/components/Input/Input';
import ButtonRow from 'common/components/Button/ButtonRow';
import Textarea from 'common/components/Input/Textarea';

/**
 * Profile form values.
 * @see {@link User}
 */
type ProfileFormValues = Profile;

/**
 * Properties for the `ProfileForm` component.
 * @param {User} user - User to initialize the form.
 * @see {@link BaseComponentProps}
 */
interface ProfileFormProps extends BaseComponentProps {
  profile: Profile;
}

/**
 * Profile form validation schema.
 */
const validationSchema = object<ProfileFormValues>({
  name: string().required('Required. '),
  email: string().required('Required. ').email('Must be an email address. '),
  bio: string().max(500, 'Must be 500 characters or less. '),
});

/**
 * The `ProfileForm` component renders a Formik form to edit a user profile.
 * @param {ProfileFormProps} props - Component propeties.
 * @returns {JSX.Element} JSX
 */
const ProfileForm = ({
  className,
  testid = 'form-profile',
  profile,
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
          email: profile.email,
          name: profile.name,
          bio: profile.bio,
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
              name="email"
              type="email"
              label="Email"
              labelPlacement="stacked"
              disabled={isSubmitting}
              autocomplete="off"
              data-testid={`${testid}-field-email`}
            />
            <Textarea
              name="bio"
              label="Bio"
              labelPlacement="stacked"
              autoGrow
              counter
              maxlength={500}
              disabled={isSubmitting}
              data-testid={`${testid}-field-bio`}
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

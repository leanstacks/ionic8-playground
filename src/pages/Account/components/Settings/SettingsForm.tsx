import { IonItem, IonLabel, IonListHeader } from '@ionic/react';
import classNames from 'classnames';
import { Form, Formik } from 'formik';
import { boolean, number, object } from 'yup';

import { useGetSettings } from 'common/api/useGetSettings';
import { BaseComponentProps } from 'common/components/types';
import { Settings } from 'common/models/settings';
import { useUpdateSettings } from 'common/api/useUpdateSettings';
import { useProgress } from 'common/hooks/useProgress';
import { useToasts } from 'common/hooks/useToasts';
import { DismissButton } from 'common/components/Toast/Toast';
import ToggleInput from 'common/components/Input/ToggleInput';
import LoaderSkeleton from 'common/components/Loader/LoaderSkeleton';
import List from 'common/components/List/List';
import RangeInput from 'common/components/Input/RangeInput';
import Icon, { IconName } from 'common/components/Icon/Icon';

/**
 * Settings form values.
 * @see {@link Settings}
 */
type SettingsFormValues = Pick<Settings, 'allowNotifications' | 'brightness'>;

/**
 * Settings form validation schema.
 */
const validationSchema = object<SettingsFormValues>({
  allowNotifications: boolean(),
  brightness: number().min(0).max(100),
});

/**
 * The `SettingsForm` component renders a Formik form to edit user settings.
 * @param {BaseComponentProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const SettingsForm = ({
  className,
  testid = 'form-settings',
}: BaseComponentProps): JSX.Element | false => {
  const { data: settings, isLoading } = useGetSettings();
  const { mutate: updateSettings } = useUpdateSettings();
  const { setProgress } = useProgress();
  const { createToast } = useToasts();

  if (isLoading) {
    return (
      <div className={classNames('form-settings', className)} data-testid={`${testid}-loading`}>
        <List>
          <IonListHeader>
            <IonLabel>Settings</IonLabel>
          </IonListHeader>

          <IonItem>
            <LoaderSkeleton animated heightStyle="1.5rem" />
          </IonItem>
          <IonItem>
            <LoaderSkeleton animated heightStyle="1.5rem" />
          </IonItem>
        </List>
      </div>
    );
  }

  if (settings) {
    return (
      <Formik<SettingsFormValues>
        enableReinitialize={true}
        initialValues={{
          allowNotifications: settings.allowNotifications,
          brightness: settings.brightness,
        }}
        onSubmit={(values, { setSubmitting }) => {
          setProgress(true);
          updateSettings(
            { settings: values },
            {
              onSuccess: () => {
                createToast({
                  message: 'Settings updated.',
                  duration: 3000,
                  buttons: [DismissButton],
                });
              },
              onError: () => {
                createToast({
                  message: 'Unable to update settings.',
                  buttons: [DismissButton],
                  color: 'danger',
                });
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
        {({ isSubmitting, submitForm }) => (
          <Form data-testid={testid} className={classNames('form-settings', className)}>
            <List>
              <IonListHeader>
                <IonLabel>Settings</IonLabel>
              </IonListHeader>

              <IonItem className="text-sm font-medium">
                <ToggleInput
                  name="allowNotifications"
                  disabled={isSubmitting}
                  onIonChange={() => submitForm()}
                  testid={`${testid}-field-allowNotifications`}
                >
                  Notifications
                </ToggleInput>
              </IonItem>

              <IonItem className="text-sm font-medium">
                <RangeInput
                  name="brightness"
                  label="Brightness"
                  labelPlacement="start"
                  disabled={isSubmitting}
                  onIonChange={() => submitForm()}
                  testid={`${testid}-field-brightness`}
                >
                  <Icon icon={IconName.Minus} slot="start" />
                  <Icon icon={IconName.Plus} slot="end" />
                </RangeInput>
              </IonItem>
            </List>
          </Form>
        )}
      </Formik>
    );
  } else {
    return false;
  }
};

export default SettingsForm;

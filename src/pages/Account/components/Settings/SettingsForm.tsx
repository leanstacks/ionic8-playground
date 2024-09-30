import { IonItem, IonLabel, IonListHeader, IonRadio, IonSelectOption } from '@ionic/react';
import classNames from 'classnames';
import { Form, Formik } from 'formik';
import { boolean, number, object, string } from 'yup';
import orderBy from 'lodash/orderBy';
import map from 'lodash/map';

import './SettingsForm.scss';
import { BaseComponentProps } from 'common/components/types';
import { LANGUAGES } from 'common/utils/constants';
import { Settings } from 'common/models/settings';
import { useGetSettings } from 'common/api/useGetSettings';
import { useUpdateSettings } from 'common/api/useUpdateSettings';
import { useProgress } from 'common/hooks/useProgress';
import { useToasts } from 'common/hooks/useToasts';
import { DismissButton } from 'common/components/Toast/Toast';
import ToggleInput from 'common/components/Input/ToggleInput';
import LoaderSkeleton from 'common/components/Loader/LoaderSkeleton';
import List from 'common/components/List/List';
import RangeInput from 'common/components/Input/RangeInput';
import Icon, { IconName } from 'common/components/Icon/Icon';
import SelectInput from 'common/components/Input/SelectInput';
import RadioGroupInput from 'common/components/Input/RadioGroupInput';

/**
 * Settings form values.
 * @see {@link Settings}
 */
type SettingsFormValues = Pick<
  Settings,
  'allowNotifications' | 'brightness' | 'fontSize' | 'language'
>;

/**
 * Settings form validation schema.
 */
const validationSchema = object<SettingsFormValues>({
  allowNotifications: boolean(),
  brightness: number().min(0).max(100),
  fontSize: string()
    .required('Required. ')
    .oneOf(['smaller', 'default', 'larger'], 'Font size must be one of: ${values} '),
  language: string().oneOf(map(LANGUAGES, 'code')),
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
      <div className={classNames('ls-settings-form', className)} data-testid={`${testid}-loading`}>
        <List>
          <IonListHeader>
            <IonLabel>Settings</IonLabel>
          </IonListHeader>

          <IonItem>
            <LoaderSkeleton animated heightStyle="1.25rem" />
          </IonItem>
          <IonItem>
            <LoaderSkeleton animated heightStyle="1.25rem" />
          </IonItem>
          <IonItem>
            <LoaderSkeleton animated heightStyle="1.25rem" />
          </IonItem>
          <IonItem lines="none">
            <LoaderSkeleton animated heightStyle="1.25rem" />
          </IonItem>
          <IonItem>
            <div style={{ width: '100%' }}>
              <LoaderSkeleton animated heightStyle="1rem" className="ion-margin-bottom" />
              <LoaderSkeleton animated heightStyle="1.25rem" className="ion-margin-bottom" />
              <LoaderSkeleton animated heightStyle="1.5rem" className="ion-margin-bottom" />
            </div>
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
          fontSize: settings.fontSize,
          language: settings.language,
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
          <Form data-testid={testid} className={classNames('ls-settings-form', className)}>
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

              <IonItem className="text-sm font-medium">
                <SelectInput
                  name="language"
                  label="Language"
                  interface="popover"
                  disabled={isSubmitting}
                  onIonChange={() => submitForm()}
                  testid={`${testid}-field-language`}
                >
                  {orderBy(LANGUAGES, ['value']).map((language) => (
                    <IonSelectOption key={language.code} value={language.code}>
                      {language.value}
                    </IonSelectOption>
                  ))}
                </SelectInput>
              </IonItem>

              <IonItem lines="none" className="text-sm font-medium">
                <IonLabel>Font Size</IonLabel>
              </IonItem>

              <IonItem>
                <RadioGroupInput
                  name="fontSize"
                  onIonChange={() => submitForm()}
                  testid={`${testid}-field-fontSize`}
                >
                  <IonRadio
                    className="ls-settings-form__input-fontsize-radio text-xs"
                    disabled={isSubmitting}
                    value="smaller"
                  >
                    Smaller
                  </IonRadio>
                  <IonRadio
                    className="ls-settings-form__input-fontsize-radio"
                    disabled={isSubmitting}
                    value="default"
                  >
                    Default
                  </IonRadio>
                  <IonRadio
                    className="ls-settings-form__input-fontsize-radio text-xl"
                    disabled={isSubmitting}
                    value="larger"
                  >
                    Larger
                  </IonRadio>
                </RadioGroupInput>
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

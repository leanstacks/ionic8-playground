import { ComponentPropsWithoutRef, useState } from 'react';
import { DatetimeCustomEvent, IonButton, IonDatetime, IonInput, IonModal } from '@ionic/react';
import { useField } from 'formik';
import classNames from 'classnames';

import './DatetimeInput.scss';
import { PropsWithTestId } from '../types';
import Input from './Input';
import Icon, { IconName } from '../Icon/Icon';
import dayjs from 'dayjs';

const DEFAULT_FORMAT_DATE: Intl.DateTimeFormatOptions = {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
};

type DatetimeValue = string | string[] | null;

interface DatetimeInputProps
  extends PropsWithTestId,
    Pick<ComponentPropsWithoutRef<typeof Input>, 'label' | 'labelPlacement'>,
    Omit<ComponentPropsWithoutRef<typeof IonDatetime>, 'name'>,
    Required<Pick<ComponentPropsWithoutRef<typeof IonDatetime>, 'name'>> {}

const DatetimeInput = ({
  className,
  label,
  labelPlacement,
  testid = 'input-datetime',
  ...datetimeProps
}: DatetimeInputProps): JSX.Element => {
  const [field, meta, helpers] = useField(datetimeProps.name);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [internalValue, setInternalValue] = useState<DatetimeValue | undefined>(field.value);

  const errorText: string | undefined = meta.touched ? meta.error : undefined;

  console.log(`meta::${JSON.stringify(meta)}`);

  const onChange = async (e: DatetimeCustomEvent) => {
    console.log(`DatetimeInput::onChange::value::${e.detail.value}`);
    helpers.setTouched(true);
    const value = e.detail.value;
    if (value) {
      if (Array.isArray(value)) {
        setInternalValue(value.map((val) => dayjs(val).toISOString()));
      } else {
        setInternalValue(dayjs(value).toISOString());
      }
    } else {
      setInternalValue(undefined);
    }
  };

  const onDidDismiss = async () => {
    console.log(`DatetimeInput::onDidDismiss::value::${internalValue}`);
    await helpers.setValue(internalValue);
    setIsOpen(false);
  };

  const formatDate = (dateStr: DatetimeValue): string => {
    if (dateStr) {
      if (Array.isArray(dateStr)) {
        // TODO format array of values
        return 'array';
      } else {
        return new Intl.DateTimeFormat(undefined, DEFAULT_FORMAT_DATE).format(new Date(dateStr));
      }
    }
    return '';
  };

  const getLocalDatetime = (value: DatetimeValue | undefined): DatetimeValue => {
    if (value) {
      if (Array.isArray(value)) {
        // TODO format array value
        return '';
      } else {
        return dayjs(value).format('YYYY-MM-DD[T]HH:mm');
      }
    } else {
      return null;
    }
  };

  return (
    <IonInput
      name="placeholder"
      className={classNames(
        'ls-datetime-input',
        className,
        { 'ion-touched': meta.touched },
        { 'ion-invalid': meta.error },
        { 'ion-valid': meta.touched && !meta.error },
      )}
      data-testid={testid}
      label={label}
      labelPlacement={labelPlacement}
      value={formatDate(field.value)}
      onFocus={() => setIsOpen(true)}
      errorText={errorText}
      readonly
    >
      <IonButton
        aria-hidden="true"
        fill="clear"
        onClick={() => setIsOpen(true)}
        slot="end"
        data-testid={`${testid}-button-calendar`}
      >
        <Icon icon={IconName.Calendar} />
      </IonButton>

      <IonModal
        className="ls-datetime-modal"
        isOpen={isOpen}
        onIonModalDidDismiss={onDidDismiss}
        data-testid={`${testid}-modal`}
      >
        <IonDatetime
          onIonChange={onChange}
          {...datetimeProps}
          value={getLocalDatetime(internalValue)}
          data-testid={`${testid}-datetime`}
        ></IonDatetime>
      </IonModal>
    </IonInput>
  );
};

export default DatetimeInput;
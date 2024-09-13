import { ComponentPropsWithoutRef, useMemo, useState } from 'react';
import { DatetimeCustomEvent, IonButton, IonDatetime, IonInput, IonModal } from '@ionic/react';
import { useField } from 'formik';
import classNames from 'classnames';
import dayjs from 'dayjs';

import './DatetimeInput.scss';
import { PropsWithTestId } from '../types';
import Input from './Input';
import Icon, { IconName } from '../Icon/Icon';

const DEFAULT_FORMAT_DATE: Intl.DateTimeFormatOptions = {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
};

const DEFAULT_FORMAT_TIME: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: '2-digit',
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

  console.log(`DatetimeInput::field::meta::${JSON.stringify(meta)}`);

  const onChange = async (e: DatetimeCustomEvent) => {
    console.log(`DatetimeInput::onChange::value::${e.detail.value}`);
    const value = e.detail.value;
    if (value) {
      if (Array.isArray(value)) {
        setInternalValue(value.map((val) => dayjs(val).toISOString()));
        await helpers.setValue(
          value.map((val) => dayjs(val).toISOString()),
          true,
        );
      } else {
        setInternalValue(dayjs(value).toISOString());
        await helpers.setValue(dayjs(value).toISOString(), true);
      }
    } else {
      setInternalValue(undefined);
      await helpers.setValue(undefined, true);
    }
  };

  const onDidDismiss = async () => {
    console.log(`DatetimeInput::onDidDismiss::value::${internalValue}`);
    await helpers.setTouched(true, true);
    setIsOpen(false);
  };

  const getLocalDatetime = (value: DatetimeValue | undefined): DatetimeValue => {
    if (value) {
      if (Array.isArray(value)) {
        return value.map((val) => dayjs(val).format('YYYY-MM-DD[T]HH:mm'));
      } else {
        return dayjs(value).format('YYYY-MM-DD[T]HH:mm');
      }
    } else {
      return null;
    }
  };

  const formattedValue = useMemo(() => {
    if (field.value) {
      const dateOptions: Intl.DateTimeFormatOptions =
        datetimeProps.formatOptions?.date ?? DEFAULT_FORMAT_DATE;
      const timeOptions: Intl.DateTimeFormatOptions =
        datetimeProps.formatOptions?.time ?? DEFAULT_FORMAT_TIME;

      switch (datetimeProps.presentation) {
        case 'date': {
          return `${new Intl.DateTimeFormat(undefined, dateOptions).format(new Date(field.value))}`;
        }
        case 'month': {
          const options: Intl.DateTimeFormatOptions = {
            month: datetimeProps.formatOptions?.date?.month ?? 'long',
          };
          return `${new Intl.DateTimeFormat(undefined, options).format(new Date(field.value))}`;
        }
        case 'month-year': {
          const options: Intl.DateTimeFormatOptions = {
            month: datetimeProps.formatOptions?.date?.month ?? 'long',
            year: datetimeProps.formatOptions?.date?.year ?? 'numeric',
          };
          return `${new Intl.DateTimeFormat(undefined, options).format(new Date(field.value))}`;
        }
        case 'time': {
          return `${new Intl.DateTimeFormat(undefined, timeOptions).format(new Date(field.value))}`;
        }
        case 'time-date': {
          return `${new Intl.DateTimeFormat(undefined, timeOptions).format(
            new Date(field.value),
          )} ${new Intl.DateTimeFormat(undefined, dateOptions).format(new Date(field.value))}`;
        }
        case 'year': {
          const options: Intl.DateTimeFormatOptions = {
            year: datetimeProps.formatOptions?.date?.year ?? 'numeric',
          };
          return `${new Intl.DateTimeFormat(undefined, options).format(new Date(field.value))}`;
        }
        case 'date-time':
        default: {
          return `${new Intl.DateTimeFormat(undefined, dateOptions).format(
            new Date(field.value),
          )} ${new Intl.DateTimeFormat(undefined, timeOptions).format(new Date(field.value))}`;
        }
      }
    } else {
      return '';
    }
  }, [datetimeProps.presentation, datetimeProps.formatOptions, field.value]);
  console.log(`formattedValue::${formattedValue}`);

  return (
    <IonInput
      className={classNames(
        'ls-datetime-input',
        className,
        { 'ion-touched': meta.touched },
        { 'ion-invalid': meta.error },
        { 'ion-valid': meta.touched && !meta.error },
      )}
      data-testid={testid}
      disabled={datetimeProps.disabled}
      errorText={errorText}
      label={label}
      labelPlacement={labelPlacement}
      onFocus={() => setIsOpen(true)}
      readonly
      value={formattedValue}
    >
      <IonButton
        aria-hidden="true"
        data-testid={`${testid}-button-calendar`}
        disabled={datetimeProps.disabled}
        fill="clear"
        onClick={() => setIsOpen(true)}
        slot="end"
      >
        <Icon icon={IconName.Calendar} />
      </IonButton>

      <IonModal
        className="ls-datetime-modal"
        data-testid={`${testid}-modal`}
        isOpen={isOpen}
        onIonModalDidDismiss={onDidDismiss}
      >
        <IonDatetime
          {...datetimeProps}
          data-testid={`${testid}-datetime`}
          onIonChange={onChange}
          value={getLocalDatetime(internalValue)}
        ></IonDatetime>
      </IonModal>
    </IonInput>
  );
};

export default DatetimeInput;

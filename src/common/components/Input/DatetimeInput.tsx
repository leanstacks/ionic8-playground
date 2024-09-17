import { ComponentPropsWithoutRef, useMemo, useState } from 'react';
import { ModalCustomEvent } from '@ionic/core';
import { DatetimeCustomEvent, IonButton, IonDatetime, IonInput, IonModal } from '@ionic/react';
import { useField } from 'formik';
import classNames from 'classnames';
import dayjs from 'dayjs';

import './DatetimeInput.scss';
import { PropsWithTestId } from '../types';
import Icon, { IconName } from '../Icon/Icon';

/**
 * Default `IonDatetime` `formatOptions` for the date. May be overridden by
 * supplying a `formatOptions` property. Controls how the date is displayed
 * in the form input.
 * @see {@link IonDatetime}
 */
const DEFAULT_FORMAT_DATE: Intl.DateTimeFormatOptions = {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
};

/**
 * Default `IonDatetime` `formatOptions` for the time. May be overridden by
 * supplying a `formatOptions` property. Controls how the time is displayed
 * in the form input.
 * @see {@link IonDatetime}
 */
const DEFAULT_FORMAT_TIME: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: '2-digit',
};

/**
 * `DatetimeValue` describes the possible types of an `IonDatetime` whose `presentation`
 * is 'date-time'.
 */
export type DatetimeValue = string | null;

/**
 * Properties for the `DatetimeInput` component.
 * @see {@link PropsWithTestId}
 * @see {@link IonDatetime}
 * @see {@link IonInput}
 * @see {@link IonModal}
 */
interface DatetimeInputProps
  extends PropsWithTestId,
    Pick<ComponentPropsWithoutRef<typeof IonInput>, 'label' | 'labelPlacement'>,
    Pick<ComponentPropsWithoutRef<typeof IonModal>, 'onIonModalDidDismiss'>,
    Omit<ComponentPropsWithoutRef<typeof IonDatetime>, 'multiple' | 'name' | 'presentation'>,
    Required<Pick<ComponentPropsWithoutRef<typeof IonDatetime>, 'name'>> {}

const DatetimeInput = ({
  className,
  label,
  labelPlacement,
  onIonModalDidDismiss,
  testid = 'input-datetime',
  ...datetimeProps
}: DatetimeInputProps): JSX.Element => {
  const [field, meta, helpers] = useField(datetimeProps.name);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [internalValue, setInternalValue] = useState<DatetimeValue | undefined>(field.value);

  // populate error text only if the field has been touched and has an error
  const errorText: string | undefined = meta.touched ? meta.error : undefined;

  /**
   * Handle change events emitted by `IonDatetime`.
   * @param {DatetimeCustomEvent} e - The event.
   */
  const onChange = async (e: DatetimeCustomEvent): Promise<void> => {
    const value = e.detail.value as DatetimeValue;
    if (value) {
      const isoDate = dayjs(value).toISOString();
      setInternalValue(isoDate);
      await helpers.setValue(isoDate, true);
    } else {
      setInternalValue(undefined);
      await helpers.setValue(undefined, true);
    }
    datetimeProps.onIonChange?.(e);
  };

  /**
   * Handle 'did dismiss' events emitted by `IonModal`.
   */
  const onDidDismiss = async (e: ModalCustomEvent): Promise<void> => {
    await helpers.setTouched(true, true);
    setIsOpen(false);
    onIonModalDidDismiss?.(e);
  };

  const toLocalDate = (value?: DatetimeValue): string | undefined => {
    if (value) {
      const localDate = dayjs(value).format('YYYY-MM-DD[T]HH:mm');
      return localDate;
    } else {
      return undefined;
    }
  };

  // format the value to display in the IonInput
  const formattedValue = useMemo(() => {
    if (field.value) {
      const date = new Intl.DateTimeFormat(
        undefined,
        datetimeProps.formatOptions?.date ?? DEFAULT_FORMAT_DATE,
      ).format(new Date(field.value));
      const time = new Intl.DateTimeFormat(
        undefined,
        datetimeProps.formatOptions?.time ?? DEFAULT_FORMAT_TIME,
      ).format(new Date(field.value));

      return `${date} ${time}`;
    } else {
      return '';
    }
  }, [datetimeProps.formatOptions, field.value]);

  return (
    <>
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
      </IonInput>

      <IonModal
        className="ls-datetime-modal"
        data-testid={`${testid}-modal`}
        isOpen={isOpen}
        onIonModalDidDismiss={onDidDismiss}
      >
        <IonDatetime
          {...datetimeProps}
          data-testid={`${testid}-datetime`}
          multiple={false}
          onIonChange={onChange}
          presentation="date-time"
          value={toLocalDate(internalValue)}
        ></IonDatetime>
      </IonModal>
    </>
  );
};

export default DatetimeInput;

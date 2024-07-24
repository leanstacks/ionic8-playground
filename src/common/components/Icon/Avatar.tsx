import { IonAvatar } from '@ionic/react';
import classNames from 'classnames';

import classes from './Avatar.module.scss';
import { BaseComponentProps } from '../types';

/**
 * Properties for the `Avatar` component.
 * @param {string} [src] - Optional. An image source.
 * @param {string} value - Generated Avatar value.
 * @see {@link BaseComponentProps}
 * @see {@link IonAvatar}
 */
interface AvatarProps extends BaseComponentProps {
  src?: string;
  value: string;
}

/**
 * List of possible colors for generated Avatars.
 */
const COLORS = [
  classes.primary,
  classes.secondary,
  classes.tertiary,
  classes.success,
  classes.warning,
  classes.danger,
];

/**
 * The `Avatar` component renders an icon which uniquely represents a person or
 * think (e.g. team, group, company, etc.).
 *
 * When `src` is supplied, an `<img />` will be rendered.
 *
 * When `src` is empty, the `value` attribute is used to generate an Avatar using
 * first character of the `value`.
 * @param {AvatarProps} props - Component properties.
 * @returns JSX
 */
const Avatar = ({ className, src, testid = 'avatar', value }: AvatarProps): JSX.Element => {
  const trimmedValue = value.trim();
  const initial = trimmedValue ? trimmedValue.charAt(0) : '?';

  const colorClass = COLORS[trimmedValue.length % COLORS.length];

  return (
    <IonAvatar
      className={classNames(classes.avatar, className)}
      data-testid={testid}
      title={trimmedValue}
    >
      {src ? (
        <img className={classes.image} src={src} alt={value} data-testid={`${testid}-image`} />
      ) : (
        <div className={classNames(classes.initial, colorClass)} data-testid={`${testid}-initial`}>
          {initial}
        </div>
      )}
    </IonAvatar>
  );
};

export default Avatar;

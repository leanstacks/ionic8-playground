import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
} from '@ionic/react';
import { ReactNode } from 'react';
import classNames from 'classnames';

import classes from './MessageCard.module.scss';
import { BaseComponentProps } from '../types';

/**
 * Properties for the `MessageCard` component.
 * @param {ReactNode} [content] - Optional. Card content.
 * @param {ReactNode} [subtitle] - Optional. Card subtitle.
 * @param {ReactNode} [title] - Optional. Card title.
 * @see {@link BaseComponentProps}
 * @see {@link HTMLIonCardElement}
 * @see {@link HTMLIonIconElement}
 */
export interface MessageCardProps
  extends BaseComponentProps,
    Pick<HTMLIonCardElement, 'color'>,
    Pick<HTMLIonIconElement, 'icon'> {
  content?: ReactNode;
  subtitle?: ReactNode;
  title?: ReactNode;
}

/**
 * The `MessageCard` component displays an `IonCard` which displays an
 * informational message. The card consists of several optional elements
 * to make it flexible. A title line with optional icon.  A subtitle.
 * And the card content.
 * @param {MessageCardProps} props - Component properties.
 * @returns JSX
 */
const MessageCard = ({
  className,
  color,
  content,
  icon,
  subtitle,
  testid = 'card-message',
  title,
}: MessageCardProps): JSX.Element => {
  return (
    <IonCard
      className={classNames(classes.card_message, className)}
      data-testid={testid}
      color={color}
    >
      {title && (
        <IonCardHeader className={classes.header}>
          <IonCardTitle className={classes.title_block}>
            {icon && (
              <IonIcon
                icon={icon}
                className={classes.icon}
                data-testid={`${testid}-icon`}
              ></IonIcon>
            )}
            <div className={classes.title} data-testid={`${testid}-title`}>
              {title}
            </div>
          </IonCardTitle>
          {subtitle && (
            <IonCardSubtitle className={classes.subtitle} data-testid={`${testid}-subtitle`}>
              {subtitle}
            </IonCardSubtitle>
          )}
        </IonCardHeader>
      )}

      {content && (
        <IonCardContent className={classes.content} data-testid={`${testid}-content`}>
          {content}
        </IonCardContent>
      )}
    </IonCard>
  );
};

export default MessageCard;

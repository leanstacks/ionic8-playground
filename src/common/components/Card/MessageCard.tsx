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

import './MessageCard.scss';
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
  const hasHeader = title || subtitle;

  return (
    <IonCard className={classNames('card-message', className)} data-testid={testid} color={color}>
      {title && (
        <IonCardHeader className="header">
          <IonCardTitle className="title-block">
            {icon && (
              <IonIcon icon={icon} className="icon" data-testid={`${testid}-icon`}></IonIcon>
            )}
            <div className="title" data-testid={`${testid}-title`}>
              {title}
            </div>
          </IonCardTitle>
          {subtitle && (
            <IonCardSubtitle className="subtitle" data-testid={`${testid}-subtitle`}>
              {subtitle}
            </IonCardSubtitle>
          )}
        </IonCardHeader>
      )}

      {content && (
        <IonCardContent className="content" data-testid={`${testid}-content`}>
          {content}
        </IonCardContent>
      )}
    </IonCard>
  );
};

export default MessageCard;

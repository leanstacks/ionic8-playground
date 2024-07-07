import { warning } from 'ionicons/icons';

import MessageCard, { MessageCardProps } from './MessageCard';

/**
 * Properties for the `ErrorCard` component.
 * @see {@link MessageCardProps}
 */
interface ErrorCardProps extends MessageCardProps {}

/**
 * The `ErrorCard` component renders a `MessageCard` displaying information
 * describing an exceptional event which has occurred.
 * @param {ErrorCardProps} props - Component properties.
 * @returns JSX
 */
const ErrorCard = ({
  color = 'danger',
  icon = warning,
  testid = 'card-error',
  title = 'Uh oh',
  ...cardProps
}: ErrorCardProps): JSX.Element => {
  return <MessageCard color={color} icon={icon} testid={testid} title={title} {...cardProps} />;
};

export default ErrorCard;
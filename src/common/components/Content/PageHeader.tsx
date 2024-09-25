import classNames from 'classnames';

import './PageHeader.scss';
import HeaderRow, { HeaderRowProps } from '../Text/HeaderRow';

/**
 * Properties for the `PageHeader` component.
 * @see {@link HeaderRowProps}
 */
interface PageHeaderProps extends HeaderRowProps {}

/**
 * The `PageHeader` component displays a block intended for the top of a page.
 * The block displays the page title and an optional collection of buttons.
 *
 * When provided, the buttons will be rendered at the far right of the page
 * header.
 *
 * Example:
 * ```
 * <PageHeader border inset className="ion-hide-md-down">
 *   <Avatar value={user.name} />
 *   <IonText data-testid={`${testid}-title`}>{user.name}</IonText>
 * </PageHeader>
 * ```
 *
 * @param {PageHeaderProps} props - Component properties.
 * @returns {JSX.Element} Returns JSX.
 */
const PageHeader = ({
  className,
  testid = 'page-header',
  ...props
}: PageHeaderProps): JSX.Element => {
  return (
    <HeaderRow
      className={classNames('ls-page-header', className)}
      data-testid={testid}
      {...props}
    />
  );
};

export default PageHeader;

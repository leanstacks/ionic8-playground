import classNames from 'classnames';

import './PageHeader.scss';
import HeaderRow, { HeaderProps } from '../Text/HeaderRow';

/**
 * Properties for the `PageHeader` component.
 * @param {ReactNode} title - A title.
 * @param {ReactNode} [buttons] - One or more buttons.
 * @see {@link BaseComponentProps}
 */
interface PageHeaderProps extends HeaderProps {}

/**
 * The `PageHeader` component displays a block intended for the top of a page.
 * The block displays the page title and an optional collection of buttons.
 *
 * When provided, the buttons will be rendered at the far right of the page
 * header.
 *
 * Example:
 * ```
 * <PageHeader
 *   title="Users"
 *   buttons={
 *     <>
 *       <IonButton>
 *         <Icon icon={IconName.Users} />
 *       </IonButton>
 *     </>
 *   }
 * />
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
    <HeaderRow className={classNames('page-header', className)} data-testid={testid} {...props} />
  );
};

export default PageHeader;

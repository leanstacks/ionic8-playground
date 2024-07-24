import { ReactNode } from 'react';
import { IonButtons, IonRow } from '@ionic/react';
import classNames from 'classnames';

import { BaseComponentProps } from '../types';
import classes from './PageHeader.module.scss';

/**
 * Properties for the `PageHeader` component.
 * @param {ReactNode} title - A title.
 * @param {ReactNode} [buttons] - One or more buttons.
 * @see {@link BaseComponentProps}
 */
interface PageHeaderProps extends BaseComponentProps {
  title: ReactNode;
  buttons?: ReactNode;
}

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
 *         <IonIcon slot="icon-only" icon={add} />
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
  buttons,
  className,
  testid = 'page-header',
  title,
}: PageHeaderProps): JSX.Element => {
  return (
    <IonRow className={classNames(classes.page_header, className)} data-testid={testid}>
      <div className={classes.title} data-testid={`${testid}-title`}>
        {title}
      </div>
      {buttons && <IonButtons>{buttons}</IonButtons>}
    </IonRow>
  );
};

export default PageHeader;

import { IonIcon } from '@ionic/react';
import classNames from 'classnames';
import { business } from 'ionicons/icons';

import classes from './CompanyDetail.module.scss';
import { BaseComponentProps } from 'common/components/types';
import { Company } from 'common/models/user';
import LoaderSkeleton from 'common/components/Loader/LoaderSkeleton';

/**
 * Properties for the `CompanyDetail` component.
 * @param {Company} [company] - A `Company` object.
 * @param {boolean} [isLoading] - Indicates if the `user` is being loaded.
 * @see {@link BaseComponentProps}
 */
interface CompanyDetailProps extends BaseComponentProps {
  company?: Company;
  isLoading?: boolean;
}

/**
 * The `CompanyDetail` component renders a block which provides details about
 * a single `Company`.
 *
 * If `isLoading` is `true` the loading state is rendered.
 *
 * If `isLoading` is `false` and the `company` property is provided, the
 * company attributes are rendered.
 *
 * If `isLoading` is `false` and the `company` property is empty, the
 * component returns `false` so that the component remains in the React
 * hierarchy, but does not render anything.
 *
 * @param {CompanyDetailProps} props - Component properties.
 * @returns {JSX.Element | false} Returns JSX when loading or a user is
 * provided, otherwise returns `false`.
 */
const CompanyDetail = ({
  className,
  company,
  isLoading = false,
  testid = 'company-detail',
}: CompanyDetailProps): JSX.Element | false => {
  const baseProps = {
    className: classNames(classes.company_detail, className),
    'data-testid': testid,
  };

  if (isLoading) {
    // loading state
    return (
      <div {...baseProps}>
        <div className={classes.header}>
          <LoaderSkeleton animated heightStyle="1.5rem" widthStyle="1.5rem" />
          <LoaderSkeleton animated heightStyle="1.5rem" widthStyle="10rem" />
        </div>
        <div className={classes.content} data-testid={`${testid}-loader`}>
          <LoaderSkeleton animated heightStyle="1.25rem" widthStyle="20rem" />
          <LoaderSkeleton animated heightStyle="1.25rem" widthStyle="20rem" />
          <LoaderSkeleton animated heightStyle="1.25rem" widthStyle="20rem" />
        </div>
      </div>
    );
  }

  if (company) {
    // success state
    return (
      <div {...baseProps}>
        <div className={classes.header}>
          <IonIcon icon={business} />
          <div>Company</div>
        </div>
        <div className={classes.content}>
          <div className={classes.primary}>{company.name}</div>
          <div>{company.catchPhrase}</div>
          <div>{company.bs}</div>
        </div>
      </div>
    );
  }

  // not loading and no user
  return false;
};

export default CompanyDetail;

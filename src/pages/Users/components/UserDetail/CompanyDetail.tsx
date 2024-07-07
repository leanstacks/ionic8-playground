import { IonIcon } from '@ionic/react';
import classNames from 'classnames';
import { business } from 'ionicons/icons';

import './CompanyDetail.scss';
import { BaseComponentProps } from 'common/components/types';
import { Company } from 'common/models/user';
import LoaderSkeleton from 'common/components/Loader/LoaderSkeleton';

/**
 * Properties for the `CompanyDetail` component.
 * @param {Company} [company] - A `Company` object.
 * @see {@link BaseComponentProps}
 */
interface CompanyDetailProps extends BaseComponentProps {
  company?: Company;
}

/**
 * The `CompanyDetail` component renders a block which provides details about
 * a single `Company`.
 *
 * If the `company` property is null or undefined, a loading state is rendered.
 *
 * @param {CompanyDetailProps} props - Component properties.
 * @returns JSX
 */
const CompanyDetail = ({
  className,
  company,
  testid = 'company-detail',
}: CompanyDetailProps): JSX.Element => {
  const baseProps = {
    className: classNames('company-detail', className),
    'data-testid': testid,
  };

  if (company) {
    // success state
    return (
      <div {...baseProps}>
        <div className="content">
          <div className="header">
            <IonIcon icon={business} />
            <div>Company</div>
          </div>
          <div className="primary">{company.name}</div>
          <div>{company.catchPhrase}</div>
          <div>{company.bs}</div>
        </div>
      </div>
    );
  } else {
    // loading state
    return (
      <div {...baseProps}>
        <div className="content" data-testid={`${testid}-loader`}>
          <div className="header">
            <IonIcon icon={business} />
            <LoaderSkeleton animated heightStyle="1.5rem" widthStyle="10rem" />
          </div>
          <LoaderSkeleton animated heightStyle="1rem" widthStyle="20rem" />
          <LoaderSkeleton animated heightStyle="1rem" widthStyle="20rem" />
          <LoaderSkeleton animated heightStyle="1rem" widthStyle="20rem" />
        </div>
      </div>
    );
  }
};

export default CompanyDetail;

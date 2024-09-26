import { IonBadge, IonItem, IonLabel, IonListHeader } from '@ionic/react';
import classNames from 'classnames';

import { BaseComponentProps } from 'common/components/types';
import { usePlatform } from 'common/hooks/usePlatform';
import List from 'common/components/List/List';
import Badges from 'common/components/Badge/Badges';

/**
 * The `PlatformDiagnostics` component displays application diagnostic information
 * as a list of key/value pairs. The attributes are obtained from the Ionic
 * framework.
 *
 * @param {BaseComponentProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const PlatformDiagnostics = ({
  className,
  testid = 'diagnostics-platform',
}: BaseComponentProps): JSX.Element => {
  const { isNativePlatform, platforms } = usePlatform();

  return (
    <List className={classNames('ls-platform-diagnostics', className)} data-testid={testid}>
      <IonListHeader lines="full">
        <IonLabel>Platform</IonLabel>
      </IonListHeader>
      <IonItem className="text-sm">
        <IonLabel className="font-medium ion-margin-end">Native</IonLabel>
        {isNativePlatform ? (
          <IonBadge data-testid={`${testid}-is-native`}>YES</IonBadge>
        ) : (
          <IonBadge color="medium" data-testid={`${testid}-not-native`}>
            NO
          </IonBadge>
        )}
      </IonItem>
      <IonItem className="text-sm">
        <IonLabel className="font-medium ion-margin-end">Platforms</IonLabel>
        <Badges data-testid={`${testid}-platforms`}>
          {platforms.map((platform) => (
            <IonBadge key={platform} color="medium" data-testid={`${testid}-platform`}>
              {platform}
            </IonBadge>
          ))}
        </Badges>
      </IonItem>
    </List>
  );
};

export default PlatformDiagnostics;

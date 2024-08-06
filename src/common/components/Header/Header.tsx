import { ComponentPropsWithoutRef, ReactNode } from 'react';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonProgressBar,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import './Header.scss';
import logo from 'assets/logo_ls.png';
import { useProgress } from 'common/hooks/useProgress';

/**
 * Properties for the `Header` component.
 * @param {boolean} [backButton] - Optional. Indicates the back button
 * should be rendered.
 * @param {ReactNode} [buttons] - Optional. One or more buttons, specific
 * to the page.
 * @param {string} [defaultHref] - Optional. The default back navigation
 * href if there is no history in the route stack.
 * @param {string} [title] - Optional. The header title.
 */
interface HeaderProps extends Pick<ComponentPropsWithoutRef<typeof IonBackButton>, 'defaultHref'> {
  backButton?: boolean;
  buttons?: ReactNode;
  title?: string;
}

const Header = ({ backButton = false, buttons, defaultHref, title }: HeaderProps): JSX.Element => {
  const testid = 'header-app';
  const { isActive: isActiveProgressBar, progressBar } = useProgress();
  console.log(`Header::isActiveProgressBar::${isActiveProgressBar}`);

  return (
    <IonHeader className="header-app" data-testid="header-app">
      <IonToolbar>
        <IonButtons slot="start">
          {backButton ? (
            <IonBackButton defaultHref={defaultHref} data-testid={`${testid}-button-back`} />
          ) : (
            <img className="logo" src={logo} alt="Logo" data-testid={`${testid}-image-logo`} />
          )}
        </IonButtons>
        <IonTitle className="ion-hide-md-up" data-testid={`${testid}-title`}>
          {title}
        </IonTitle>
        <IonButtons className="nav-main ion-hide-md-down" data-testid={`${testid}-menu-row`}>
          <IonButton routerLink="/tabs/home">Home</IonButton>
          <IonButton routerLink="/tabs/users">Users</IonButton>
        </IonButtons>
        <IonButtons slot="end">
          <IonMenuButton
            autoHide={false}
            menu="menu-app"
            className="ion-hide-md-down"
            data-testid={`${testid}-button-menu`}
          ></IonMenuButton>
          {buttons}
        </IonButtons>

        {isActiveProgressBar && <IonProgressBar {...progressBar} />}
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;

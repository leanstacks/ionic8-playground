import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

/**
 * Properties for the `Header` component.
 * @param {boolean} [backButton] - Optional. Indicates the back button
 * should be rendered.
 * @param {string} [defaultHref] - Optional. The default back navigation
 * href if there is no history in the route stack.
 * @param {string} [title] - Optional. The header title.
 */
interface HeaderProps extends Pick<HTMLIonBackButtonElement, 'defaultHref'> {
  backButton?: boolean;
  title?: string;
}

const Header = ({ backButton = false, defaultHref, title }: HeaderProps): JSX.Element => {
  return (
    <IonHeader data-testid="header-app">
      <IonToolbar>
        {backButton && (
          <IonButtons slot="start">
            <IonBackButton defaultHref={defaultHref} data-testid="header-app-button-back" />
          </IonButtons>
        )}
        <IonTitle data-testid="header-app-title">{title}</IonTitle>
        <IonButtons slot="end">
          <IonMenuButton
            autoHide={false}
            menu="menu-app"
            className="ion-hide-md-down"
            data-testid="header-app-button-menu"
          ></IonMenuButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;

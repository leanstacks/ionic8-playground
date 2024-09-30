import { IonContent, IonPage } from '@ionic/react';
import { createContext, PropsWithChildren } from 'react';
import { QueryObserverBaseResult } from '@tanstack/react-query';

import './AuthProvider.scss';
import { UserTokens } from 'common/models/auth';
import { useGetUserTokens } from 'common/api/useGetUserTokens';
import LoaderSpinner from 'common/components/Loader/LoaderSpinner';

/**
 * The `value` provided by the `AuthContext`.
 */
export interface AuthContextValue {
  isAuthenticated: boolean;
  userTokens?: UserTokens;
  refetchUserTokens?: () => Promise<QueryObserverBaseResult<UserTokens, Error>>;
}

/**
 * The default `AuthContext` value.
 */
const DEFAULT_CONTEXT_VALUE: AuthContextValue = {
  isAuthenticated: false,
};

/**
 * The `AuthContext` instance.
 */
export const AuthContext = createContext<AuthContextValue>(DEFAULT_CONTEXT_VALUE);

/**
 * The `AuthProvider` component creates and provides access to the `AuthContext`
 * value.
 * @param {PropsWithChildren} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const AuthProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const { data: userTokens, isPending, isSuccess, refetch: refetchUserTokens } = useGetUserTokens();

  const value: AuthContextValue = {
    isAuthenticated: isSuccess,
    userTokens: userTokens,
    refetchUserTokens,
  };

  const isReady = !isPending;

  return (
    <AuthContext.Provider value={value}>
      {isReady && <>{children}</>}
      {!isReady && (
        <IonPage className="ls-auth-provider">
          <IonContent fullscreen>
            <LoaderSpinner className="ls-auth-provider__spinner" />
          </IonContent>
        </IonPage>
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

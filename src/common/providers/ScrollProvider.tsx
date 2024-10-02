import { createContext, PropsWithChildren, useState } from 'react';
import { ScrollCustomEvent } from '@ionic/core';

/**
 * The `ScrollDirection` type describes the direction of the scroll.
 */
export type ScrollDirection = 'down' | 'up';

/**
 * The `value` provided by the `ScrollContext`.
 */
export type ScrollContextValue = {
  scrollDirection?: ScrollDirection;
  handleIonScroll: (e: ScrollCustomEvent) => void;
};

/**
 * Default value for the `ScrollContext`.
 */
const DEFAULT_VALUE: ScrollContextValue = {
  handleIonScroll: () => {},
};

/**
 * The `ScrollContext` instance.
 */
export const ScrollContext = createContext<ScrollContextValue>(DEFAULT_VALUE);

/**
 * The `ScrollProvider` component creates and provides access to the `ScrollContext`
 * value. Provides information regarding scroll events.
 *
 * Useful when integrated with scroll events emitted by components such as `IonContent`.
 *
 * *Example:*
 * ```
 * const { handleIonScroll, scrollDirection } = useScrollContext();
 * ...
 * <IonContent scrollEvents onIonScroll={handleIonScroll}>
 *   <IonText className={classNames('ion-hide', scrollDirection==='down')}>
 *     I am hidden when scrolling down!
 *   </IonText>
 * </IonContent>
 * ```
 * @param {PropsWithChildren} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const ScrollProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection | undefined>(undefined);

  const handleIonScroll = (event: ScrollCustomEvent) => {
    const { currentY, startY } = event.detail;
    const scrollY = currentY - startY;
    if (scrollY > 0) {
      setScrollDirection('down');
    } else if (scrollY < 0) {
      setScrollDirection('up');
    }
  };

  const contextValue: ScrollContextValue = {
    scrollDirection: scrollDirection,
    handleIonScroll: handleIonScroll,
  };

  return <ScrollContext.Provider value={contextValue}>{children}</ScrollContext.Provider>;
};

export default ScrollProvider;

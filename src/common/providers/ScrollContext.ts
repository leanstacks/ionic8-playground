import { createContext } from 'react';
import { ScrollCustomEvent } from '@ionic/react';

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

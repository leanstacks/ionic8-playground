import { Capacitor } from '@capacitor/core';
import { getPlatforms } from '@ionic/react';

/**
 * The `Platform` type has attributes which describe the platform on which the
 * application is running.
 * @param {boolean} isNativePlatform - Returns `true` if the application is
 * running as a native mobile application; otherwise returns `false`.
 * @param {string[]} platforms - An array of platforms describing the runtime
 * environment.
 * @see {@link https://ionicframework.com/docs/react/platform#platforms}
 */
type Platform = {
  isNativePlatform: boolean;
  platforms: string[];
};

/**
 * The `usePlatform` hook provides details about the `Platform` on which the
 * application is running.
 *
 * @see {@link https://ionicframework.com/docs/react/platform}
 * @returns {Platform} A `Platform` object.
 */
export const usePlatform = (): Platform => {
  const isNativePlatform = Capacitor.isNativePlatform();
  console.log(`usePlatform::isNativePlatform::${isNativePlatform}`);
  const platforms = getPlatforms();
  console.log(`usePlatform::platforms::${platforms}`);

  return {
    isNativePlatform,
    platforms,
  };
};

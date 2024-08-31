import { useQuery } from '@tanstack/react-query';
import { App } from '@capacitor/app';

import { QueryKey } from 'common/utils/constants';

/**
 * A query hook which returns the `AppInfo` value from the `App` capacitor.
 *
 * Note: The capacitor only returns a value when the app is running as a
 * native mobile application. Otherwise returns an error.
 *
 * @returns Returns a `UseQueryResult` whose data is an `AppInfo` object.
 * @see {@link https://capacitorjs.com/docs/apis/app}
 */
export const useGetAppInfo = () => {
  return useQuery({
    queryKey: [QueryKey.AppInfo],
    queryFn: () => App.getInfo(),
  });
};

import { useQuery } from '@tanstack/react-query';

import { Settings } from 'common/models/settings';
import { DEFAULT_SETTINGS, QueryKey, StorageKey } from 'common/utils/constants';
import storage from 'common/utils/storage';

/**
 * A query hook to fetch the user `Settings` values.
 * @returns Returns a `UserQueryResult` with `Settings` data.
 */
export const useGetSettings = () => {
  /**
   * Fetches the [user] `Settings`.
   * @returns {Promise<Settings>} A Promise which resolves to the `Settings` object.
   */
  const getSettings = async (): Promise<Settings> => {
    return new Promise((resolve, reject) => {
      try {
        const storedSettings = storage.getItem(StorageKey.Settings);
        if (storedSettings) {
          const settings = JSON.parse(storedSettings) as Settings;
          return resolve({ ...DEFAULT_SETTINGS, ...settings });
        } else {
          return resolve(DEFAULT_SETTINGS);
        }
      } catch (error) {
        return reject(error);
      }
    });
  };

  return useQuery({
    queryKey: [QueryKey.Settings],
    queryFn: () => getSettings(),
  });
};

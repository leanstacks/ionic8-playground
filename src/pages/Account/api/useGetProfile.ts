import { useQuery } from '@tanstack/react-query';

import { Profile } from 'common/models/profile';
import { User } from 'common/models/user';
import { QueryKey, StorageKey } from 'common/utils/constants';
import storage from 'common/utils/storage';

/**
 * A query hook to fetch the user `Profile` values.
 * @returns Returns a `UserQueryResult` with `Profile` data.
 */
export const useGetProfile = () => {
  /**
   * Gets a [user] `Profile` from local storage.
   *
   * If there is no stored profile, initializes a new profile using
   * attributes from the currently authenticated `User`.
   *
   * @returns {Promise<Profile>} A Promise which resolves to a `Profile`.
   */
  const getProfile = async (): Promise<Profile> => {
    return new Promise((resolve, reject) => {
      try {
        const storedProfile = storage.getItem(StorageKey.UserProfile);
        if (storedProfile) {
          return resolve(JSON.parse(storedProfile));
        } else {
          const storedUser = storage.getItem(StorageKey.User);
          if (storedUser) {
            const user: User = JSON.parse(storedUser);
            return resolve({ name: user.name, email: user.email });
          } else {
            return reject('Profile not found.');
          }
        }
      } catch (err) {
        return reject(err);
      }
    });
  };

  return useQuery({ queryKey: [QueryKey.UserProfile], queryFn: () => getProfile() });
};

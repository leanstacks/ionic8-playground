import { useQuery } from '@tanstack/react-query';

import { User } from 'common/models/user';
import { QueryKey, StorageKey } from 'common/utils/constants';
import storage from 'common/utils/storage';

/**
 * An API hook which fetches the currently authenticated `User`.
 * @returns Returns a `UseQueryResult` with `User` data.
 */
export const useGetCurrentUser = () => {
  /**
   * Fetch the details about the currently authenticated `User`.
   * @returns A Promise which resolves to a `User`.
   */
  const getCurentUser = (): Promise<User> => {
    // TODO: This is contrived, example logic. Replace with an actual
    //       integration with your Identity Provider, IdP.
    return new Promise((resolve, reject) => {
      try {
        const storedUser = storage.getItem(StorageKey.User);
        if (storedUser) {
          const user = JSON.parse(storedUser) as unknown as User;
          return resolve(user);
        }
        return reject(new Error('Not found.'));
      } catch (err) {
        return reject(err);
      }
    });
  };

  return useQuery({
    queryKey: [QueryKey.Users, 'current'],
    queryFn: () => getCurentUser(),
  });
};

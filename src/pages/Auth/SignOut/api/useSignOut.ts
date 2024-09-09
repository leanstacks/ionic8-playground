import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QueryKey, StorageKey } from 'common/utils/constants';
import storage from 'common/utils/storage';

/**
 * And API hook which deauthenticates the currently authenticated user.
 * @returns Returns a `UseMutationResult` with no data.
 */
export const useSignOut = () => {
  const queryClient = useQueryClient();

  /**
   * Signs out the currently authenticated user.
   * @returns Returns a Promise which resolves empty if successful,
   * otherwise rejects with an Error.
   */
  const signOut = async (): Promise<void> => {
    // TODO: This is a contrived signout approach for demonstration purposes.
    //       You should implement signout functionality in accordance
    //       with your IdP.
    return new Promise((resolve, reject) => {
      try {
        storage.removeItem(StorageKey.UserTokens);
        storage.removeItem(StorageKey.User);
        storage.removeItem(StorageKey.UserProfile);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  };

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: [QueryKey.UserTokens] });
      queryClient.resetQueries({ queryKey: [QueryKey.Users] });
      queryClient.resetQueries({ queryKey: [QueryKey.UserProfile] });
    },
  });
};

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { User } from 'common/models/user';
import { QueryKey, StorageKey } from 'common/utils/constants';
import storage from 'common/utils/storage';

/**
 * The `Profile` object. This is a contrived type for demonstration purposes.
 */
export type Profile = Pick<User, 'email' | 'name' | 'phone' | 'username' | 'website'>;

/**
 * The `useUpdateProfile` mutatation function variables.
 * @param {Profile} profile - The updated `Profile` object.
 */
export type UpdateProfileVariables = {
  profile: Profile;
};

/**
 * An API hook which updates a single `Profile`. Returns a `UseMutationResult`
 * object whose `mutate` attribute is a function to update a `Profile`.
 *
 * When successful, the hook updates the cached `Profile` query data.
 * @returns Returns a `UseMutationResult`.
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  const updateProfile = ({ profile }: UpdateProfileVariables): Promise<User> => {
    return new Promise((resolve, reject) => {
      try {
        const storedProfile = storage.getItem(StorageKey.User);
        if (storedProfile) {
          const currentProfile: User = JSON.parse(storedProfile);
          const updatedProfile: User = { ...currentProfile, ...profile };
          storage.setItem(StorageKey.User, JSON.stringify(updatedProfile));
          return resolve(updatedProfile);
        } else {
          return reject(new Error('Profile not found.'));
        }
      } catch (err) {
        return reject(err);
      }
    });
  };

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      // update cached query data
      queryClient.setQueryData<User>([QueryKey.Users, 'current'], data);
      // you may [also|instead] choose to invalidate certain cached queries, triggering refetch
      // queryClient.invalidateQueries({ queryKey: [QueryKey.Users, 'current'] });
    },
  });
};

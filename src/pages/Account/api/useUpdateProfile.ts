import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Profile } from 'common/models/profile';
import { QueryKey, StorageKey } from 'common/utils/constants';
import storage from 'common/utils/storage';

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

  const updateProfile = ({ profile }: UpdateProfileVariables): Promise<Profile> => {
    return new Promise((resolve, reject) => {
      try {
        const storedProfile = storage.getItem(StorageKey.UserProfile) ?? '{}';
        const currentProfile: Profile = JSON.parse(storedProfile);
        const updatedProfile: Profile = { ...currentProfile, ...profile };
        storage.setItem(StorageKey.UserProfile, JSON.stringify(updatedProfile));
        return resolve(updatedProfile);
      } catch (err) {
        return reject(err);
      }
    });
  };

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      // update cached query data
      queryClient.setQueryData<Profile>([QueryKey.UserProfile], data);
      // you may [also|instead] choose to invalidate certain cached queries, triggering refetch
      // queryClient.invalidateQueries({ queryKey: [QueryKey.UserProfile] });
    },
  });
};

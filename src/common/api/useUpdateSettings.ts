import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Settings } from 'common/models/settings';
import { DEFAULT_SETTINGS, QueryKey, StorageKey } from 'common/utils/constants';
import storage from 'common/utils/storage';

/**
 * The `useUpdateSettings` mutation function variables.
 * @param {Partial<Settings>} settings - The updated `Settings` attributes.
 */
export type UpdateSettingsVariables = {
  settings: Partial<Settings>;
};

/**
 * A mutation hook which updates the user `Settings`. Returns a `UseMutationResult`
 * object whose `mutate` attribute is a function to update the `Settings`.
 *
 * When successful, the hook updates the cached `Settings` query data.
 * @returns Returns a `UseMutationResult`.
 */
export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  /**
   * Updates the [user] `Settings`.
   * @param {UpdateSettingsVariables} variables - The mutation function variables.
   * @returns {Promise<Settings>} A Promise which resolves to the updated `Settings`.
   */
  const updateSettings = async ({ settings }: UpdateSettingsVariables): Promise<Settings> => {
    return new Promise((resolve, reject) => {
      try {
        const storedSettings: Settings = JSON.parse(storage.getItem(StorageKey.Settings) ?? '{}');
        const updatedSettings: Settings = { ...DEFAULT_SETTINGS, ...storedSettings, ...settings };
        storage.setItem(StorageKey.Settings, JSON.stringify(updatedSettings));
        return resolve(updatedSettings);
      } catch (error) {
        return reject(error);
      }
    });
  };

  return useMutation({
    mutationFn: updateSettings,
    onSuccess: (data) => {
      // update cached query data
      queryClient.setQueryData<Settings>([QueryKey.Settings], data);
      // you may [also|instead] choose to invalidate certain cached queries, triggering refetch
      // queryClient.invalidateQueries({ queryKey: [QueryKey.Settings] });
    },
  });
};

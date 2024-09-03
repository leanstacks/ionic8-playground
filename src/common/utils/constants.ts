import { Settings } from 'common/models/settings';

/**
 * React Query cache keys.
 */
export enum QueryKey {
  AppInfo = 'AppInfo',
  Settings = 'Settings',
  Users = 'Users',
  UserTokens = 'UserTokens',
}

/**
 * Local storage keys.
 */
export enum StorageKey {
  Settings = 'ionic-playground.settings',
  User = 'ionic-playground.user',
  UserTokens = 'ionic-playground.user-tokens',
}

/**
 * The default `Settings` values.
 */
export const DEFAULT_SETTINGS: Settings = {
  allowNotifications: true,
  brightness: 50,
};

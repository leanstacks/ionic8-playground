import { Settings } from 'common/models/settings';

/**
 * React Query cache keys.
 */
export enum QueryKey {
  AppInfo = 'AppInfo',
  Settings = 'Settings',
  UserProfile = 'UserProfile',
  Users = 'Users',
  UserTokens = 'UserTokens',
}

/**
 * Local storage keys.
 */
export enum StorageKey {
  RememberMe = 'ionic-playground.remember-me',
  Settings = 'ionic-playground.settings',
  UserProfile = 'ionic-playground.user-profile',
  User = 'ionic-playground.user',
  UserTokens = 'ionic-playground.user-tokens',
}

/**
 * The default `Settings` values.
 */
export const DEFAULT_SETTINGS: Settings = {
  allowNotifications: true,
  brightness: 50,
  language: 'en',
};

/**
 * Available languages.
 */
export const LANGUAGES = [
  {
    code: 'en',
    value: 'English',
  },
  {
    code: 'es',
    value: 'Spanish',
  },
  {
    code: 'fr',
    value: 'French',
  },
];

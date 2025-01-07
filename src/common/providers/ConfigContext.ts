import { createContext } from 'react';

/**
 * The application configuration. The `value` provided by the `ConfigContext`.
 */
export interface Config {
  VITE_BASE_URL_API: string;
  VITE_BUILD_DATE: string;
  VITE_BUILD_TIME: string;
  VITE_BUILD_TS: string;
  VITE_BUILD_COMMIT_SHA: string;
  VITE_BUILD_ENV_CODE: string;
  VITE_BUILD_WORKFLOW_RUNNER: string;
  VITE_BUILD_WORKFLOW_NAME: string;
  VITE_BUILD_WORKFLOW_RUN_NUMBER: number;
  VITE_BUILD_WORKFLOW_RUN_ATTEMPT: number;
  VITE_TOAST_AUTO_DISMISS_MILLIS: number;
}

/**
 * The `ConfigContext` instance.
 */
export const ConfigContext = createContext<Config | undefined>(undefined);

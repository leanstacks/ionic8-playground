/**
 * The `UserTokens` type. Authenticated user tokens.
 */
export type UserTokens = {
  access_token: string;
  id_token: string;
  refresh_token: string;
  token_type: 'bearer';
  expires_in: number;
  expires_at: string;
};

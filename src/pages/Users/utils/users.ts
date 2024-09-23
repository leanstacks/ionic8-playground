import filter from 'lodash/filter';

import { User } from 'common/models/user';

/**
 * Filter a collection of `User` objects by performing a case-insensitive partial
 * match of the `name` and `email` attributes.
 * @param {User[]} [users] - Optional. A collection of `User` objects.
 * @param {string} [criteria] - Optional. The criteria by which to filter the
 * collection.
 * @returns {User[]} - The filtered collection of `User` objects.
 */
export const filterUsers = (users?: User[], criteria?: string): User[] => {
  return filter<User>(users, (user) => {
    if (criteria) {
      const filterCriteria = criteria.trim().toLowerCase();
      let match: boolean = user.name.toLowerCase().includes(filterCriteria);
      match ||= user.email.toLowerCase().includes(filterCriteria);
      return match;
    } else {
      return true;
    }
  });
};

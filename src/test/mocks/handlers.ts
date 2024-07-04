import { HttpResponse, http } from 'msw';
import find from 'lodash/find';

import { usersFixture } from '__fixtures__/users';

/**
 * Mock Service Worker (MSW) mock API endpoints.
 */
export const handlers = [
  http.get('https://jsonplaceholder.typicode.com/users', () => {
    // get all users
    return HttpResponse.json(usersFixture);
  }),
  http.get('https://jsonplaceholder.typicode.com/users/:userId', ({ params }) => {
    // get a user by identifier
    const { userId } = params;
    const user = find(usersFixture, { id: Number(userId) });
    if (user) {
      return HttpResponse.json(user);
    }
    return new HttpResponse(null, { status: 404 });
  }),
];

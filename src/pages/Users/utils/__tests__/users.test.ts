import { describe, expect, it } from 'vitest';

import { usersFixture } from '__fixtures__/users';

import { filterUsers } from '../users';

describe('users', () => {
  it('should filter users by name', () => {
    // ARRANGE
    const result = filterUsers(usersFixture, usersFixture[0].name);

    // ASSERT
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(1);
  });

  it('should filter users by email', () => {
    // ARRANGE
    const result = filterUsers(usersFixture, usersFixture[0].email);

    // ASSERT
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(1);
  });

  it('should not filter users when criteria undefined', () => {
    // ARRANGE
    const result = filterUsers(usersFixture);

    // ASSERT
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(usersFixture.length);
  });

  it('should not filter users when criteria empty', () => {
    // ARRANGE
    const result = filterUsers(usersFixture, '');

    // ASSERT
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(usersFixture.length);
  });
});

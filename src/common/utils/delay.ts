/**
 * Pauses invocation for `wait` milliseconds.
 * @param {number} [wait=500] - Optional. The number of milliseconds to wait. Default: `500`
 * @returns {Promise<void>} A Promise which resolves to `void`.
 */
export const delay = async (wait: number = 500): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, wait);
  });
};

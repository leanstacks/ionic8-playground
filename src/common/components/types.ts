/**
 * Component properties with CSS class name(s).
 * @param {string} [className] - Optional. CSS class names.
 */
export interface PropsWithClassName {
  className?: string;
}

/**
 * Component properties with a test identifier.
 * @param {string} [testid] - Optional. A testing library identifier.
 */
export interface PropsWithTestId {
  testid?: string;
}

/**
 * Utility interface combining the most commonly used React component
 * properties interfaces.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
export interface BaseComponentProps extends PropsWithClassName, PropsWithTestId {}

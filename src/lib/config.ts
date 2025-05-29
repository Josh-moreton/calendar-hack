/**
 * Environment configuration utility
 * Handles URL configuration for different environments
 */

/**
 * Get the base URL for the current environment
 */
function getBaseUrl(): string {
  // Check if we're in development mode
  if (import.meta.env.DEV) {
    return window.location.origin; // localhost:5173 for dev
  }

  // Production URL
  return "https://stridr.dev";
}

/**
 * Get authentication redirect URL for the current environment
 */
function getAuthRedirectUrl(path: string): string {
  return `${getBaseUrl()}${path}`;
}

export { getBaseUrl, getAuthRedirectUrl };

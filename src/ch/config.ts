// Determine the base path based on environment
// Use process.env.NODE_ENV for test environment compatibility
let isDev: boolean;
try {
  // Try to access import.meta.env if available (Vite environment)
  isDev = (globalThis as any).import?.meta?.env?.DEV ?? 
          (process.env.NODE_ENV === 'development' || 
           process.env.NODE_ENV === 'test');
} catch {
  // Fallback for environments that don't support import.meta
  isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';
}
const basePath = isDev ? "" : "/hacks/calendarhack";

const AppConfig = {
  plansPath: `${basePath}/plans/json/`,
};

export const Config = AppConfig;

// Determine the base path based on environment
// For now, use production path as default since this is mainly used for plan loading
const basePath = "/hacks/calendarhack";

const AppConfig = {
  plansPath: `${basePath}/plans/json/`,
};

export const Config = AppConfig;

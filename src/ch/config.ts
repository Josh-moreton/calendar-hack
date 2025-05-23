// Determine the base path based on environment
const basePath = import.meta.env.DEV ? "" : "/hacks/calendarhack";

const AppConfig = {
  plansPath: `${basePath}/plans/json/`,
};

export const Config = AppConfig;

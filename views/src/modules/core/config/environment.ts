export const { NODE_ENV } = import.meta.env;
export const IS_DEVELOPMENT = NODE_ENV === `development`;
export const IS_TEST = NODE_ENV === `test`;
export const IS_PRODUCTION = NODE_ENV === `production`;

export const API_URL = import.meta.env.VITE_API_URL;

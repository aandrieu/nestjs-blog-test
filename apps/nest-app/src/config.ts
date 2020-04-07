export interface Config {
  env: {
    isProduction: boolean;
  };
}

export const config: Config = {
  env: {
    isProduction: process.env.NODE_ENV === 'production',
  },
};

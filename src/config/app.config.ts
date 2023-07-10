export function EnvConfiguration() {
  return {
    environment: process.env.NODE_ENV || 'dev',
    mongoConn: process.env.MONGO_CONN,
    port: +process.env.PORT || 3000,
    defaultLimit: +process.env.DEFAULT_LIMIT || 10,
  };
}

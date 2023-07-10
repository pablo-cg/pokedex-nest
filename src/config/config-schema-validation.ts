import * as j from 'joi';

export const ConfigValidationSchema = j.object({
  MONGO_CONN: j.string().required(),
  PORT: j.number().default(3000),
  DEFAULT_LIMIT: j.number().default(10),
});

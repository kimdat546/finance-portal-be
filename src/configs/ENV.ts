export const ENV = {
  ORIGIN_DOMAIN: process.env.ORIGIN_DOMAIN.split(','),
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV,
  ADMIN_MAIL: (process.env.ADMIN_MAIL || '').split(',').filter(Boolean),
  DB: {
    HOST: process.env.PG_HOST,
    PORT: Number(process.env.PG_PORT),
    USERNAME: process.env.PG_USERNAME,
    PASSWORD: process.env.PG_PASSWORD,
    DATABASE: process.env.PG_DATABASE,
  },
  JWT: {
    access: {
      privateKey: process.env.JWT_ACCESS_KEY || 'access_private_key',
      expiresIn: process.env.JWT_ACCESS_EXP || '15m',
    },
    refresh: {
      privateKey: process.env.JWT_REFRESH_KEY || 'refresh_private_key',
      expiresIn: process.env.JWT_REFRESH_EXP || '45m',
    },
  },
  SES: {
    domain: process.env.SES_DOMAIN,
    region: process.env.AWS_REGION,
    accessKey: process.env.SES_ACCESS_KEY,
    secretKey: process.env.SES_SECRET_KEY,
  },
  S3: {
    region: process.env.AWS_REGION,
    accessKey: process.env.S3_ACCESS_KEY,
    secretKey: process.env.S3_SECRET_KEY,
    publicBucket: process.env.S3_PUBLIC_BUCKET,
    privateBucket: process.env.S3_PRIVATE_BUCKET,
  },
  CRYPTO: {
    secretKey: process.env.CRYPTO_SECRET_KEY,
  },
  STRIPE: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhook: {
      checkoutSession: process.env.STRIPE_CK_WH_SECRET_KEY,
    },
  },
} as const;

import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
    nodeEnv: process.env.NODE_ENV,
    appPort: Number(process.env.APP_PORT) || 3000,
    appName: process.env.APP_NAME || 'Pharma Labs',
    appServer: process.env.APP_SERVER || 'http://localhost',
    appVersion: process.env.APP_VERSION,
    pharmaLabsAppUrl: process.env.PHARMA_LABS_APP_URL,
    SlugLength: process.env.SLUG_LENGTH,
    OrderIdLength: process.env.ORDERID_LENGTH,
}));

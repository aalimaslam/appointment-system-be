import { registerAs } from '@nestjs/config';

export default registerAs('blob', () => ({
    endPoint: process.env.BLOB_ENDPOINT,
    port: Number(process.env.BLOB_PORT),
    useSSL: process.env.BLOB_USE_SSL === 'true',
    accessKeyId: process.env.BLOB_ACCESS_KEY_ID,
    secretAccessKey: process.env.BLOB_SECRET_ACCESS_KEY,
    bucket: process.env.BLOB_BUCKET,
}));

import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    jwtVerifyExpiresIn: process.env.JWT_VERIFY_EXPIRES_IN,
}));

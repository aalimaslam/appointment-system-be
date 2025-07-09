import { registerAs } from '@nestjs/config';

export default registerAs('firebase', () => ({
    accountType: process.env.FIREBASE_ACCOUNT_TYPE,
    projectId: process.env.FIREBASE_PROJECT_ID,
    keyId: process.env.FIREBASE_KEY_ID,
    privateKey: process.env.FIREBASE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    clientId: process.env.FIREBASE_CLIENT_ID,
    authURI: process.env.FIREBASE_AUTH_URI,
    tokenURI: process.env.FIREBASE_TOKEN_URI,
    authProviderCertUrl: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
    universeDomain: process.env.FIREBASE_UNIVERSE_DOMAIN,
    clientCertUrl: process.env.FIREBASE_CLIENT_CERT_URL,
}));

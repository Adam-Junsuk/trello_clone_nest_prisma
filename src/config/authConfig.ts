import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  audience: process.env.JWT_AUDIENCE || 'example.com',
  issuer: process.env.JWT_ISSUER || 'example.com',
}));

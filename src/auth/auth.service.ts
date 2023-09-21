import { Injectable, Inject } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import authConfig from 'src/config/authConfig';
import { ConfigType } from '@nestjs/config';

interface User {
  id: number;
  username: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>,
  ) {}

  login(user: User) {
    const payload = { ...user };

    return jwt.sign(payload, this.config.jwtSecret, {
      expiresIn: '1d',
      audience: 'example.com',
      issuer: 'exaple.com',
    });
  }
}

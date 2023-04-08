import { Inject, Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import authConfig from 'src/config/authConfig';
import * as jwt from 'jsonwebtoken';

interface User {
  id: string;
  name: string;
  email: string;
}

@Injectable({scope: Scope.REQUEST})
export class AuthService {
  constructor(
    @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>,
  ) {}

  login(user: User): string {
    // set up private claim of payload
    const payload = { ...user };

    // Create jwt and return it
    const token = jwt.sign(payload, this.config.jwtSecret, {
      expiresIn: '1d',
      audience: 'example.com',
      issuer: 'example.com',
    });
    console.log(token);
    return token;
  }

  verify(jwtString: string) {
    try {
      const payload = jwt.verify(jwtString, this.config.jwtSecret) as (
        | jwt.JwtPayload
        | string
      ) & User;

      const { id, email } = payload;
      
      return {
        userId: id,
        email,
      }
    } catch (e) {
      console.log('VerifyError: ', e);
      throw new UnauthorizedException();
    }
  }
}

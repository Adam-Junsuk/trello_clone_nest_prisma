// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { config } from 'dotenv';
// import { Strategy } from 'passport-facebook';
// import { AuthService } from 'src/auth-basic/auth.service';

// config();

// @Injectable()
// export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
//   constructor(private readonly authService: AuthService) {
//     super({
//       clientId: process.env.FACEBOOK_CLIENT_ID,
//       clientSecret: process.env.FACEBOOK_SECRET,
//       callbackURL: 'http://localhost:3000/facebook/redirect',
//       passReqToCallback: true,
//       scope: ['email', 'profile'],
//     });
//   }

//   async validate(
//     request: any,
//     accessToken: string,
//     refreshToken: string,
//     profile: any,
//   ) {
//     const user = await this.authService.validateOAuthLogin(profile);
//     return user;
//   }
// }

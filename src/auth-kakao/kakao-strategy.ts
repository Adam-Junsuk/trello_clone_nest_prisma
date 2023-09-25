// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { config } from 'dotenv';
// import { VerifyCallback } from 'passport-google-oauth20';
// import { Strategy } from 'passport-jwt';

// config();

// @Injectable()
// export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
//   constructor() {
//     super({
//       clientId: process.env.KAKAO_API_KEY,
//       callbackURL: process.env.KAKAO_CALLBACK_URL,
//       scope: ['email', 'profile'],
//     });
//   }

//   async validate(
//     accessToken: string,
//     refreshToken: string,
//     profile: any,
//     done: VerifyCallback,
//   )
// }

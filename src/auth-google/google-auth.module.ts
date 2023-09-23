import { Module } from '@nestjs/common';
import { GoogleOauthController } from './google-auth.controller';
import { GoogleStrategy } from './google-auth.strategy';
import { JwtAuthModule } from './jwt-auth.module';

@Module({
  imports: [JwtAuthModule],
  controllers: [GoogleOauthController],
  providers: [GoogleStrategy],
})
export class GoogleOauthModule {}

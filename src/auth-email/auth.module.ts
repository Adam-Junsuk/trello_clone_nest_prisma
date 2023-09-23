import { Module } from '@nestjs/common';
import { AuthService } from './auth.service'; // Import AuthService
import { ConfigModule } from '@nestjs/config';
import authConfig from 'src/config/authConfig';

@Module({
  imports: [
    ConfigModule.forFeature(authConfig), // Import ConfigModule for authConfig
  ],
  providers: [AuthService], // Add AuthService to providers
  exports: [AuthService], // Export AuthService for use in other modules
})
export class AuthModule {}

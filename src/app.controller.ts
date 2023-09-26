// /Users/adam/trello_clone_nest_prisma/src/app.controller.ts

import { Controller, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { GoogleOauthGuard } from './auth-google/google-auth.guard';

@Controller('auth')
@UseGuards(GoogleOauthGuard)
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly appService: AppService) {}
}

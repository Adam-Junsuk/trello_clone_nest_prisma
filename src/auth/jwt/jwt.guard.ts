// import { AuthService } from './../auth.service';
// import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

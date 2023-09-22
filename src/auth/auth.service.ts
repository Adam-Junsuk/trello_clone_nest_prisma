import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginRequsetDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
//이메일, 패스워드에 대한 유효성검증이 완료되면 jwt토큰을 보내주기
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService, //auth모듈에서 jwt모듈을 임포트했으니 그안에 있는거 사용
  ) {}

  async jwtLogin(data: LoginRequsetDto) {
    const { email, password } = data;

    //해당 이메일 존재하는지 체크
    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요');
    }

    //패스워드 검사
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요');
    }

    //유효성검사는 끝났으니 프론트에 jwt토큰 발급
    //sub는 토큰제목임
    const payload = { email: email, sub: user.userId };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}

import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class LoginRequsetDto extends PickType(CreateUserDto, [
  'email',
  'password',
] as const) {}

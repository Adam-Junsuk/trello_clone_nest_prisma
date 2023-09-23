import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  readonly username: string;

  @IsString()
  @IsEmail()
  readonly email: string;

  readonly password: string;
}

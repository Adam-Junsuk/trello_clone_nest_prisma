// src/users/dto/create-user.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  readonly username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MinLength(4)
  readonly email: string;

// minjung's code start
// export class CreateUserDto {
//   @ApiProperty()
//   @IsString()
//   @IsNotEmpty()
//   readonly username: string;

//   @ApiProperty()
//   @IsString()
//   @IsNotEmpty()
//   @MinLength(10)
//   readonly password: string;

//   @ApiProperty()
//   @IsEmail()
//   @IsNotEmpty()
//   readonly email: string;
  // minjung's code end
}

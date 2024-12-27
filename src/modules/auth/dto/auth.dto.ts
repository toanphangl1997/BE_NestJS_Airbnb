import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsString({ message: 'Email phải là string' })
  @IsNotEmpty({ message: 'Email không được trống' })
  @IsEmail(undefined, { message: 'Email chưa hợp lệ' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Mật khẩu không được trống' })
  @IsString({ message: 'password phải là string' })
  pass_word: string;

  @ApiProperty()
  @IsString({ message: 'Name phải là string' })
  name: string;
}

export class LoginDto {
  @ApiProperty()
  @IsString({ message: 'Email phải là string' })
  @IsNotEmpty({ message: 'Email không được trống' })
  @IsEmail(undefined, { message: 'Email chưa hợp lệ' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Mật khẩu không được trống' })
  @IsString({ message: 'password phải là string' })
  pass_word: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'ID của user' })
  @IsNotEmpty({ message: 'id không được để trống' })
  @IsNumber({}, { message: 'id phải là số' })
  id: number;

  @ApiProperty({ description: 'Tên của user' })
  @IsNotEmpty({ message: 'name không được để trống' })
  @IsString({ message: 'noi_dung phải là string' })
  name: string;

  @ApiProperty({ description: 'Email' })
  @IsNotEmpty({ message: 'email không được để trống' })
  @IsString({ message: 'Email phải là string' })
  @IsEmail(undefined, { message: 'Email chưa hợp lệ' })
  email: string;

  @ApiProperty({ description: 'Mật khẩu của user' })
  @IsNotEmpty({ message: 'mật khẩu không được để trống' })
  @IsString({ message: 'password phải là string' })
  pass_word: string;

  @ApiProperty({ description: 'SDT của user' })
  @IsNotEmpty({ message: 'SDT không được đê trống' })
  @IsString()
  phone: string;

  @ApiProperty({ description: 'Ngày tháng năm sinh của user' })
  @IsString()
  birth_day: string;

  @ApiProperty({ description: 'Gender của user' })
  @IsNotEmpty({ message: 'Gender không được để trống' })
  @IsString({ message: 'Gender phải là string' })
  gender: string;

  @ApiProperty({ description: 'Role của user' })
  @IsNotEmpty({ message: 'Role không được để trống' })
  @IsString({ message: 'Role phải là string' })
  role: string;
}

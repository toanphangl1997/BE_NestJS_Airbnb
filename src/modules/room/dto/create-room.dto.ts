import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({ description: 'ID của Phòng' })
  @IsNotEmpty({ message: 'id không được để trống' })
  @IsNumber({}, { message: 'id phải là số' })
  id: number;

  @ApiProperty({ description: 'Tên phòng' })
  @IsNotEmpty({ message: 'ten_phong không được để trống' })
  @IsString({ message: 'ten_phong phải là string' })
  ten_phong: string;

  @ApiProperty({ description: 'Khách' })
  @IsNotEmpty({ message: 'khach không được để trống' })
  @IsNumber(
    {},
    {
      message: 'khach phải là số',
    },
  )
  khach: number;

  // @ApiProperty({ description: 'Phòng ngủ' })
  // @IsNotEmpty({ message: 'khach không được để trống' })
  // @IsNumber({}, { message: 'khach phải là number' })
  // phong_ngu: number;

  // @ApiProperty({ description: 'Giường' })
  // @IsNotEmpty({ message: 'giường không được để trống' })
  // @IsNumber({}, { message: 'giuong phải là number' })
  // giuong: number;

  // @ApiProperty({ description: 'Phòng tắm' })
  // @IsNotEmpty({ message: 'phong_tam không được để trống' })
  // @IsNumber({}, { message: 'phong_tam là number' })
  // phong_tam: number;

  @ApiProperty({ description: 'Giá tiền phòng' })
  @IsNotEmpty({ message: 'gia_tien không được để trống' })
  @IsNumber({}, { message: 'gia_tien là number' })
  gia_tien: number;

  @ApiProperty({ description: 'Vị trí phòng' })
  @IsNotEmpty({ message: 'id_vi_tri không được để trống' })
  @IsNumber({}, { message: 'id_vi_tri là number' })
  id_vi_tri: number;
}

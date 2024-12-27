import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({ description: 'ID của đặt phòng' })
  //   @IsNotEmpty({ message: 'id không được để trống' })
  //   @IsNumber({}, { message: 'id phải là số' })
  id: number;

  @ApiProperty({ description: 'Mã phòng liên quan' })
  @IsNotEmpty({ message: 'ma_phong không được để trống' })
  @IsNumber({}, { message: 'ma_phong phải là số' })
  ma_phong: number;

  @ApiProperty({ description: 'Mã số lượng khách' })
  @IsNotEmpty({ message: 'so_luong_khach không được để trống' })
  @IsNumber({}, { message: 'so_luong_khach phải là số' })
  so_luong_khach: number;

  @ApiProperty({ description: 'Mã người đặt phòng' })
  @IsNotEmpty({ message: 'ma_nguoi_dat không được để trống' })
  @IsNumber({}, { message: 'ma_nguoi_dat phải là số' })
  ma_nguoi_dat: number;
}

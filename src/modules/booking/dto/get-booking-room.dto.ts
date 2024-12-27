import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class BookingRoomDto {
  @ApiProperty({ description: 'ID của đặt phòng' })
  // @IsNumber({}, { message: 'ID phải là số' })
  id: number;

  @ApiProperty({ description: 'Mã phòng liên quan' })
  ma_phong: number;

  @ApiProperty({ description: 'Mã số lượng khách' })
  so_luong_khach: number;

  @ApiProperty({ description: 'Mã người đặt' })
  ma_nguoi_dat: number;
}

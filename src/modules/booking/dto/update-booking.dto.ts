import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookingDto {
  @ApiProperty({ description: 'Mã phòng cần đặt', required: false })
  ma_phong?: number;

  @ApiProperty({ description: 'Số lượng khách', required: false })
  so_luong_khach?: number;

  @ApiProperty({
    description: 'Mã người đặt phòng',
    required: false,
  })
  ma_nguoi_dat?: number;
}

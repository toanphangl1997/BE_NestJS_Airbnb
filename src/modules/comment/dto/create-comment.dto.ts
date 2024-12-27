import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ description: 'ID của bình luận' })
  @IsNotEmpty({ message: 'id không được để trống' })
  @IsNumber({}, { message: 'id phải là số' })
  id: number;

  @ApiProperty({ description: 'Mã công việc liên quan' })
  @IsNotEmpty({ message: 'ma_cong_viec không được để trống' })
  @IsNumber({}, { message: 'ma_cong_viec phải là số' })
  ma_cong_viec: number;

  @ApiProperty({ description: 'Mã người bình luận' })
  @IsNotEmpty({ message: 'ma_nguoi_binh_luan không được để trống' })
  @IsNumber(
    {},
    {
      message: 'ma_nguoi_binh_luan phải là số',
    },
  )
  ma_nguoi_binh_luan: number;

  @ApiProperty({ description: 'Số sao bình luận (từ 1-5)' })
  @ApiProperty({ description: 'Nội dung bình luận' })
  @IsNotEmpty({ message: 'noi_dung không được để trống' })
  @IsString({ message: 'noi_dung phải là string' })
  noi_dung: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'sao_binh_luan không được để trống' })
  @IsNumber(
    {},
    {
      message: 'sao_binh_luan phải là số',
    },
  )
  sao_binh_luan: number;
}

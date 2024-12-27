import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({ description: 'Mã công việc cần đặt', required: false })
  @IsOptional()
  @IsInt()
  ma_cong_viec?: number;

  @ApiProperty({ description: 'Mã người bình luận', required: false })
  @IsOptional()
  @IsInt()
  ma_nguoi_binh_luan?: number;

  @ApiProperty({ description: 'Nội dụng bình luận', required: false })
  @IsOptional()
  @IsString()
  noi_dung?: string;

  @ApiProperty({ description: 'Sao bình luận', required: false })
  @IsOptional()
  @IsInt()
  sao_binh_luan?: number;
}

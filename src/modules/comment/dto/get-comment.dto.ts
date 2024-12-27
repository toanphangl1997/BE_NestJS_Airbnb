import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
  @ApiProperty({ description: 'ID của bình luận' })
  id: number;

  @ApiProperty({ description: 'Mã công việc liên quan' })
  ma_cong_viec: number;

  @ApiProperty({ description: 'Mã người bình luận' })
  ma_nguoi_binh_luan: number;

  @ApiProperty({ description: 'Nội dung bình luận' })
  noi_dung: string;

  @ApiProperty({ description: 'Số sao bình luận (từ 1-5)' })
  sao_binh_luan: number;
}

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateRoomDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  ten_phong?: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  khach?: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  phong_ngu?: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  giuong?: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  phong_tam?: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  gia_tien?: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  id_vi_tri?: number;
}

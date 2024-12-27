import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({ description: 'ID của Vị trí' })
  @IsNotEmpty({ message: 'id không được để trống' })
  @IsNumber({}, { message: 'id phải là số' })
  id: number;

  @ApiProperty({ description: 'Tên Vị Trí' })
  @IsNotEmpty({ message: 'ten_vi_tri không được để trống' })
  @IsString({ message: 'ten_phong phải là string' })
  ten_vi_tri: string;

  @ApiProperty({ description: 'Tỉnh thành' })
  @IsNotEmpty({ message: 'tinh_thanh không được để trống' })
  @IsString({ message: 'tinh_thanh phải là string' })
  tinh_thanh: string;

  @ApiProperty({ description: 'Quốc Gia' })
  @IsNotEmpty({ message: 'quoc_gia không được để trống' })
  @IsNumber({}, { message: 'quoc_gia phải là số' })
  quoc_gia: number;

  @ApiProperty({ description: 'Hình Ảnh' })
  @IsNotEmpty({ message: 'hinh_anh không được để trống' })
  @IsString({ message: 'hinh_anh phải là string' })
  hinh_anh: string;
}

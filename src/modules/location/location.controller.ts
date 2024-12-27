import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ParseIntPipe,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiParam } from '@nestjs/swagger';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  // Get Location
  @Get('get-location')
  getLocation() {
    return this.locationService.getLocation();
  }

  // Post Location
  @Post('post-location')
  postLocation(@Body() body: CreateLocationDto) {
    return this.locationService.postLocation(body);
  }

  // Panigation Location
  @Get('panigation-location')
  paniLocation(@Req() req: Request) {
    return this.locationService.panigationLocation(req);
  }

  // Get Location With ID
  @Get('location-withid/:id')
  getLocationID(@Param('id', ParseIntPipe) id: number) {
    return this.locationService.locationID(id);
  }

  // Put Location With ID
  @Put('put-location-withid/:id')
  @Put('put-user-withid/:id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID của bản ghi ViTri cần chỉnh sửa',
  })
  @ApiBody({
    type: UpdateLocationDto,
    description: 'Các trường cần thay đổi cho bản ghi ViTri',
  })
  putLocationID(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<UpdateLocationDto>,
  ) {
    return this.locationService.putLocationWithID(id, body);
  }

  // Delete Location With ID
  @Delete('delete-location/:id')
  deleteLocation(@Param('id') id: string) {
    return this.locationService.deleteLocationID(id);
  }

  // Upload Avatar Location
  @Post('upload-avatar-location/:id')
  @ApiParam({ name: 'id', type: Number, description: 'ID của phòng' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload file hình ảnh phòng',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images/location', // Thư mục lưu trữ
        filename: (req, file, callback) => {
          const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
          callback(null, uniqueName);
        },
      }),
    }),
  )
  async upLocationImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.locationService.uploadLocationImage(id, file);
  }
}

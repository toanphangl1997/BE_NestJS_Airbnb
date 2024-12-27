import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Req,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { Request } from 'express';
import { UpdateRoomDto } from './dto/update-room.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiBody, ApiConsumes, ApiParam } from '@nestjs/swagger';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  // Get Room
  @Get('get-room')
  getRoom() {
    return this.roomService.getRoom();
  }

  // Post Room
  @Post('post-room')
  postRoom(@Body() body: CreateRoomDto) {
    return this.roomService.postRoom(body);
  }

  // Get Room For Location
  @Get('location-room/:id_vi_tri')
  getRoomLocation(@Param('id_vi_tri', ParseIntPipe) id_vi_tri: number) {
    return this.roomService.roomLocation(id_vi_tri);
  }

  //Get Panigation Room
  @Get('panigation-room')
  paniRoom(@Req() req: Request) {
    return this.roomService.panigationRoom(req);
  }

  // Get Room With id
  @Get('room-withid/:id')
  getRoomID(@Param('id', ParseIntPipe) id: number) {
    return this.roomService.roomId(id);
  }

  // Put Room With ID
  @Put('put-room-withid/:id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID của bản ghi Room cần chỉnh sửa',
  })
  @ApiBody({
    type: UpdateRoomDto,
    description: 'Các trường cần thay đổi cho bản ghi Room',
  })
  putRoomID(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<UpdateRoomDto>,
  ) {
    return this.roomService.putRoomWithID(id, body);
  }

  // Delete Room With ID
  @Delete('delete-room/:id')
  deleteRoom(@Param('id') id: string) {
    return this.roomService.remove(id);
  }

  // Post Avater Room
  @Post('upload-avatar-room/:id')
  @ApiParam({ name: 'id', type: Number, description: 'ID của phòng' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload file hình Vị Trí',
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
        destination: './images/room', // Thư mục lưu trữ
        filename: (req, file, callback) => {
          const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
          callback(null, uniqueName);
        },
      }),
    }),
  )
  async uploadRoomImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.roomService.uploadRoomImage(id, file);
  }
}

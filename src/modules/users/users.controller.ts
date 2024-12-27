import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  Put,
  UseInterceptors,
  ParseIntPipe,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Request } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiConsumes, ApiParam } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Get User
  @Get('get-user')
  getUser() {
    return this.usersService.getUser();
  }

  // Post User
  @Post('post-user')
  postUser(@Body() body: CreateUserDto) {
    return this.usersService.postUser(body);
  }

  // Delete User
  @Delete('delete-user/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.removeUser(id);
  }

  // Panigation User
  @Get('panigation-user')
  panigationUser(@Req() req: Request) {
    return this.usersService.panigationUser(req);
  }

  // Get User With ID
  @Get('user-withid/:id')
  getUserWithID(@Param('id') id: string) {
    return this.usersService.getUserID(id);
  }

  // Put User With ID
  @Put('put-user-withid/:id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID của bản ghi User cần chỉnh sửa',
  })
  @ApiBody({
    type: UpdateUserDto,
    description: 'Các trường cần thay đổi cho bản ghi User',
  })
  putUserWithID(@Param('id') id: string, @Body() body: Partial<UpdateUserDto>) {
    return this.usersService.putUserID(id, body);
  }

  // Search User with name
  @Get('search-user/:name')
  searchUserWithName(@Param('name') name: string) {
    return this.usersService.searchUser(name);
  }

  // Upload Avatar User
  @Post('upload-avatar-user/:id')
  @ApiParam({ name: 'id', type: Number, description: 'ID của phòng' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload file hình ảnh user',
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
        destination: './images/user', // Thư mục lưu trữ
        filename: (req, file, callback) => {
          const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
          callback(null, uniqueName);
        },
      }),
    }),
  )
  async uploadUserImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usersService.uploadAvatarUser(id, file);
  }
}

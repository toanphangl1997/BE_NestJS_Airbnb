import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentDto } from './dto/get-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // Get Commment
  @Get('get-comment')
  getComment() {
    return this.commentService.getComment();
  }

  // Post Comment
  @Post('post-comment')
  postComment(@Body() body: CreateCommentDto) {
    return this.commentService.postComment(body);
  }

  // Put Commnet With ID
  @Put('put-comment/:id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID của bản ghi Bình Luận cần chỉnh sửa',
  })
  @ApiBody({
    type: UpdateCommentDto,
    description: 'Các trường cần thay đổi cho bản ghi bình luận',
  })
  putComment(@Param('id') id: string, @Body() body: Partial<UpdateCommentDto>) {
    return this.commentService.putComment(id, body);
  }

  // Delete Comment
  @Delete('delete-comment/:id')
  deleteComment(@Param('id') id: string) {
    return this.commentService.deleteComment(id);
  }

  // Get Commnet with RoomId
  @Get('for-room/:ma_phong')
  getCommentsByRoomId(@Param('ma_phong') maPhong: string) {
    return this.commentService.getCommentsByRoomId(maPhong);
  }
}

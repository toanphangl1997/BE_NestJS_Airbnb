import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CommentDto } from './dto/get-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { responseSuccess } from 'src/common/helpers/response.helper';

@Injectable()
export class CommentService {
  constructor(public prisma: PrismaService) {}

  async getComment() {
    try {
      const getComment = await this.prisma.binhLuan.findMany();
      return responseSuccess(getComment, 'Lấy bình luận thành công');
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Lỗi khi lấy dữ liệu');
    }
  }

  async postComment(body: CreateCommentDto) {
    try {
      const commentExits = await this.prisma.binhLuan.findUnique({
        where: { id: body.id },
      });

      if (!commentExits) {
        throw new BadRequestException('Bình luận không tồn tại.');
      }

      const postComment = await this.prisma.binhLuan.create({
        data: {
          // id: body.id,
          ma_cong_viec: body.ma_cong_viec,
          ma_nguoi_binh_luan: body.ma_nguoi_binh_luan,
          ngay_binh_luan: new Date().toISOString(),
          noi_dung: body.noi_dung,
          sao_binh_luan: body.sao_binh_luan,
        },
      });

      return responseSuccess(postComment, 'Thêm bình luận thành công');
    } catch (error) {
      throw new BadRequestException('Không thể tạo bình luận');
    }
  }

  async putComment(id: string, body: Partial<UpdateCommentDto>) {
    try {
      const existingComment = await this.prisma.binhLuan.findUnique({
        where: { id: parseInt(id) },
      });

      if (!existingComment) {
        throw new BadRequestException(`Bình luận không tìm thấy với ${id}`);
      }

      const putComment = await this.prisma.binhLuan.update({
        where: {
          id: parseInt(id),
        },
        data: {
          ma_cong_viec: body.ma_cong_viec ?? existingComment.ma_cong_viec,
          ma_nguoi_binh_luan:
            body.ma_nguoi_binh_luan ?? existingComment.ma_nguoi_binh_luan,
          noi_dung: body.noi_dung ?? existingComment.noi_dung,
          sao_binh_luan: body.sao_binh_luan ?? existingComment.sao_binh_luan,
          ngay_binh_luan: new Date().toISOString(),
        },
      });

      return responseSuccess(putComment, 'Chỉnh sửa bình luận thành công', 200);
    } catch (error) {
      console.error(error);
      throw new BadRequestException(
        `Không thể chỉnh sửa bình luận với id ${id}`,
      );
    }
  }

  async deleteComment(id: string) {
    const number = parseInt(id, 10);
    if (isNaN(number)) {
      throw new BadRequestException('ID phải là số');
    }

    try {
      const deleteComment = await this.prisma.binhLuan.delete({
        where: { id: number },
      });
      return responseSuccess(deleteComment, 'Xóa bình luận thành công', 200);
    } catch (error) {
      throw new BadRequestException(
        `Không tìm thấy bình luận với ID:${number}`,
      );
    }
  }

  async getCommentsByRoomId(maPhong: string) {
    try {
      const comments = await this.prisma.binhLuan.findMany({
        where: {
          // Không có ma_phong trong bảng bình luận thay thế ma_cong_viec
          ma_cong_viec: parseInt(maPhong),
        },
        include: {
          NguoiDung: true,
        },
      });
      return responseSuccess(
        comments,
        'Lấy bình luận với id room thành công',
        200,
      );
    } catch (error) {
      console.error(error);
      throw new BadRequestException('lỗi tải bình luận');
    }
  }
}

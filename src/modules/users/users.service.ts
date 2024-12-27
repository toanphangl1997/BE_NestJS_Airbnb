import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { Request } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { responseSuccess } from 'src/common/helpers/response.helper';

@Injectable()
export class UsersService {
  constructor(public prisma: PrismaService) {}

  async getUser() {
    try {
      const getUser = await this.prisma.nguoiDung.findMany();
      // console.log(getUser);
      return responseSuccess(getUser, 'Lấy thông tin User thành công');
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Lỗi khi lấy dữ liệu');
    }
  }

  async postUser(body: CreateUserDto) {
    try {
      const postUser = await this.prisma.nguoiDung.create({
        data: {
          id: body.id,
          name: body.name,
          email: body.email,
          pass_word: body.pass_word,
          phone: body.phone,
          birth_day: new Date(body.birth_day),
          gender: body.gender,
          role: body.role,
        },
      });
      console.log(body);
      return responseSuccess(
        postUser,
        'Tạo thông tin người dùng thành công',
        200,
      );
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Không thể tạo thông tin user');
    }
  }

  async removeUser(id: string) {
    const number = parseInt(id, 10);

    if (isNaN(number)) {
      throw new BadRequestException('ID phải là số');
    }

    try {
      // Xóa các bình luận liên quan
      await this.prisma.binhLuan.deleteMany({
        where: { ma_nguoi_binh_luan: number },
      });

      // Xóa người dùng
      const deleteUser = await this.prisma.nguoiDung.delete({
        where: { id: number },
      });

      return responseSuccess(
        deleteUser,
        `Xóa User thành công với Id:${number}`,
        200,
      );
    } catch (error) {
      console.error('Lỗi khi xóa user:', error);
      throw new BadRequestException(`Không thể xóa user với ID:${number}`);
    }
  }

  // Request : import express
  async panigationUser(req: Request) {
    let { page, pageSize } = req.query as any;

    // Mặc định giá trị nếu không có trong request hoặc giá trị không hợp lệ
    page = +page > 0 ? +page : 1; // Mặc định là 1 nếu page không hợp lệ
    pageSize = +pageSize > 0 ? +pageSize : 3; // Mặc định là 10 nếu pageSize không hợp lệ

    // Giới hạn tối đa pageSize nếu cần thiết (ví dụ giới hạn là 100)
    pageSize = Math.min(pageSize, 100); // Tùy chỉnh giới hạn tối đa pageSize theo yêu cầu của bạn
    console.log('Page:', page, 'PageSize:', pageSize);
    // Đếm tổng số người dùng
    const totalUsers = await this.prisma.nguoiDung.count();
    const totalPages = Math.ceil(totalUsers / pageSize);

    // Tính toán skip
    const skip = (page - 1) * pageSize;

    // Truy vấn danh sách người dùng với Prisma
    const users = await this.prisma.nguoiDung.findMany({
      take: pageSize,
      skip: skip,
    });

    // Trả về kết quả phân trang
    return {
      page: page,
      pageSize: pageSize,
      totalUsers: totalUsers,
      totalPages: totalPages,
      items: users || [],
    };
  }

  async getUserID(id: string) {
    console.log('Received ID:', id);

    // Chuyển đổi `id` sang số
    const number = parseInt(id, 10);

    // Kiểm tra nếu `id` không hợp lệ
    if (isNaN(number)) {
      throw new BadRequestException('Id phải là số hợp lệ');
    }

    try {
      // Tìm người dùng theo ID
      const user = await this.prisma.nguoiDung.findUnique({
        where: { id: number },
      });

      // Kiểm tra nếu không tìm thấy người dùng
      if (!user) {
        throw new BadRequestException(`Không tìm thấy user với ID: ${number}`);
      }

      return responseSuccess(
        user,
        `Tìm User thành công với Id: ${number}`,
        200,
      );
    } catch (error) {
      console.error('Lỗi khi tìm user:', error);
      throw new BadRequestException(`Không thể tìm user với ID: ${number}`);
    }
  }

  async putUserID(id: string, body: Partial<UpdateUserDto>) {
    try {
      console.log(id, body);

      const userExist = await this.prisma.nguoiDung.findUnique({
        where: { id: parseInt(id) },
      });

      if (!userExist) {
        throw new BadRequestException(`User không tìm thấy với id ${id}`);
      }

      const putUser = await this.prisma.nguoiDung.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name: body.name ?? userExist.name,
          email: body.email ?? userExist.email,
          pass_word: body.pass_word ?? userExist.pass_word,
          phone: body.phone ?? userExist.phone,
          birth_day: body.birth_day
            ? new Date(body.birth_day).toISOString()
            : userExist.birth_day,
          gender: body.gender ?? userExist.gender,
          role: body.role ?? userExist.role,
        },
      });

      return responseSuccess(
        putUser,
        `Chỉnh sửa thông tin User thành công với ID: ${id}`,
        200,
      );
    } catch (error) {
      console.error('Lỗi chỉnh sửa user', error);
      throw new BadRequestException(
        `Đã xảy ra lỗi khi cập nhật người dùng: ${error.message}`,
      );
    }
  }

  async searchUser(name: string) {
    try {
      const users = await this.prisma.nguoiDung.findMany({
        where: {
          name: {
            contains: name,
          },
        },
      });

      // Lọc không phân biệt hoa/thường ở cấp ứng dụng
      const user = users.find(
        (user) => user.name.toLowerCase() === name.toLowerCase(),
      );

      if (!user) {
        throw new NotFoundException(
          `Không tìm thấy người dùng với tên: ${name}`,
        );
      }

      return responseSuccess(user, `Tìm tìm User = ${name} thành công`, 200);
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Lỗi không tìm thấy người dùng');
    }
  }

  async uploadAvatarUser(id: number, file: Express.Multer.File) {
    try {
      if (!file || !file.filename) {
        throw new Error('File upload thất bại.');
      }

      const user = await this.prisma.nguoiDung.findUnique({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException(`Không tìm thấy vị trí với ID = ${id}`);
      }

      // Lưu đường dẫn ảnh vào cột hinh_anh
      const avatar = await this.prisma.nguoiDung.update({
        where: { id },
        data: { avatar: `images/user/${file.filename}` },
      });
      return responseSuccess(
        avatar,
        `Upload Avatar User:${id} thành công`,
        200,
      );
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Không thể upload avatar user');
    }
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Request } from 'express';
import { UpdateRoomDto } from './dto/update-room.dto';
import { responseSuccess } from 'src/common/helpers/response.helper';

@Injectable()
export class RoomService {
  constructor(public prisma: PrismaService) {}

  async getRoom() {
    try {
      const getRooms = await this.prisma.phong.findMany();
      return responseSuccess(getRooms, 'Lấy thông tin phòng thành công', 200);
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Lỗi khi lấy dữ liệu');
    }
  }

  async postRoom(body: CreateRoomDto) {
    try {
      const locationExists = await this.prisma.viTri.findUnique({
        where: { id: body.id_vi_tri },
      });

      if (!locationExists) {
        throw new BadRequestException('Vị trí không tồn tại');
      }

      const postRoom = await this.prisma.phong.create({
        data: {
          id: body.id,
          ten_phong: body.ten_phong,
          khach: body.khach,
          // phong_ngu: body.phong_ngu,
          // giuong: body.giuong,
          // phong_tam: body.phong_tam,
          gia_tien: body.gia_tien,
          id_vi_tri: body.id_vi_tri,
        },
      });

      return responseSuccess(postRoom, `Tạo thông tin phòng thành công`, 200);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Không thể thêm phòng');
    }
  }

  async roomLocation(id_vi_tri: number) {
    try {
      const room = await this.prisma.phong.findMany({
        where: {
          id_vi_tri,
        },
      });

      if (room.length === 0) {
        throw new NotFoundException(
          `Room với id_vi_tri = ${id_vi_tri} không tồn tại`,
        );
      }
      return responseSuccess(room, 'Lấy vị trí phòng thành công', 200);
    } catch (error) {
      console.error(error);
      throw new BadRequestException(
        `Không thể tìm phòng với id vị trí = ${id_vi_tri}`,
      );
    }
  }

  async panigationRoom(req: Request) {
    let { page, pageSize } = req.query as any;

    // Mặc định giá trị nếu không có trong request hoặc giá trị không hợp lệ
    page = +page > 0 ? +page : 1; // Mặc định là 1 nếu page không hợp lệ
    pageSize = +pageSize > 0 ? +pageSize : 3; // Mặc định là 10 nếu pageSize không hợp lệ

    // Giới hạn tối đa pageSize nếu cần thiết (ví dụ giới hạn là 100)
    pageSize = Math.min(pageSize, 100); // Tùy chỉnh giới hạn tối đa pageSize theo yêu cầu của bạn
    console.log('Page:', page, 'PageSize:', pageSize);
    // Đếm tổng số người dùng
    const totalRooms = await this.prisma.phong.count();
    const totalPages = Math.ceil(totalRooms / pageSize);

    // Tính toán skip
    const skip = (page - 1) * pageSize;

    // Truy vấn danh sách người dùng với Prisma
    const rooms = await this.prisma.phong.findMany({
      take: pageSize,
      skip: skip,
    });

    // Trả về kết quả phân trang
    return {
      page: page,
      pageSize: pageSize,
      totalRooms: totalRooms,
      totalPages: totalPages,
      items: rooms || [],
    };
  }

  async roomId(id: number) {
    try {
      const room = await this.prisma.phong.findUnique({
        where: { id },
      });

      if (!room) {
        throw new NotFoundException(`Room với id = ${id} không tồn tại`);
      }
      return responseSuccess(
        room,
        `Lấy thông tin phòng với ID:${id} thành công`,
        200,
      );
    } catch (error) {
      console.error(error);
      throw new BadRequestException(`Không thể tìm phòng với id = ${id}`);
    }
  }

  async putRoomWithID(id: number, body: Partial<UpdateRoomDto>) {
    try {
      const existRoom = await this.prisma.phong.findUnique({
        where: { id },
      });

      if (!existRoom) {
        throw new BadRequestException(`Room không tìm thấy với id = ${id}`);
      }

      const putRoom = await this.prisma.phong.update({
        where: {
          id,
        },
        data: {
          ten_phong: body.ten_phong ?? existRoom.ten_phong,
          khach: body.khach ?? existRoom.khach,
          phong_ngu: body.phong_ngu ?? existRoom.phong_ngu,
          giuong: body.giuong ?? existRoom.giuong,
          phong_tam: body.phong_tam ?? existRoom.phong_tam,
          gia_tien: body.gia_tien ?? existRoom.gia_tien,
          id_vi_tri: body.id_vi_tri ?? existRoom.id_vi_tri,
        },
      });
      return responseSuccess(
        putRoom,
        `Chỉnh sửa thông tin phòng với ID:${id} thành công`,
      );
    } catch (error) {
      console.error(error);
      throw new BadRequestException(`Không thể chỉnh sửa phòng với id = ${id}`);
    }
  }

  async remove(id: string) {
    const number = parseInt(id, 10);

    if (isNaN(number)) {
      throw new BadRequestException('Id phải là số');
    }

    try {
      const deleteRooom = await this.prisma.phong.delete({
        where: { id: number },
      });
      return responseSuccess(
        deleteRooom,
        `Xóa room thành công với id = ${number}`,
        200,
      );
    } catch (error) {
      console.error(error);
      throw new BadRequestException(
        `Không tìm thấy room với Id = ${number} Chi tiết lỗi: ${error.message}`,
      );
    }
  }

  async uploadRoomImage(id: number, file: Express.Multer.File) {
    try {
      if (!file || !file.filename) {
        throw new Error('File upload thất bại.');
      }

      const room = await this.prisma.phong.findUnique({
        where: { id },
      });

      if (!room) {
        throw new NotFoundException(`Không tìm thấy phòng với ID = ${id}`);
      }

      // Lưu đường dẫn ảnh vào cột hinh_anh
      const uploadAvatar = await this.prisma.phong.update({
        where: { id },
        data: { hinh_anh: `images/room/${file.filename}` },
      });
      return responseSuccess(
        uploadAvatar,
        `Upload ảnh phòng với ID:${id} thành công`,
        200,
      );
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Không thể upload avatar room');
    }
  }
}

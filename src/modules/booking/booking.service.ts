import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { BookingRoomDto } from './dto/get-booking-room.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { responseSuccess } from 'src/common/helpers/response.helper';

@Injectable()
export class BookingService {
  constructor(public prisma: PrismaService) {}

  async bookRoom() {
    try {
      const bookingRoom = await this.prisma.datPhong.findMany();
      return responseSuccess(
        bookingRoom,
        'Lấy thông tin đặt phòng thành công',
        200,
      );
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Lỗi khi lấy dữ liệu');
    }
  }

  async createRooms(body: CreateBookingDto) {
    try {
      // Kiểm tra `ma_phong` có tồn tại
      const roomExits = await this.prisma.phong.findUnique({
        where: { id: body.ma_phong },
      });

      if (!roomExits) {
        throw new BadRequestException('Phòng không tồn tại.');
      }

      const creatRoom = await this.prisma.datPhong.create({
        data: {
          ma_phong: body.ma_phong,
          ngay_den: new Date(),
          ngay_di: new Date(),
          so_luong_khach: body.so_luong_khach,
          ma_nguoi_dat: body.ma_nguoi_dat,
        },
      });
      return responseSuccess(creatRoom, 'Thêm đặt phòng thành công', 200);
    } catch (error) {
      console.error('Lỗi khi tạo phòng:', error);
      throw new BadRequestException('Không thể đặt phòng.');
    }
  }

  async bookRoomWithId(id: string) {
    try {
      // Tìm phòng theo ID
      const roomExits = await this.prisma.datPhong.findUnique({
        where: {
          id: Number(id),
        },
      });

      // Nếu phòng không tồn tại
      if (!roomExits) {
        throw new BadRequestException('Không tìm thấy phòng với ID này');
      }

      return responseSuccess(
        roomExits,
        'Tìm đặt phòng theo ID thành công',
        200,
      );
    } catch (error) {
      console.error('Lỗi tìm phòng:', error);
      throw new BadRequestException(error.message || 'Không thể tìm phòng');
    }
  }

  async updateBookingRooom(id: string, dto: Partial<UpdateBookingDto>) {
    try {
      const existBookingRoom = await this.prisma.datPhong.findUnique({
        where: { id: parseInt(id) },
      });

      if (!existBookingRoom) {
        throw new BadRequestException('Không tìm thấy id đặt phòng');
      }

      const putBookingRoom = await this.prisma.datPhong.update({
        where: {
          id: parseInt(id),
        },
        data: {
          ma_phong: dto.ma_phong ?? existBookingRoom.ma_phong,
          ngay_den: new Date().toISOString(),
          ngay_di: new Date().toISOString(),
          so_luong_khach: dto.so_luong_khach ?? existBookingRoom.so_luong_khach,
          ma_nguoi_dat: dto.ma_nguoi_dat ?? existBookingRoom.ma_nguoi_dat,
        },
      });
      return responseSuccess(
        putBookingRoom,
        'Cập nhập thay đổi phòng thành công',
        200,
      );
    } catch (error) {
      console.error(error);
      throw new BadRequestException(
        `Không thể chỉnh sửa đặt phòng với id ${id}`,
      );
    }
  }

  async deleteBookingRoom(id: string) {
    const number = parseInt(id, 10);
    if (isNaN(number)) {
      throw new BadRequestException('Id phải là số');
    }

    try {
      const booking = await this.prisma.datPhong.delete({
        where: { id: number },
      });

      return responseSuccess(
        booking,
        ` Xóa đặt phòng thành công với ID:${number}`,
        200,
      );
    } catch (error) {
      console.error(error);
      throw new BadRequestException(
        `Không tìm thấy phòng đặt với ID:${number}`,
      );
    }
  }

  async forBooking(maNguoiDat: string) {
    try {
      const bookingRoom = await this.prisma.datPhong.findMany({
        where: {
          ma_nguoi_dat: parseInt(maNguoiDat),
        },
        include: {
          NguoiDung: true,
        },
      });
      return responseSuccess(
        bookingRoom,
        `Tìm đặt phòng theo mã người dùng = ${maNguoiDat} thành công`,
      );
    } catch (error) {
      console.error(error);
      throw new Error('Lỗi tải đặt phòng');
    }
  }
}

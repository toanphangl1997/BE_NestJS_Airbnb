import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Request } from 'express';
import { responseSuccess } from 'src/common/helpers/response.helper';

@Injectable()
export class LocationService {
  constructor(public prisma: PrismaService) {}

  async getLocation() {
    try {
      const locations = await this.prisma.viTri.findMany();

      return responseSuccess(
        locations,
        'Lấy thông tin tất cả vị trí thành công',
        200,
      );
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Lỗi khi lấy dữ liệu');
    }
  }

  async postLocation(body: CreateLocationDto) {
    try {
      const locationExists = await this.prisma.viTri.findUnique({
        where: {
          id: body.id,
        },
      });

      if (locationExists) {
        throw new BadRequestException('Id vị trí đã tồn tại');
      }

      const newLocation = await this.prisma.viTri.create({
        data: {
          id: body.id,
          ten_vi_tri: body.ten_vi_tri,
          tinh_thanh: body.tinh_thanh,
          quoc_gia: body.quoc_gia,
          hinh_anh: body.hinh_anh,
        },
      });

      return responseSuccess(newLocation, 'Thêm vị trí thành công', 200);
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException(`Không thể thêm phòng với ID = ${body.id}`);
    }
  }

  async panigationLocation(req: Request) {
    let { page, pageSize } = req.query as any;

    page = +page > 0 ? +page : 1;
    pageSize = +pageSize > 0 ? +pageSize : 3;
    // Giới hạn tối đa pageSize nếu cần thiết (ví dụ giới hạn là 100)
    pageSize = Math.min(pageSize, 100); // Tùy chỉnh giới hạn tối đa pageSize theo yêu cầu của bạn
    console.log('Page:', page, 'PageSize:', pageSize);
    // Đếm tổng số người dùng
    const totalLocations = await this.prisma.viTri.count();
    const totalPages = Math.ceil(totalLocations / pageSize);

    const skip = (page - 1) * pageSize;

    const locations = await this.prisma.viTri.findMany({
      take: pageSize,
      skip: skip,
    });

    // Trả về kết quả phân trang
    return {
      page: page,
      pageSize: pageSize,
      totalLocations: totalLocations,
      totalPages: totalPages,
      items: locations || [],
    };
  }

  async locationID(id: number) {
    try {
      const location = await this.prisma.viTri.findUnique({
        where: { id },
      });

      if (!location) {
        throw new NotFoundException(`Location với id = ${id} không tồn tại`);
      }

      return responseSuccess(
        location,
        `Lấy vị trí theo ID:${id} thành công`,
        200,
      );
    } catch (error) {
      console.error(error);
      throw new BadRequestException(` Không thể tìm phòng với id = ${id}`);
    }
  }

  async putLocationWithID(id: number, body: Partial<UpdateLocationDto>) {
    try {
      const exitsLocation = await this.prisma.viTri.findUnique({
        where: { id },
      });

      if (!exitsLocation) {
        throw new BadRequestException(`Location không tìm thấy với id = ${id}`);
      }

      const putLocation = await this.prisma.viTri.update({
        where: {
          id,
        },
        data: {
          ten_vi_tri: body.ten_vi_tri ?? exitsLocation.ten_vi_tri,
          tinh_thanh: body.tinh_thanh ?? exitsLocation.tinh_thanh,
          quoc_gia: body.quoc_gia ?? exitsLocation.quoc_gia,
          hinh_anh: body.hinh_anh ?? exitsLocation.hinh_anh,
        },
      });
      return responseSuccess(
        putLocation,
        ` Chỉnh sửa vị trí với ID:${id} thành công`,
        200,
      );
    } catch (error) {
      console.error(error);
      throw new BadRequestException(`Không thể chỉnh sửa lation với id ${id}`);
    }
  }

  async deleteLocationID(id: string) {
    const number = parseInt(id, 10);

    if (isNaN(number)) {
      throw new BadRequestException('ID phải là số');
    }

    try {
      // Kiểm tra xem bản ghi có tồn tại không
      const location = await this.prisma.viTri.findUnique({
        where: { id: number },
      });

      if (!location) {
        throw new BadRequestException(
          `Location với ID = ${number} không tồn tại.`,
        );
      }

      // Xóa các bản ghi liên quan trong bảng DatPhong
      await this.prisma.datPhong.deleteMany({
        where: { ma_phong: number },
      });

      // Xóa các bản ghi trong bảng Phong
      await this.prisma.phong.deleteMany({
        where: { id_vi_tri: number },
      });

      const deleteLocation = await this.prisma.viTri.delete({
        where: { id: number },
      });
      return responseSuccess(
        deleteLocation,
        `Xóa location thành công với ID = ${number}`,
        200,
      );
    } catch (error) {
      console.error(error);

      if (error.code === 'P2003') {
        throw new BadRequestException(
          `Không thể xóa location với ID = ${number} vì đang được tham chiếu.`,
        );
      }

      throw new BadRequestException(`Chi tiết lỗi: ${error.message}`);
    }
  }

  async uploadLocationImage(id: number, file: Express.Multer.File) {
    try {
      if (!file || !file.filename) {
        throw new Error('File upload thất bại.');
      }

      const location = await this.prisma.viTri.findUnique({
        where: { id },
      });

      if (!location) {
        throw new NotFoundException(`Không tìm thấy vị trí với ID = ${id}`);
      }

      // Lưu đường dẫn ảnh vào cột hinh_anh
      const uploadAvatar = await this.prisma.viTri.update({
        where: { id },
        data: { hinh_anh: `images/location/${file.filename}` },
      });
      return responseSuccess(
        uploadAvatar,
        `Upload hình ảnh vị trí với ID:${id} thành công`,
        200,
      );
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Không thể upload avatar Vị trí');
    }
  }
}

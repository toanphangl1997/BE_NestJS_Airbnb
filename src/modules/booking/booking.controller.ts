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
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingRoomDto } from './dto/get-booking-room.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  // Get Book Room
  @Get('booking-room')
  bookRooms() {
    return this.bookingService.bookRoom();
  }

  // Post Booking Room
  @Post('create-bk-room')
  createRooms(@Body() body: CreateBookingDto) {
    return this.bookingService.createRooms(body);
  }

  // Get Booking Room with id
  @Get('bk-room-withid/:id')
  bookRoomWithId(@Param('id') id: string) {
    return this.bookingService.bookRoomWithId(id);
  }

  // Put Booking Room with id
  @Put('put-bk-room-withid/:id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID của bản ghi đặt phòng cần chỉnh sửa',
  })
  @ApiBody({
    type: UpdateBookingDto,
    description: 'Các trường cần thay đổi cho bản ghi đặt phòng',
  })
  putBookingRoom(
    @Param('id') id: string,
    @Body() dto: Partial<UpdateBookingDto>,
  ) {
    return this.bookingService.updateBookingRooom(id, dto);
  }

  // Delete Booking Room with Id
  @Delete('delete-bk-room-withid/:id')
  deleteBookingRoom(@Param('id') id: string) {
    return this.bookingService.deleteBookingRoom(id);
  }

  // Get Booking Room with ma_nguoi_dung
  @Get('for-bk-room/:ma_nguoi_dat')
  forBooking(@Param('ma_nguoi_dat') maNguoiDat: string) {
    return this.bookingService.forBooking(maNguoiDat);
  }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CommentModule } from './modules/comment/comment.module';
import { BookingModule } from './modules/booking/booking.module';
import { UsersModule } from './modules/users/users.module';
import { RoomModule } from './modules/room/room.module';
import { LocationModule } from './modules/location/location.module';

@Module({
  imports: [
    AuthModule,
    CommentModule,
    BookingModule,
    UsersModule,
    RoomModule,
    LocationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

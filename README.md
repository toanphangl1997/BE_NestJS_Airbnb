# Setup project NestJS_prisma_airbnb

- npm i -g @nestjs/cli

- nest new project-name ( để dấu . nếu không muốn tạo them folder ) vì đã tạo foler trước đó

- npm run start:dev

- npm install prisma

- npm install @prisma/client

- tạo folder prisma,tạo file prisma bên trong folder common paste code

- npx prisma init

- npx prisma db pull

- npx prisma generate

# kết nối với database

import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
async onModuleInit() {
await this.$connect();
}
}

# Tạo module nhanh

- nest g module modules/user ( user là tên folder )

- nest g controller modules/user

- nest g service modules/user --no--spec ( bỏ file spec khi tạo )

# Upload hình ảnh

- npm i multer

- npm i -D @types/multer

@UseInterceptors(FileInterceptor('file'))

(@UploadedFile() file: Express.Multer.File)

# Swagger

- npm install --save @nestjs/swagger

- npm install swagger-ui-express

# Validation

- npm i --save class-validator class-transformer ( class validator )

# Mã hóa password

- npm i bcrypt

- npm i -D @types/bcrypt

# Authentication NestJS

- npm install --save @nestjs/jwt

- npm i --save @nestjs/config ( jwt chính thống của nestjs )

# Lệnh tạo từng folder

- nest g module modules || controller || service /ten_folder (module,controller,service)

# Lệnh tạo nhanh module hoàn chỉnh

- nest g resource/modules/ten_folder

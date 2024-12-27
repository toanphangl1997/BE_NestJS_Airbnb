import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { responseSuccess } from 'src/common/helpers/response.helper';

// type TUserExists = {
//   pass_word: string;
//   id: number;
// };

@Injectable()
export class AuthService {
  constructor(
    public prisma: PrismaService,
    private jwtService: JwtService,
    public configService: ConfigService,
  ) {}

  async signUp(register: RegisterDto) {
    const { name, email, pass_word } = register;

    const userExist = await this.prisma.nguoiDung.findFirst({
      where: {
        email: email,
      },
    });

    if (userExist)
      throw new BadRequestException('Email đã tồn tại,vui lòng đăng nhập');
    console.log({ userExist });
    //  Mã hóa password
    const hashPassword = bcrypt.hashSync(pass_word, 10);

    // Tạo người dùng mới ( tạo dữ liệu vào trong db)
    const userNew = await this.prisma.nguoiDung.create({
      data: {
        email: email,
        name: name,
        pass_word: hashPassword,
      },
    });

    return responseSuccess(userNew, 'Đăng ký thành công', 200);
  }

  async signIn(login: LoginDto) {
    // Lỗi kiểm soát được
    // throw new BadRequestException(`Lỗi kiểm soát được`);
    // Lỗi không kiểm soát được
    // throw new Error(`Lỗi không kiểm soát được`)

    // Bước 1: nhận dữ liệu từ body
    const { email, pass_word } = login;
    console.log({ email, pass_word });

    // Bước 2: kiểm tra email có tồn tại trong db hay chưa
    //       - email tồn tại: đi tiếp
    //       - email chưa tồn tịa: trả lỗi "Email không tồn tại, vui lòng đăng ký"
    const userExists = await this.prisma.nguoiDung.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
        pass_word: true,
      },
    });
    if (!userExists)
      throw new BadRequestException('Email không tồn tại, vui lòng đăng ký');

    return responseSuccess(userExists, 'Đăng nhập thành công', 200);
    //   // Bước 3: kiểm tra password

    //   console.log({ userExists });
    //   const passHash = userExists.pass_word;
    //   const isPassword = bcrypt.compareSync(pass_word, passHash);
    //   if (!isPassword) throw new BadRequestException(`Mật khẩu không chính xác`);

    //   console.log('Email:', email);
    //   console.log('Password from user input:', pass_word);
    //   console.log('Password hash from DB:', passHash);

    //   // Bước 4: tạo accessToken và RefreshToken
    //   const tokens = this.createTokens(userExists);

    //   return tokens;
    // }

    // createTokens(userExists: TUserExists) {
    //   console.log({
    //     ACCESS_TOKEN_SECRET: this.configService.get<string>(
    //       'ACCESS_TOKEN_SECRET',
    //     ),
    //   });
    //   const accessToken = this.jwtService.sign(
    //     { user_id: userExists.id },
    //     {
    //       secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
    //       expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRES'),
    //     },
    //   );
    //   const refreshToken = this.jwtService.sign(
    //     { user_id: userExists.id },
    //     {
    //       secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
    //       expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRES'),
    //     },
    //   );
    //   console.log(
    //     'ACCESS_TOKEN_SECRET:',
    //     this.configService.get<string>('ACCESS_TOKEN_SECRET'),
    //   );
    //   console.log(
    //     'REFRESH_TOKEN_SECRET:',
    //     this.configService.get<string>('REFRESH_TOKEN_SECRET'),
    //   );

    //   return { accessToken, refreshToken };
    // }
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Register

  @Post('signup')
  signUp(@Body() register: RegisterDto) {
    return this.authService.signUp(register);
  }

  // Login

  @Post('signin')
  signIn(@Body() login: LoginDto) {
    return this.authService.signIn(login);
  }
}

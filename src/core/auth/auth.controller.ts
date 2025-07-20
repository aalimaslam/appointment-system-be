import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { GoogleOauthGuard } from './guards/google-oauth/google-oauth.guard';
import { CreateCustomerDto } from '../customer/dto/create-customer.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createCustomerDto: CreateCustomerDto) {
    return this.authService.signup(createCustomerDto);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(@Request() req, @Body() loginDto: LoginDto) {
    return this.authService.login(req.user.id);
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  refreshToken(@Req() req) {
    return this.authService.refreshToken(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('signout')
  signOut(@Req() req) {
    this.authService.signOut(req.user.id);
  }

  @UseGuards(GoogleOauthGuard)
  @Get('google/login')
  googleLogin() {}

  @UseGuards(GoogleOauthGuard)
  @Get('google/callback')
  async googleCallback(@Req() req) {
    const { accessToken, refreshToken } = await this.authService.login(
      req.user.id,
    );
    return { accessToken, refreshToken };
  }
}

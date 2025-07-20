import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../customer/entities/customer.entity';
import { LocalStrategy } from './strategies/local.strategy';
import { CustomerService } from '../customer/customer.service';
import { JwtModule } from '@nestjs/jwt';
import jwtConfiguration from '../configuration/jwt.configuration';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import refreshJwtConfiguration from '../configuration/refresh-jwt.configuration';
import { RefreshJwtStrategy } from './strategies/refresh.strategy';
import googleOauthConfig from '../configuration/google-oauth.config';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]),
    JwtModule.registerAsync(jwtConfiguration.asProvider()),
    ConfigModule.forFeature(jwtConfiguration),
    ConfigModule.forFeature(refreshJwtConfiguration),
    ConfigModule.forFeature(googleOauthConfig),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    CustomerService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
    GoogleStrategy,
  ],
})
export class AuthModule {}

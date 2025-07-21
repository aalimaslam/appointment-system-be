import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../customer/entities/customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from '../customer/dto/create-customer.dto';
import { CustomerService } from '../customer/customer.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import refreshJwtConfiguration from '../configuration/refresh-jwt.configuration';
import { ConfigType } from '@nestjs/config';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly customerService: CustomerService,
    private readonly jwtService: JwtService,
    @Inject(refreshJwtConfiguration.KEY)
    private readonly refreshJwtConfig: ConfigType<
      typeof refreshJwtConfiguration
    >,
  ) {}

  async signup(createCustomerDto: CreateCustomerDto) {
    const existingCustomer = await this.customerService.findByEmail(
      createCustomerDto.email,
    );
    if (existingCustomer) {
      throw new ConflictException('User with this email already exists');
    }

    const newCustomer = await this.customerService.create(createCustomerDto);

    const { accessToken, refreshToken } = await this.generateTokens(
      newCustomer.id,
    );
    const hashedRefreshToken = await argon2.hash(refreshToken);

    await this.customerService.updateHashedRefreshToken(
      newCustomer.id,
      hashedRefreshToken,
    );

    return {
      id: newCustomer.id,
      email: newCustomer.email,
      firstName: newCustomer.firstName,
      lastName: newCustomer.lastName,
      accessToken,
      refreshToken,
    };
  }

  async validateCustomer(email: string, password: string) {
    const customer = await this.customerService.findByEmail(email);
    if (!customer) throw new UnauthorizedException('User not found');
    const isPasswordValid = await bcrypt.compare(password, customer.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    return { id: customer.id };
  }

  async login(customerId: string) {
    const { accessToken, refreshToken } = await this.generateTokens(customerId);
    const hashedRefreshToken = await argon2.hash(refreshToken);

    await this.customerService.updateHashedRefreshToken(
      customerId,
      hashedRefreshToken,
    );

    return {
      id: customerId,
      accessToken,
      refreshToken,
    };
  }

  async generateTokens(customerId: string) {
    const payload: AuthJwtPayload = { sub: customerId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshJwtConfig),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(customerId: string) {
    const { accessToken, refreshToken } = await this.generateTokens(customerId);
    const hashedRefreshToken = await argon2.hash(refreshToken);

    await this.customerService.updateHashedRefreshToken(
      customerId,
      hashedRefreshToken,
    );

    return {
      id: customerId,
      accessToken,
      refreshToken,
    };
  }

  async validateRefreshToken(customerId: string, refreshToken: string) {
    const customer = await this.customerService.findOne(customerId);
    if (!customer || !customer.hashedRefreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const isValid = await argon2.verify(
      customer.hashedRefreshToken,
      refreshToken,
    );
    if (!isValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return { id: customerId };
  }

  async signOut(customerId: string) {
    return this.customerService.updateHashedRefreshToken(customerId, null);
  }

  async validateGoogleUser(googleUser: CreateCustomerDto) {
    const customer = await this.customerService.findByEmail(googleUser.email);
    if (customer) return customer;

    return await this.customerService.create(googleUser);
  }
}

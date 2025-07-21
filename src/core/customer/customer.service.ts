import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async updateHashedRefreshToken(
    customerId: string,
    hashedRefreshToken: string,
  ) {
    return await this.customerRepository.update(
      { id: customerId },
      { hashedRefreshToken },
    );
  }

  async create(createCustomerDto: CreateCustomerDto) {
    const customer = this.customerRepository.create(createCustomerDto);
    return await this.customerRepository.save(customer);
  }

  findAll() {
    return `This action returns all customer`;
  }

  findByEmail(email: string) {
    return this.customerRepository.findOne({ where: { email } });
  }

  findOne(id: string) {
    return this.customerRepository.findOne({
      where: { id },
      select: [
        'email',
        'firstName',
        'lastName',
        'profilePicture',
        'hashedRefreshToken',
      ],
    });
  }

  // update(id: number, updateCustomerDto: UpdateCustomerDto) {
  //   return `This action updates a #${id} customer`;
  // }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}

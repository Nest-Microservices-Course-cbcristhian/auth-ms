import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit{

  private readonly logger = new Logger("AuthService")

  onModuleInit() {
    this.$connect();
    this.logger.log('Auth MS DB Connected')
  }
  create(createAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }
}

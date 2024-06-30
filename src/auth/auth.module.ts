import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { NatsModule } from '../nats/nats.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[NatsModule]
})
export class AuthModule {}
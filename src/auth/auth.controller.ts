import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.register.user')
  create(@Payload() createAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @MessagePattern('auth.login.user')
  findAll() {
    return this.authService.findAll();
  }

  @MessagePattern('auth.verify.user')
  findOne(@Payload() id: number) {
    return this.authService.findOne(id);
  }

}

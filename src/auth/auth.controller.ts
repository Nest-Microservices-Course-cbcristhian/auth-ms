import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.register.user')
  registerUser(@Payload() registerUser:RegisterUserDto) {
    return this.authService.registerUser(registerUser);
  }

  @MessagePattern('auth.login.user')
  loginUser(@Payload() loginDto:LoginDto) {
    return this.authService.login(loginDto)
  }

  @MessagePattern('auth.verify.user')
  verifyToken(@Payload() token: string) {
    return this.authService.verifyToken(token)
  }

}

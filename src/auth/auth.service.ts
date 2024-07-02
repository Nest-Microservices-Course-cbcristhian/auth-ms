import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcryptjs'
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/interface/jwt-payload.interface';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit{

  private readonly logger = new Logger("AuthService")

  constructor(
    private readonly jwtService:JwtService
  ){super()}

  onModuleInit() {
    this.$connect();
    this.logger.log('Auth MS DB Connected')
  }
  async registerUser(registerUserDto:RegisterUserDto) {
    const {email, name, password}= registerUserDto
    try {
      const user = await this.user.findUnique({
        where:{email}
      })
      if(user) throw new RpcException({status:400,message:'User already exist'})

      const createUser= await this.user.create({
        data:{
          email,
          password:bcrypt.hashSync(password,10),
          name
        }
      })
      const {password:__, ...userInfo}= createUser

      return {
        user:userInfo,
        token:this.signJWT(userInfo)
      }
    } catch (error) {
      throw new RpcException({
        status:400,
        message: error.message
      })
    }
  }

  async login(loginDto:LoginDto) {
    const {email, password}= loginDto
    try {
      const user = await this.user.findUnique({
        where:{email}
      })
      if(!user) throw new RpcException({status:400,message:'Invalid User'})
      
      
      const isValidPass= bcrypt.compareSync(password, user.password)
      
      
      if(!isValidPass) throw new RpcException({status:400,message:'Password error'})

      const {password:__, ...userInfo}= user

      return {
        user:userInfo,
        token:await this.signJWT(userInfo)
      }
    } catch (error) {
      throw new RpcException({
        status:400,
        message: error.message
      })
    }
  }

  async signJWT(payload:JwtPayload){
    return this.jwtService.sign(payload)
  }
}

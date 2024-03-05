import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(dto: AuthDto) {
    try {

      const hash = await argon.hash(dto.password);
  
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hash,
        },
      });
  
      delete user.hash;
      return user;
    } catch (err) {
      if(err instanceof PrismaClientKnownRequestError) {
        if(err.code === 'P202002') {
          throw new ForbiddenException('Crediential Error');
        }
    }
  }
  signin(dto: AuthDto) {
    return dto;
  }
}

// const service = new AuthService();

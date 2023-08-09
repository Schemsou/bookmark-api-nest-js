import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(dto: AuthDto) {
    //Hash the password
    const hash = await argon.hash(dto.password);

    //Save the user on DB
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      },
    });
    delete user.hash;
    //Return the user
    return user;
  }
  signin(): { msg: string } {
    return { msg: 'hey' };
  }
}

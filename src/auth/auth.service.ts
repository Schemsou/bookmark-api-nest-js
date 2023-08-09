import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(dto: AuthDto) {
    //Hash the password
    const hash = await argon.hash(dto.password);

    //Save the user on DB
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      const { hash: userHash, ...userWithoutHash } = user;
      //Return the user
      return userWithoutHash;
    } catch {
      throw new ForbiddenException();
    }
  }
  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('Credentials not correct');
    const pwdMatches = await argon.verify(user.hash, dto.password);
    if (!pwdMatches) throw new ForbiddenException('Credentials not correct');

    return this.signToken(user.id, user.email);
  }
  async signToken(userId: number, email: string): Promise<{ acces_token }> {
    const paylod = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(paylod, {
      expiresIn: '30d',
      secret,
    });
    return {
      acces_token: token,
    };
  }
}

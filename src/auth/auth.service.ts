import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  signup(): string {
    return 'hola';
  }
  signin(): { msg: string } {
    return { msg: 'hey' };
  }
}

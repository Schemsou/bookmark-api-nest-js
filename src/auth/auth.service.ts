import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signup(): string {
    return 'hola';
  }
  signin(): { msg: string } {
    return { msg: 'hey' };
  }
}

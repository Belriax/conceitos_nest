import { Injectable } from '@nestjs/common';
import { loginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  async login(loginDto: loginDto) {
    return loginDto;
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(email: string, password: string, name: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userService.createUser(email, hashedPassword, name);
    const payload = { sub: user.id, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('No user with this email');
    }
    const passwordMatch = bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new BadRequestException('Invalid credentials');
    }
    const payload = { sub: user.id, name: user.name, bio: user.bio };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
